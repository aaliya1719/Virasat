"""
Virasat — AI Cultural Guide Service (Shrishti)
Integrates Gemini securely with database-grounded retrieval from the Virasat heritage archives.

Features:
- Database retrieval over Region, ContentItem, Place, and Source records.
- Grounding prompt with strict anti-hallucination rules and genuine source citations.
- Secure environment variable integration (GEMINI_API_KEY).
- Limited conversation history grounding for contextual follow-up questions.
- Robust fallbacks for missing keys, timeouts, network failures, and empty search results.
"""

import os
import re
import logging
from typing import Optional, Any
from sqlalchemy.orm import Session
from sqlalchemy import or_, func

import models

logger = logging.getLogger("virasat.ai_guide")

STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
    "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both",
    "but", "by", "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does",
    "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had",
    "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "her", "here", "hers", "herself",
    "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn't", "it", "it's", "its",
    "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of",
    "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over",
    "own", "same", "shan't", "she", "should", "shouldn't", "so", "some", "such", "than", "that",
    "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this",
    "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "were",
    "weren't", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "won't",
    "would", "wouldn't", "you", "your", "yours", "yourself", "yourselves", "tell", "please", "give",
    "show", "want", "know", "hello", "hi", "hey", "namaskar"
}


def extract_keywords(text: str) -> list[str]:
    """Extract informative search terms from user input."""
    if not text:
        return []
    words = re.findall(r"\b[a-zA-Z0-9_\u0900-\u097F]{3,}\b", text.lower())
    return [w for w in words if w not in STOPWORDS]


def retrieve_grounding_data(
    db: Session,
    query: str,
    region_id: Optional[str] = None,
    page_context: Optional[str] = None,
    current_topic: Optional[str] = None,
) -> tuple[Optional[models.Region], list[models.ContentItem], list[models.Place], list[str]]:
    """
    Retrieve relevant heritage context and genuine source relationships from the database.
    """
    # 1. Fetch active region if specified
    region: Optional[models.Region] = None
    if region_id:
        region = db.query(models.Region).filter(models.Region.id == region_id).first()

    # Combine text signals for term extraction
    combined_text = f"{query} {current_topic or ''} {page_context or ''}".strip()
    keywords = extract_keywords(combined_text)

    # 2. Retrieve matched ContentItems
    content_query = db.query(models.ContentItem)
    if region_id:
        content_query = content_query.filter(models.ContentItem.region_id == region_id)

    matched_items: list[models.ContentItem] = []
    if keywords:
        clauses = []
        for kw in keywords[:8]:
            pattern = f"%{kw}%"
            clauses.extend([
                func.lower(models.ContentItem.title).like(pattern),
                func.lower(models.ContentItem.subtitle).like(pattern),
                func.lower(models.ContentItem.summary).like(pattern),
                func.lower(models.ContentItem.description).like(pattern),
                func.lower(models.ContentItem.content_type).like(pattern),
                func.lower(models.ContentItem.subtype).like(pattern),
            ])
        matched_items = content_query.filter(or_(*clauses)).limit(6).all()

    # If no keyword matches, fetch featured/sample items for the region
    if not matched_items and region_id:
        matched_items = content_query.limit(4).all()

    # 3. Retrieve matched Places
    place_query = db.query(models.Place)
    if region_id:
        place_query = place_query.filter(models.Place.region_id == region_id)

    matched_places: list[models.Place] = []
    if keywords:
        place_clauses = []
        for kw in keywords[:6]:
            pattern = f"%{kw}%"
            place_clauses.extend([
                func.lower(models.Place.name).like(pattern),
                func.lower(models.Place.description).like(pattern),
                func.lower(models.Place.address).like(pattern),
            ])
        matched_places = place_query.filter(or_(*place_clauses)).limit(3).all()

    if not matched_places and region_id:
        matched_places = place_query.limit(2).all()

    # 4. Extract genuine sources from items and verified metadata
    sources_set: set[str] = set()

    for item in matched_items:
        # Check direct linked sources from DB
        for s in item.sources:
            if s and s.title:
                sources_set.add(s.title)

        # Check verifiable metadata attributes
        if item.unesco_status:
            sources_set.add("UNESCO World Heritage Centre")
            sources_set.add("Archaeological Survey of India (ASI)")
        if item.is_gi_tagged:
            sources_set.add("Geographical Indications Registry of India")
        if item.content_type in ["performing_art", "dance", "music"]:
            sources_set.add("Sangeet Natak Akademi")

    if region_id == "maharashtra":
        sources_set.add("Maharashtra Tourism Development Corporation (MTDC)")
    elif region_id == "odisha":
        sources_set.add("Odisha Tourism Development Corporation (OTDC)")
        sources_set.add("Shree Jagannath Temple Administration (SJTA)")

    if not sources_set:
        sources_set.add("Virasat Cultural Knowledge Base")

    # Order sources deterministically
    ordered_sources = sorted(list(sources_set))
    return region, matched_items, matched_places, ordered_sources


def build_grounding_prompt(
    query: str,
    region: Optional[models.Region],
    items: list[models.ContentItem],
    places: list[models.Place],
    sources: list[str],
    page_context: Optional[str] = None,
) -> str:
    """Build a rich, structured grounding context string for Gemini."""
    parts = []

    if region:
        parts.append(f"### REGION CONTEXT: {region.name} ({region.devanagari or ''})")
        if region.tagline:
            parts.append(f"Tagline: {region.tagline}")
        if region.summary:
            parts.append(f"Overview: {region.summary}")
        if region.highlights:
            parts.append(f"Key Highlights: {', '.join(region.highlights)}")
        parts.append("")

    if page_context:
        parts.append(f"### USER'S CURRENT PAGE/SECTION: {page_context}\n")

    if items:
        parts.append("### VERIFIED HERITAGE ARCHIVE RECORDS:")
        for idx, item in enumerate(items, 1):
            item_text = [f"Item {idx}: {item.title}"]
            if item.content_type or item.subtype:
                item_text.append(f"Type: {item.subtype or item.content_type}")
            if item.historical_era:
                item_text.append(f"Historical Era: {item.historical_era}")
            if item.period:
                item_text.append(f"Period: {item.period}")
            if item.unesco_status:
                item_text.append(f"UNESCO Status: {item.unesco_status}")
            if item.is_gi_tagged:
                item_text.append(f"GI Tag: Yes (Year: {item.gi_year or 'Registered'})")
            if item.summary:
                item_text.append(f"Summary: {item.summary}")
            if item.description:
                # Include first 400 characters of description for detail
                desc_snippet = item.description[:450].strip()
                if len(item.description) > 450:
                    desc_snippet += "..."
                item_text.append(f"Details: {desc_snippet}")
            parts.append(" | ".join(item_text))
        parts.append("")

    if places:
        parts.append("### RELEVANT SITES & MONUMENTS:")
        for p in places:
            p_text = f"Site: {p.name}"
            if p.address:
                p_text += f" (Location: {p.address})"
            if p.description:
                p_text += f" - {p.description[:300]}"
            parts.append(p_text)
        parts.append("")

    if sources:
        parts.append(f"### VERIFIED SOURCE CITATIONS: {', '.join(sources)}\n")

    parts.append(f"### USER QUESTION: {query}")
    return "\n".join(parts)


def get_conversation_history(
    db: Session,
    session_id: str,
    user_id: str,
    limit: int = 6,
) -> list[dict[str, str]]:
    """Retrieve recent conversation history for context continuity."""
    recent_msgs = (
        db.query(models.ChatMessage)
        .filter(
            models.ChatMessage.session_id == session_id,
            models.ChatMessage.user_id == user_id,
        )
        .order_by(models.ChatMessage.created_at.desc())
        .limit(limit)
        .all()
    )
    # Reverse to get chronological order
    recent_msgs.reverse()
    history = []
    for m in recent_msgs:
        history.append({"role": m.role, "content": m.content})
    return history


def call_gemini(
    system_instruction: str,
    history: list[dict[str, str]],
    prompt: str,
) -> Optional[str]:
    """
    Call Gemini model securely using the backend environment variable GEMINI_API_KEY.
    Returns reply text on success, or None if key is missing or call fails.
    """
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        logger.info("GEMINI_API_KEY is not configured. Falling back to grounded archive synthesis.")
        return None
    primary_model = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-lite").strip() or "gemini-3.1-flash-lite"
    models_to_try = [primary_model]
    for m in [
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-flash-lite-latest",
        "gemini-3.5-flash",
        "gemini-3-flash-preview",
        "gemini-3.8-flash",
        "gemini-flash-latest",
    ]:
        if m not in models_to_try:
            models_to_try.append(m)

    # 1. Attempt using google-genai SDK
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        # Build contents including recent history
        contents = []
        for turn in history:
            role = "user" if turn["role"] == "user" else "model"
            contents.append(
                types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=turn["content"])]
                )
            )
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=prompt)]
            )
        )

        config = types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.4,
            max_output_tokens=1024,
        )

        for candidate_model in models_to_try:
            try:
                response = client.models.generate_content(
                    model=candidate_model,
                    contents=contents,
                    config=config,
                )
                if response and response.text:
                    return response.text.strip()
            except Exception as model_err:
                logger.warning(f"google-genai model '{candidate_model}' attempt failed: {model_err}")
                continue
    except Exception as exc:
        logger.warning(f"google-genai SDK initialization failed ({exc}); trying HTTP REST fallback.")

    # 2. HTTP REST fallback via httpx (handles timeout and provider errors)
    try:
        import httpx

        rest_contents = []
        for turn in history:
            role = "user" if turn["role"] == "user" else "model"
            rest_contents.append({
                "role": role,
                "parts": [{"text": turn["content"]}]
            })
        rest_contents.append({
            "role": "user",
            "parts": [{"text": prompt}]
        })

        payload = {
            "system_instruction": {"parts": [{"text": system_instruction}]},
            "contents": rest_contents,
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 1024,
            }
        }

        with httpx.Client(timeout=12.0) as http_client:
            for candidate_model in models_to_try:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{candidate_model}:generateContent?key={api_key}"
                    resp = http_client.post(url, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        candidates = data.get("candidates", [])
                        if candidates:
                            parts = candidates[0].get("content", {}).get("parts", [])
                            if parts and "text" in parts[0]:
                                return parts[0]["text"].strip()
                    else:
                        logger.warning(f"Gemini REST with '{candidate_model}' returned {resp.status_code}")
                except Exception as rest_err:
                    logger.warning(f"Gemini REST with '{candidate_model}' error: {rest_err}")
                    continue
    except Exception as exc:
        logger.error(f"Gemini REST request error: {exc}")
    return None


def synthesize_grounded_fallback(
    query: str,
    region: Optional[models.Region],
    items: list[models.ContentItem],
    places: list[models.Place],
    sources: list[str],
) -> str:
    """
    Synthesize an accurate, grounded cultural reply from available database records
    when Gemini API is not configured or temporarily unavailable.
    """
    region_greeting = "Namaskar!"
    region_name = "India"
    if region:
        region_name = region.name
        if region.id == "odisha":
            region_greeting = "Jai Jagannath!"
        elif region.id == "maharashtra":
            region_greeting = "Jai Maharashtra!"

    if not items and not places:
        if region:
            return (
                f"{region_greeting} I am Shrishti, your cultural guide for {region.name}. "
                f"Our archives currently highlight: {region.summary or region.tagline or 'India’s rich heritage'}. "
                f"Please feel free to ask about specific monuments, arts, festivals, or traditions!"
            )
        return (
            "Namaskar! I am Shrishti, your Virasat AI Cultural Guide. "
            "I could not locate specific archive entries for your query in our current verified collection. "
            "You can explore our documented regions like Maharashtra and Odisha for monuments, arts, and traditions."
        )

    # If we have matched items
    top_item = items[0] if items else None
    lines = [f"{region_greeting} Here is what our verified archives document regarding {region_name}:"]

    if top_item:
        lines.append(f"\n**{top_item.title}**")
        if top_item.summary:
            lines.append(top_item.summary)
        elif top_item.description:
            lines.append(top_item.description[:350].strip() + "...")

        specs = []
        if top_item.historical_era:
            specs.append(f"Historical Era: {top_item.historical_era}")
        if top_item.period:
            specs.append(f"Period: {top_item.period}")
        if top_item.unesco_status:
            specs.append(f"UNESCO: {top_item.unesco_status}")
        if top_item.is_gi_tagged:
            specs.append(f"GI Tag: Registered ({top_item.gi_year or 'Certified'})")
        if specs:
            lines.append(" · ".join(specs))

    # Additional items
    if len(items) > 1:
        other_titles = [f"*{it.title}*" for it in items[1:4]]
        lines.append(f"\nRelated entries in the archive include: {', '.join(other_titles)}.")

    if places:
        place_names = [p.name for p in places[:2]]
        lines.append(f"Associated historical sites: {', '.join(place_names)}.")

    return "\n\n".join(lines)


SYSTEM_PROMPT = """You are Shrishti, the official AI Cultural Guide of Virasat — The Heritage of India.
Your mission is to provide deeply knowledgeable, warm, dignified, and historically accurate guidance on Indian heritage, monuments, sacred arts, architectural marvels, festivals, folklore, and culinary traditions.

GUIDELINES & KNOWLEDGE INTEGRATION:
1. When verified archive records are provided below, prioritize them as primary source ground truth.
2. For questions that extend beyond the specific records in our local archive, use your broad, accurate knowledge of Indian history, culture, philosophy, and archaeology to answer thoroughly, engagingly, and accurately.
3. Never invent false dates, fictional dynasties, or spurious citations. Maintain scholarly historical integrity.
4. When stating facts related to documented monuments, arts, or traditions, weave in genuine references to authoritative institutions (such as Archaeological Survey of India (ASI), UNESCO World Heritage, Sangeet Natak Akademi, or state tourism and cultural bodies) where appropriate.
5. Tone: Respectful, culturally rich, eloquent, and hospitable. Greet warmly using authentic greetings appropriate to the region (e.g., 'Jai Jagannath' for Odisha, 'Namaskar' for Maharashtra/general).
6. Format your answer with clear, elegant markdown paragraphs and bullet points for effortless readability."""


def generate_guide_reply(
    db: Session,
    session_id: str,
    user_id: str,
    message: str,
    region_id: Optional[str] = None,
    page_context: Optional[str] = None,
    current_topic: Optional[str] = None,
) -> tuple[str, list[str], bool]:
    """
    Main entry point for AI Guide response generation.
    Returns: (reply_text, sources, is_mock)
    """
    # 1. Retrieve grounding data and genuine sources from DB
    region, matched_items, matched_places, sources = retrieve_grounding_data(
        db=db,
        query=message,
        region_id=region_id,
        page_context=page_context,
        current_topic=current_topic,
    )

    # 2. Build grounding prompt
    grounding_prompt = build_grounding_prompt(
        query=message,
        region=region,
        items=matched_items,
        places=matched_places,
        sources=sources,
        page_context=page_context,
    )

    # 3. Retrieve conversation history
    history = get_conversation_history(db=db, session_id=session_id, user_id=user_id, limit=6)

    # 4. Attempt Gemini generation
    gemini_reply = call_gemini(
        system_instruction=SYSTEM_PROMPT,
        history=history,
        prompt=grounding_prompt,
    )

    if gemini_reply:
        return gemini_reply, sources, False

    # 5. Fallback to archive synthesis if Gemini is unconfigured or failed
    fallback_reply = synthesize_grounded_fallback(
        query=message,
        region=region,
        items=matched_items,
        places=matched_places,
        sources=sources,
    )
    return fallback_reply, sources, True
