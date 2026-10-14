"""
Virasat — Chat Router (v1)
POST /api/v1/chat            → Send a message; supports both guest and authenticated users.
                               Guests receive a grounded AI reply (no DB persistence, no session history).
                               Authenticated users receive grounded AI replies with full DB persistence and
                               session ownership enforcement.
GET  /api/v1/chat/{session}  → Retrieve authenticated chat history (requires valid Supabase token).
"""

import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from auth import CurrentUser, get_current_user, get_optional_user, OptionalUser
from database import get_db
import models
import schemas
from services.ai_guide import generate_guide_reply

router = APIRouter(prefix="/api/v1/chat", tags=["Chat / AI Guide"])

# Sentinel used as the guest user_id for AI service calls (never stored to DB)
_GUEST_USER_ID = "__guest__"


@router.post("", response_model=schemas.ChatResponse, summary="Send a chat message and get an AI guide reply")
def chat(
    req: schemas.ChatRequest,
    db: Session = Depends(get_db),
    current_user: OptionalUser = Depends(get_optional_user),
):
    """
    Accepts both guest (no Authorization header) and authenticated requests.

    Guest flow:
    - No token required.
    - AI reply is generated and returned.
    - Messages are NOT persisted to the database (no session state on server side).
    - Session ownership checks are skipped.

    Authenticated flow:
    - Valid Supabase Bearer token required.
    - Session ownership enforced: a user cannot post to a session owned by another user.
    - Messages are persisted to the database and used for conversation history.
    """
    is_guest = current_user is None

    # ── Guest path ────────────────────────────────────────────────────────────
    if is_guest:
        # Guests always get a fresh or untracked session ID
        session_id = req.session_id or str(uuid.uuid4())

        reply_text, sources, is_mock = generate_guide_reply(
            db=db,
            session_id=session_id,
            user_id=_GUEST_USER_ID,
            message=req.message,
            region_id=req.region_id,
            page_context=req.page_context,
            current_topic=req.current_topic,
        )

        return schemas.ChatResponse(
            session_id=session_id,
            region_id=req.region_id,
            role="assistant",
            reply=reply_text,
            sources=sources,
            is_mock=is_mock,
        )

    # ── Authenticated path ────────────────────────────────────────────────────
    session_id = req.session_id or str(uuid.uuid4())

    # 1. Enforce session ownership: prevent a user from injecting into another user's session
    if req.session_id:
        existing_other = (
            db.query(models.ChatMessage)
            .filter(
                models.ChatMessage.session_id == req.session_id,
                models.ChatMessage.user_id != current_user.id,
            )
            .first()
        )
        if existing_other:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access forbidden: You do not own this chat session.",
            )

    # 2. Generate grounded AI response (with DB conversation history)
    reply_text, sources, is_mock = generate_guide_reply(
        db=db,
        session_id=session_id,
        user_id=current_user.id,
        message=req.message,
        region_id=req.region_id,
        page_context=req.page_context,
        current_topic=req.current_topic,
    )

    # 3. Persist user message
    user_msg = models.ChatMessage(
        user_id=current_user.id,
        session_id=session_id,
        region_id=req.region_id,
        role="user",
        content=req.message,
    )
    db.add(user_msg)

    # 4. Persist assistant message
    asst_msg = models.ChatMessage(
        user_id=current_user.id,
        session_id=session_id,
        region_id=req.region_id,
        role="assistant",
        content=reply_text,
    )
    db.add(asst_msg)
    db.commit()

    return schemas.ChatResponse(
        session_id=session_id,
        region_id=req.region_id,
        role="assistant",
        reply=reply_text,
        sources=sources,
        is_mock=is_mock,
    )


@router.get("/{session_id}", response_model=list[schemas.ChatMessageOut], summary="Get chat history for a session")
def get_chat_history(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),  # Auth required for history
):
    """
    Returns chat history for a session. Requires authentication.
    Enforces session ownership: users can only read their own sessions.
    """
    # Enforce session ownership verification
    existing_other = (
        db.query(models.ChatMessage)
        .filter(
            models.ChatMessage.session_id == session_id,
            models.ChatMessage.user_id != current_user.id,
        )
        .first()
    )
    if existing_other:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: You do not own this chat session.",
        )

    messages = (
        db.query(models.ChatMessage)
        .filter(
            models.ChatMessage.session_id == session_id,
            models.ChatMessage.user_id == current_user.id,
        )
        .order_by(models.ChatMessage.created_at.asc())
        .all()
    )
    return messages
