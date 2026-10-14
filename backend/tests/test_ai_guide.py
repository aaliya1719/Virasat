"""
Unit and integration tests for Virasat AI Cultural Guide and Chat endpoints.
Covers:
- Keyword extraction and stopwords filtering
- Database-grounded heritage retrieval & genuine source citation extraction
- Anti-hallucination handling and out-of-scope query behavior
- Secure fallback when GEMINI_API_KEY is unset or unavailable
- Guest chat: unauthenticated POST /api/v1/chat must succeed (200), not return 401
- Authenticated chat: full DB persistence and session ownership enforcement
- Cross-user session access blocked (403)
- Unauthenticated history access blocked (401)
- Oversized payload validation (422)
"""

import os
import sys
import uuid
import unittest
from fastapi.testclient import TestClient

# Ensure backend root is on path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from main import app
from database import SessionLocal
from auth import CurrentUser, get_current_user, get_optional_user
import models
from services.ai_guide import (
    extract_keywords,
    retrieve_grounding_data,
    build_grounding_prompt,
    generate_guide_reply,
)


class TestAIGuideRetrieval(unittest.TestCase):
    def setUp(self):
        self.db = SessionLocal()

    def tearDown(self):
        self.db.close()

    def test_extract_keywords(self):
        query = "What is the history of the Warli painting tradition in Maharashtra?"
        keywords = extract_keywords(query)
        self.assertIn("warli", keywords)
        self.assertIn("painting", keywords)
        self.assertIn("tradition", keywords)
        # Common stopwords should be filtered
        self.assertNotIn("what", keywords)
        self.assertNotIn("the", keywords)
        self.assertNotIn("of", keywords)

    def test_retrieve_grounding_maharashtra(self):
        region, items, places, sources = retrieve_grounding_data(
            db=self.db,
            query="caves and temples",
            region_id="maharashtra",
        )
        self.assertIsNotNone(region)
        self.assertEqual(region.id, "maharashtra")
        self.assertTrue(len(items) > 0)
        # Should include authentic sources
        self.assertTrue(len(sources) > 0)
        # Verify genuine sources are present
        has_genuine = any("ASI" in s or "UNESCO" in s or "Tourism" in s for s in sources)
        self.assertTrue(has_genuine)

    def test_retrieve_grounding_odisha(self):
        region, items, places, sources = retrieve_grounding_data(
            db=self.db,
            query="Jagannath temple rath yatra",
            region_id="odisha",
        )
        self.assertIsNotNone(region)
        self.assertEqual(region.id, "odisha")
        self.assertTrue(len(items) > 0)
        self.assertTrue(len(sources) > 0)

    def test_build_grounding_prompt(self):
        region, items, places, sources = retrieve_grounding_data(
            db=self.db,
            query="Warli art",
            region_id="maharashtra",
        )
        prompt = build_grounding_prompt(
            query="Tell me about Warli art",
            region=region,
            items=items,
            places=places,
            sources=sources,
            page_context="Arts & Crafts section",
        )
        self.assertIn("REGION CONTEXT", prompt)
        self.assertIn("VERIFIED SOURCE CITATIONS", prompt)
        self.assertIn("USER QUESTION", prompt)

    def test_fallback_when_gemini_unconfigured(self):
        # Ensure GEMINI_API_KEY is empty for this test
        old_key = os.environ.get("GEMINI_API_KEY")
        try:
            if "GEMINI_API_KEY" in os.environ:
                del os.environ["GEMINI_API_KEY"]

            reply, sources, is_mock = generate_guide_reply(
                db=self.db,
                session_id=str(uuid.uuid4()),
                user_id="test-user-1",
                message="Tell me about Ajanta caves",
                region_id="maharashtra",
            )
            self.assertTrue(is_mock)
            self.assertTrue(len(reply) > 20)
            self.assertTrue(len(sources) > 0)
            self.assertIn("Ajanta", reply)
        finally:
            if old_key is not None:
                os.environ["GEMINI_API_KEY"] = old_key


class TestChatEndpointsAndSecurity(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        self.db = SessionLocal()

    def tearDown(self):
        self.db.close()
        app.dependency_overrides.clear()

    # ── Guest chat regression tests ─────────────────────────────────────────

    def test_guest_chat_succeeds_without_token(self):
        """
        Regression: POST /api/v1/chat with no Authorization header must return 200,
        not 401. Guests must receive a grounded AI reply.
        """
        res = self.client.post("/api/v1/chat", json={
            "region_id": "maharashtra",
            "message": "Tell me about Ajanta caves",
        })
        self.assertEqual(res.status_code, 200, f"Expected 200 for guest chat, got {res.status_code}: {res.text}")
        data = res.json()
        self.assertIn("reply", data)
        self.assertTrue(len(data["reply"]) > 10, "Guest reply should not be empty")
        self.assertIn("session_id", data)
        self.assertIn("sources", data)

    def test_guest_chat_odisha_succeeds(self):
        """Guest chat for Odisha region must also return 200."""
        res = self.client.post("/api/v1/chat", json={
            "region_id": "odisha",
            "message": "What is the Rath Yatra festival?",
        })
        self.assertEqual(res.status_code, 200, f"Expected 200 for guest Odisha chat, got {res.status_code}: {res.text}")
        data = res.json()
        self.assertIn("reply", data)

    def test_guest_chat_no_region_succeeds(self):
        """Guest chat with no region_id must return 200 with a general response."""
        res = self.client.post("/api/v1/chat", json={
            "message": "Tell me about Indian heritage",
        })
        self.assertEqual(res.status_code, 200, f"Expected 200 for general guest chat, got {res.status_code}: {res.text}")

    def test_guest_chat_does_not_persist_to_db(self):
        """Guest messages must not be saved to the database."""
        session_id = f"guest-sess-{uuid.uuid4()}"
        res = self.client.post("/api/v1/chat", json={
            "session_id": session_id,
            "region_id": "maharashtra",
            "message": "Tell me about Warli art",
        })
        self.assertEqual(res.status_code, 200)

        # Verify nothing was written to DB for this session
        saved = (
            self.db.query(models.ChatMessage)
            .filter(models.ChatMessage.session_id == session_id)
            .count()
        )
        self.assertEqual(saved, 0, "Guest messages must NOT be persisted to the database")

    # ── Unauthenticated history access ──────────────────────────────────────

    def test_unauthenticated_history_returns_401(self):
        """GET /api/v1/chat/{session_id} without a token must return 401."""
        res = self.client.get(f"/api/v1/chat/{uuid.uuid4()}")
        self.assertEqual(res.status_code, 401)

    # ── Authenticated chat: full flow + ownership ────────────────────────────

    def test_authenticated_chat_and_ownership(self):
        user_a = CurrentUser(id="user-alice-123")
        user_b = CurrentUser(id="user-bob-456")

        # 1. User Alice sends a message
        app.dependency_overrides[get_optional_user] = lambda: user_a

        session_id = f"test-sess-{uuid.uuid4()}"
        res = self.client.post("/api/v1/chat", json={
            "session_id": session_id,
            "region_id": "maharashtra",
            "message": "What is the significance of Raigad Fort?",
            "page_context": "Monuments",
        })
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["session_id"], session_id)
        self.assertIn("reply", data)
        self.assertTrue(len(data["sources"]) > 0)

        # 2. Alice retrieves her chat history
        app.dependency_overrides[get_current_user] = lambda: user_a
        hist_res = self.client.get(f"/api/v1/chat/{session_id}")
        self.assertEqual(hist_res.status_code, 200)
        messages = hist_res.json()
        self.assertGreaterEqual(len(messages), 2)  # 1 user + 1 assistant

        # 3. Bob cannot read Alice's session history → 403
        app.dependency_overrides[get_current_user] = lambda: user_b
        bob_get_res = self.client.get(f"/api/v1/chat/{session_id}")
        self.assertEqual(bob_get_res.status_code, 403)

        # 4. Bob cannot inject into Alice's session → 403
        app.dependency_overrides[get_optional_user] = lambda: user_b
        bob_post_res = self.client.post("/api/v1/chat", json={
            "session_id": session_id,
            "region_id": "maharashtra",
            "message": "Malicious takeover attempt",
        })
        self.assertEqual(bob_post_res.status_code, 403)

    def test_authenticated_chat_persists_to_db(self):
        """Authenticated messages must be saved to the database."""
        user = CurrentUser(id=f"test-persist-{uuid.uuid4()}")
        app.dependency_overrides[get_optional_user] = lambda: user

        session_id = f"auth-sess-{uuid.uuid4()}"
        res = self.client.post("/api/v1/chat", json={
            "session_id": session_id,
            "region_id": "odisha",
            "message": "Tell me about Konark temple",
        })
        self.assertEqual(res.status_code, 200)

        saved = (
            self.db.query(models.ChatMessage)
            .filter(models.ChatMessage.session_id == session_id)
            .count()
        )
        self.assertGreaterEqual(saved, 2, "Authenticated messages (user + assistant) must be persisted")

        # Clean up test data
        self.db.query(models.ChatMessage).filter(
            models.ChatMessage.session_id == session_id
        ).delete()
        self.db.commit()

    # ── Oversized payload validation ────────────────────────────────────────

    def test_oversized_input_validation(self):
        user = CurrentUser(id="user-alice-123")
        app.dependency_overrides[get_optional_user] = lambda: user

        oversized_msg = "A" * 2005
        res = self.client.post("/api/v1/chat", json={
            "region_id": "maharashtra",
            "message": oversized_msg,
        })
        self.assertEqual(res.status_code, 422)


if __name__ == "__main__":
    unittest.main()
