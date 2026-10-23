"""
Virasat — AI Cultural Guide Service (Shrishti)
Integrates Gemini securely with database-grounded retrieval from the Virasat heritage archives.

Features:
- Regional awareness: Defaults to active region (e.g. Odisha or Maharashtra). Detects cross-state
  mentions and searches the appropriate region or all regions when asked about other Indian heritage.
- Answer quality: Natural-language term extraction, synonym expansion, and scoring retrieval.
- Heritage boundaries: Clarifies out-of-scope non-heritage requests with warm, polite cultural redirection.
- No hallucinated fallbacks: Only genuine citations directly matching retrieved records.
- Secure environment integration: GEMINI_API_KEY with model fallback cascade.
- DB persistence and session ownership for authenticated users; seamless guest chat flow.
- Deterministic grounded fallback when Gemini is unavailable.
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
    "show", "want", "know", "hello", "hi", "hey", "namaskar", "namaste", "shrishti", "virasat"
}

# Domain-specific synonym mappings to enhance natural language keyword search
SYNONYM_MAP: dict[str, list[str]] = {
    "chariot": ["rath", "yatra", "car", "festival"],
    "chariots": ["rath", "yatra", "car", "festival"],
    "temple": ["temple", "mandir", "deula", "shrine", "kailasa"],
    "temples": ["temple", "mandir", "deula", "shrine", "kailasa", "caves"],
    "dance": ["classical_dance", "performing_art", "odissi", "lavani", "folk"],
    "dances": ["classical_dance", "performing_art", "odissi", "lavani"],
    "fort": ["fort", "capital", "raigad", "maratha", "shivaji"],
    "forts": ["fort", "capital", "raigad", "maratha"],
    "painting": ["painting", "art", "pattachitra", "warli", "craft"],
    "paintings": ["painting", "art", "pattachitra", "warli", "craft"],
    "art": ["art_craft", "pattachitra", "warli", "appliqué", "applique", "chandua"],
    "craft": ["art_craft", "pattachitra", "warli", "appliqué", "applique", "chandua"],
    "cloth": ["saree", "textile", "paithani", "silk", "weaving"],
    "fabric": ["saree", "textile", "paithani", "silk", "weaving"],
    "sweet": ["rasagola", "cuisine", "dessert", "chhena", "modak"],
    "food": ["cuisine", "rasagola", "modak", "misal", "mahaprasad"],
    "cave": ["cave", "caves", "ajanta", "ellora", "kailasa", "monument"],
    "caves": ["cave", "caves", "ajanta", "ellora", "kailasa", "monument"],
    "monument": ["monument", "temple", "fort", "caves", "complex"],
    "monuments": ["monument", "temple", "fort", "caves", "complex"],
    "pilgrimage": ["wari", "pandharpur", "rath", "yatra", "varkari"],
    "god": ["jagannath", "vitthal", "shiva", "ganesh", "sun", "surya"],
    "deity": ["jagannath", "vitthal", "shiva", "ganesh", "sun", "surya"],
}

# Explicit mentions that map to specific regional archives
STATE_MENTIONS: dict[str, str] = {
    "maharashtra": "maharashtra",
    "maharashtrian": "maharashtra",
    "maratha": "maharashtra",
    "mumbai": "maharashtra",
    "pune": "maharashtra",
    "ajanta": "maharashtra",
    "ellora": "maharashtra",
    "raigad": "maharashtra",
    "warli": "maharashtra",
    "paithani": "maharashtra",
    "lavani": "maharashtra",
    "pandharpur": "maharashtra",
    "odisha": "odisha",
    "orissa": "odisha",
    "odia": "odisha",
    "puri": "odisha",
    "konark": "odisha",
    "jagannath": "odisha",
    "pattachitra": "odisha",
    "odissi": "odisha",
    "rasagola": "odisha",
    "pipili": "odisha",
    "raghurajpur": "odisha",
    "chandua": "odisha",
}

# Non-heritage / out-of-scope triggers (e.g. coding, finance, politics, maths)
OFF_TOPIC_PATTERNS = [
    r"\b(write|generate|debug|fix|code)\b.*?\b(code|python|javascript|java|c\+\+|sql|html|css|script|program|algorithm|array|loop)\b",
    r"\b(python|javascript|typescript|c\+\+|java|golang|rust)\s+(script|code|program|function|class|method)\b",
    r"\b(stock|stocks|crypto|bitcoin|forex|invest|investing|cryptocurrency|trade|trading)\b",
    r"\b(solve|calculate|compute)\b.*?\b(equation|math|maths|integral|derivative|matrix|algebra|fibonacci|[0-9\+\-\*\/\^\=]+)\b",
    r"\b(election|political party|bjp|congress|vote for|president election|prime minister salary)\b",
]


def is_off_topic_query(text: str) -> bool:
    """Detect if a user query is clearly unrelated to heritage, culture, art, or history."""
    if not text:
        return False
    lower = text.lower().strip()
    for pattern in OFF_TOPIC_PATTERNS:
        if re.search(pattern, lower):
            return True
    return False


def detect_target_region(query: str, active_region_id: Optional[str] = None) -> tuple[Optional[str], bool]:
    """
    Determine the intended region.
    Returns: (target_region_id, is_cross_state)
    """
    if not query:
        return active_region_id, False

    lower = query.lower()
    detected_regions = set()
    for trigger, r_id in STATE_MENTIONS.items():
        if re.search(r"\b" + re.escape(trigger) + r"\b", lower):
            detected_regions.add(r_id)

    # If the user explicitly mentions a different region than the active page
    if detected_regions:
        if active_region_id and active_region_id not in detected_regions:
            # User specifically asked about another region
            return list(detected_regions)[0], True
        elif active_region_id and active_region_id in detected_regions:
            return active_region_id, False
        else:
            return list(detected_regions)[0], False

    # Default to active page region
    return active_region_id, False


def extract_keywords(text: str) -> list[str]:
    """Extract informative search terms with synonym expansion."""
    if not text:
        return []
    words = re.findall(r"\b[a-zA-Z0-9_\u0900-\u097F]{3,}\b", text.lower())
    terms = [w for w in words if w not in STOPWORDS]

    expanded: list[str] = []
    for t in terms:
        if t not in expanded:
            expanded.append(t)
        if t in SYNONYM_MAP:
            for syn in SYNONYM_MAP[t]:
                if syn not in expanded:
                    expanded.append(syn)
    return expanded


def retrieve_grounding_data(
    db: Session,
    query: str,
    region_id: Optional[str] = None,
    page_context: Optional[str] = None,
    current_topic: Optional[str] = None,
) -> tuple[Optional[models.Region], list[models.ContentItem], list[models.Place], list[str], bool]:
    """
    Retrieve relevant heritage context and genuine source relationships from the database.
    Returns: (region, matched_items, matched_places, ordered_sources, has_sufficient_evidence)
    """
    # 1. Resolve target region with cross-state detection
    target_region_id, is_cross_state = detect_target_region(query, region_id)

    region: Optional[models.Region] = None
    if target_region_id:
        region = db.query(models.Region).filter(models.Region.id == target_region_id).first()
    elif region_id:
        region = db.query(models.Region).filter(models.Region.id == region_id).first()

    # Extract informative keywords from the query
    keywords = extract_keywords(query)
    # If the query itself has very few terms, supplement with topic context
    if len(keywords) < 2 and (current_topic or page_context):
        extra_terms = extract_keywords(f"{current_topic or ''} {page_context or ''}")
        for et in extra_terms:
            if et not in keywords:
                keywords.append(et)

    # 2. Retrieve matched ContentItems
    content_query = db.query(models.ContentItem)
    if target_region_id:
        content_query = content_query.filter(models.ContentItem.region_id == target_region_id)

    matched_items: list[models.ContentItem] = []
    if keywords:
        clauses = []
        for kw in keywords[:10]:
            pattern = f"%{kw}%"
            clauses.extend([
                func.lower(models.ContentItem.title).like(pattern),
                func.lower(models.ContentItem.subtitle).like(pattern),
                func.lower(models.ContentItem.summary).like(pattern),
                func.lower(models.ContentItem.description).like(pattern),
                func.lower(models.ContentItem.content_type).like(pattern),
                func.lower(models.ContentItem.subtype).like(pattern),
            ])
        candidates = content_query.filter(or_(*clauses)).limit(15).all()

        # Score candidates based on term frequency and match position
        scored = []
        for item in candidates:
            score = 0
            t_lower = (item.title or "").lower()
            sub_lower = (item.subtitle or "").lower()
            sum_lower = (item.summary or "").lower()
            desc_lower = (item.description or "").lower()
            type_lower = (item.content_type or "").lower()
            subtype_lower = (item.subtype or "").lower()

            for kw in keywords:
                if kw in t_lower:
                    score += 5
                if kw in sub_lower or kw in type_lower or kw in subtype_lower:
                    score += 3
                if kw in sum_lower:
                    score += 2
                if kw in desc_lower:
                    score += 1
            if score > 0:
                scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
        matched_items = [x[1] for x in scored[:5]]

    # 3. Retrieve matched Places
    place_query = db.query(models.Place)
    if target_region_id:
        place_query = place_query.filter(models.Place.region_id == target_region_id)

    matched_places: list[models.Place] = []
    if keywords:
        place_clauses = []
        for kw in keywords[:8]:
            pattern = f"%{kw}%"
            place_clauses.extend([
                func.lower(models.Place.name).like(pattern),
                func.lower(models.Place.description).like(pattern),
                func.lower(models.Place.address).like(pattern),
            ])
        candidates_places = place_query.filter(or_(*place_clauses)).limit(10).all()

        scored_places = []
        for p in candidates_places:
            score = 0
            name_lower = (p.name or "").lower()
            desc_lower = (p.description or "").lower()
            addr_lower = (p.address or "").lower()
            for kw in keywords:
                if kw in name_lower:
                    score += 4
                if kw in addr_lower:
                    score += 2
                if kw in desc_lower:
                    score += 1
            if score > 0:
                scored_places.append((score, p))
        scored_places.sort(key=lambda x: x[0], reverse=True)
        matched_places = [x[1] for x in scored_places[:3]]

    # Determine if we have genuine, relevant evidence from the database
    has_sufficient_evidence = bool(matched_items or matched_places)

    # 4. Extract genuine sources ONLY from the actually matched records
    sources_set: set[str] = set()

    for item in matched_items:
        # Relational sources linked to item
        try:
            for s in (item.sources or []):
                if s and getattr(s, "title", None):
                    sources_set.add(s.title)
        except Exception as src_err:
            logger.debug(f"Could not load related sources for item {item.id}: {src_err}")

        # Verifiable factual designations directly present on the item
        if item.unesco_status:
            sources_set.add("UNESCO World Heritage Centre")
            sources_set.add("Archaeological Survey of India (ASI)")
        if item.is_gi_tagged:
            sources_set.add("Geographical Indications Registry of India")
        if item.content_type in ["performing_art", "dance", "music"]:
            sources_set.add("Sangeet Natak Akademi")

        # Regional official bodies if item belongs to that state
        if item.region_id == "maharashtra":
            sources_set.add("Maharashtra Tourism Development Corporation (MTDC)")
        elif item.region_id == "odisha":
            sources_set.add("Odisha Tourism Development Corporation (OTDC)")

    for p in matched_places:
        if p.region_id == "maharashtra":
            sources_set.add("Maharashtra Tourism Development Corporation (MTDC)")
            sources_set.add("Archaeological Survey of India (ASI)")
        elif p.region_id == "odisha":
            sources_set.add("Odisha Tourism Development Corporation (OTDC)")
            if "jagannath" in (p.slug or "").lower():
                sources_set.add("Shree Jagannath Temple Administration (SJTA)")

    # If NO relevant items or places matched, DO NOT invent fake authoritative sources.
    ordered_sources = sorted(list(sources_set))
    return region, matched_items, matched_places, ordered_sources, has_sufficient_evidence


def build_grounding_prompt(
    query: str,
    region: Optional[models.Region],
    items: list[models.ContentItem],
    places: list[models.Place],
    sources: list[str],
    page_context: Optional[str] = None,
    is_cross_state: bool = False,
    active_page_region: Optional[str] = None,
) -> str:
    """Build a rich, structured grounding context string for Gemini."""
    parts = []

    if region:
        reg_title = f"### ARCHIVE REGION CONTEXT: {region.name}"
        if region.devanagari:
            reg_title += f" ({region.devanagari})"
        parts.append(reg_title)
        if region.tagline:
            parts.append(f"Tagline: {region.tagline}")
        if region.summary:
            parts.append(f"Regional Summary: {region.summary}")
        parts.append("")

    if is_cross_state and active_page_region:
        parts.append(
            f"NOTE: The user is currently browsing the {active_page_region.capitalize()} regional page, "
            f"but asked specifically about {region.name if region else 'another region'}. "
            f"Acknowledge this gracefully (e.g., 'While you are exploring {active_page_region.capitalize()}, "
            f"here is what our archives document about {region.name if region else 'this topic'}...').\n"
        )

    if page_context:
        parts.append(f"### CURRENT USER VIEW: {page_context}\n")

    if items:
        parts.append("### VERIFIED HERITAGE ARCHIVE RECORDS (DIRECT EVIDENCE):")
        for idx, item in enumerate(items, 1):
            item_text = [f"Item {idx}: {item.title}"]
            if item.content_type or item.subtype:
                item_text.append(f"Type: {item.subtype or item.content_type}")
            if item.historical_era:
                item_text.append(f"Era: {item.historical_era}")
            if item.period:
                item_text.append(f"Period: {item.period}")
            if item.unesco_status:
                item_text.append(f"UNESCO: {item.unesco_status}")
            if item.is_gi_tagged:
                item_text.append(f"GI Tag: Yes (Year: {item.gi_year or 'Certified'})")
            if item.summary:
                item_text.append(f"Summary: {item.summary}")
            if item.description:
                desc_snippet = item.description[:500].strip()
                if len(item.description) > 500:
                    desc_snippet += "..."
                item_text.append(f"Details: {desc_snippet}")
            parts.append(" | ".join(item_text))
        parts.append("")

    if places:
        parts.append("### ASSOCIATED MONUMENTS & SITES:")
        for p in places:
            p_text = f"Site: {p.name}"
            if p.address:
                p_text += f" (Location: {p.address})"
            if p.description:
                p_text += f" - {p.description[:350]}"
            parts.append(p_text)
        parts.append("")

    if sources:
        parts.append(f"### VERIFIED SOURCE CITATIONS: {', '.join(sources)}")
        parts.append("INSTRUCTION: When referencing facts supported by these sources, attribute them honestly.\n")
    else:
        parts.append(
            "### ARCHIVE NOTICE: No direct database records matched this specific query. "
            "If answering from broader Indian cultural knowledge, be transparent that this is general "
            "historical knowledge and not yet in our localized archive. Never invent citations.\n"
        )

    parts.append(f"### USER QUESTION: {query}")
    return "\n".join(parts)


def get_conversation_history(
    db: Session,
    session_id: str,
    user_id: str,
    limit: int = 6,
) -> list[dict[str, str]]:
    """Retrieve recent conversation history for context continuity."""
    # Guests don't have persisted history
    if not user_id or user_id == "__guest__":
        return []

    try:
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
        recent_msgs.reverse()
        history = []
        for m in recent_msgs:
            history.append({"role": m.role, "content": m.content})
        return history
    except Exception as exc:
        logger.warning(f"Unable to retrieve conversation history ({exc}); proceeding without history.")
        return []


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
            temperature=0.3,
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

    # 2. HTTP REST fallback via httpx
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
                "temperature": 0.3,
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
    has_sufficient_evidence: bool,
    is_cross_state: bool = False,
    active_page_region: Optional[str] = None,
) -> str:
    """
    Synthesize an accurate, grounded cultural reply from available database records
    when Gemini API is not configured or temporarily unavailable.
    """
    region_greeting = "Namaskar!"
    region_name = region.name if region else "India"

    if region and region.id == "odisha":
        region_greeting = "Jai Jagannath!"
    elif region and region.id == "maharashtra":
        region_greeting = "Jai Maharashtra!"

    cross_note = ""
    if is_cross_state and active_page_region:
        cross_note = f"*(While you are on the {active_page_region.capitalize()} page, here is what our archives share regarding {region_name})*\n\n"

    # When no records match the query: Never invent fake content or generic placeholders.
    if not has_sufficient_evidence:
        if region:
            return (
                f"{region_greeting} I am Shrishti, your cultural guide. "
                f"Our verified archives for {region.name} currently do not have a dedicated record answering: *\"{query}\"*. "
                f"You can explore our documented treasures in {region.name} such as our registered monuments, classical arts, or sacred festivals."
            )
        return (
            "Namaskar! I am Shrishti, your Virasat AI Cultural Guide. "
            f"I could not locate verified archive entries for \"{query}\" in our current collection. "
            "Please ask about our documented regions—Maharashtra and Odisha—including world heritage monuments, traditional arts, and festivals."
        )

    lines = [f"{cross_note}{region_greeting} Here is what our verified archives document regarding **{region_name}**:"]

    # Matched items
    top_item = items[0] if items else None
    if top_item:
        lines.append(f"\n### {top_item.title}")
        if top_item.summary:
            lines.append(top_item.summary)
        elif top_item.description:
            lines.append(top_item.description[:400].strip() + "...")

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

    if len(items) > 1:
        other_titles = [f"*{it.title}*" for it in items[1:4]]
        lines.append(f"\n**Related Archive Records:** {', '.join(other_titles)}.")

    if places:
        place_names = [f"**{p.name}**" + (f" ({p.address})" if p.address else "") for p in places[:2]]
        lines.append(f"\n**Associated Historical Sites:** {', '.join(place_names)}.")

    return "\n\n".join(lines)


SYSTEM_PROMPT = """You are Shrishti, the official AI Cultural Guide of Virasat — The Heritage of India.
Your mission is to provide deeply knowledgeable, warm, dignified, and historically authentic guidance on Indian heritage, sacred monuments, classical and tribal arts, architecture, philosophy, rituals, festivals, and culinary traditions.

CORE OPERATIONAL PRINCIPLES:
1. REGIONAL AWARENESS:
   - When the user is exploring a specific region (e.g. Odisha or Maharashtra), greet them with the authentic regional greeting ('Jai Jagannath' for Odisha; 'Namaskar' or 'Jai Maharashtra' for Maharashtra).
   - If the user asks about a different state while on a regional page (e.g., asking about Ajanta Caves while browsing Odisha), graciously acknowledge the cross-regional question (e.g., 'While you are exploring Odisha, I would be delighted to share the heritage of Maharashtra...') and answer accurately.
   - For ambiguous questions, provide the relevant regional context first and offer clear guidance.

2. GROUNDING & EVIDENCE INTEGRITY:
   - When verified archive records are provided under 'VERIFIED HERITAGE ARCHIVE RECORDS', treat them as your primary ground truth.
   - Genuine citations are provided under 'VERIFIED SOURCE CITATIONS'. You may attribute facts to these authoritative bodies (e.g. ASI, UNESCO, OTDC, MTDC, Sangeet Natak Akademi) ONLY when supported by the evidence.
   - Never invent nonexistent citations, fictional dynasties, or fabricated historical dates.
   - If our localized archive does not contain records for a specific Indian heritage query, you may draw upon scholarly historical knowledge of Indian civilization, but be honest: do not claim it is an entry from the Virasat local database. If evidence is genuinely insufficient or disputed, state so clearly.

3. HERITAGE BOUNDARIES:
   - Your expertise is strictly dedicated to Indian heritage, art, history, and culture.
   - If the user asks an unrelated question (such as computer programming, commercial finance, stock trading, modern partisan politics, or homework equations), decline warmly and courteously redirect:
     'Namaskar! As Shrishti, my sacred purpose is to illuminate the living heritage, monuments, traditions, and arts of India. I invite you to ask about our architectural marvels, sacred traditions, or living folk crafts!'

4. TONE & STYLE:
   - Respectful, scholarly yet warmly hospitable, culturally rich.
   - Use elegant markdown paragraphs with bullet points for readability."""


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
    clean_msg = (message or "").strip()

    # 1. Heritage Boundary Check: Politely redirect off-topic requests
    if is_off_topic_query(clean_msg):
        redirect_reply = (
            "Namaskar! As Shrishti, your cultural guide for Virasat, my mission is to celebrate and explore "
            "the architectural marvels, sacred traditions, living crafts, and classical arts of Indian heritage. "
            "I cannot assist with queries outside our cultural heritage, but I would be honored to guide you through "
            "India's timeless monuments, folklore, festivals, or culinary legacies!"
        )
        return redirect_reply, [], False

    # 2. Check for explicit cross-state context
    target_region_id, is_cross_state = detect_target_region(clean_msg, region_id)

    # 3. Retrieve grounding data from DB
    region, matched_items, matched_places, sources, has_sufficient_evidence = retrieve_grounding_data(
        db=db,
        query=clean_msg,
        region_id=region_id,
        page_context=page_context,
        current_topic=current_topic,
    )

    # 4. Build rich structured grounding prompt
    grounding_prompt = build_grounding_prompt(
        query=clean_msg,
        region=region,
        items=matched_items,
        places=matched_places,
        sources=sources,
        page_context=page_context,
        is_cross_state=is_cross_state,
        active_page_region=region_id,
    )

    # 5. Retrieve conversation history for context continuity
    history = get_conversation_history(db=db, session_id=session_id, user_id=user_id, limit=6)

    # 6. Attempt Gemini generation
    gemini_reply = call_gemini(
        system_instruction=SYSTEM_PROMPT,
        history=history,
        prompt=grounding_prompt,
    )

    if gemini_reply:
        return gemini_reply, sources, False

    # 7. Fallback to grounded archive synthesis if Gemini is unconfigured or call failed
    fallback_reply = synthesize_grounded_fallback(
        query=clean_msg,
        region=region,
        items=matched_items,
        places=matched_places,
        sources=sources,
        has_sufficient_evidence=has_sufficient_evidence,
        is_cross_state=is_cross_state,
        active_page_region=region_id,
    )
    return fallback_reply, sources, True
