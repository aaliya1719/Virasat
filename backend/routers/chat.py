"""
Virasat — Chat Router (v1)
POST /api/v1/chat            → Send a message, get AI reply
GET  /api/v1/chat/{session}  → Retrieve chat history for a session

Phase 1: Stub responses using in-DB knowledge strings.
Phase 2 (TODO): Replace stub with Gemini API + RAG pipeline.
"""

import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional

from auth import CurrentUser, get_current_user
from database import get_db
import models
import schemas

router = APIRouter(prefix="/api/v1/chat", tags=["Chat / AI Guide"])


# ── Stub knowledge base (drawn from verified regional knowledge) ──────────────
_STUB_KNOWLEDGE: dict[str, dict[str, str]] = {
    "maharashtra": {
        "wari": "The Pandharpur Wari is a 700-year-old pilgrimage where over a million Varkaris walk 250 km from Alandi and Dehu to Pandharpur over 21 days, carrying the sacred Padukas of saints Dnyaneshwar and Tukaram, singing Abhangs and erasing caste barriers.",
        "warli": "Warli painting is a GI-tagged tribal art from Palghar made with white rice paste on ochre/mud walls. It uses primal geometric forms — circles for the sun/moon, triangles for mountains/trees, and squares for sacred enclosures, depicting the famous spiral Tarpa dance.",
        "ganesh": "Ganesh Chaturthi was transformed into a massive 10-day public festival in 1893 by Lokmanya Bal Gangadhar Tilak in Pune to foster unity and nationalism. It features vibrant Dhol-Tasha pathaks, Modak sweets, and grand Visarjan processions.",
        "fort": "Maharashtra has over 300 historic forts built by Chhatrapati Shivaji Maharaj using guerrilla warfare strategy (Ganimi Kava). They are categorised into Girikot (hill forts like Raigad), Bhuikot (land forts), and Jalkot (sea forts like Sindhudurg and Murud-Janjira).",
        "caves": "Ajanta and Ellora Caves in Chhatrapati Sambhaji Nagar are UNESCO World Heritage Sites spanning 2nd century BCE to 10th century CE. Ajanta houses exquisite Buddhist frescoes; Ellora's Cave 16 — the Kailasa Temple — is the largest monolithic rock excavation in the world.",
        "food": "Maharashtra's cuisine features Vada Pav, Misal Pav, Ukdiche Modak, Puran Poli, fiery Kolhapuri Tambda-Pandhra Rassa, and coastal seafood with refreshing Sol Kadhi.",
        "paithani": "The Paithani saree is a 2,000-year-old silk and zari weaving tradition from Paithan dating to the Satavahana era. Woven using the Kadiyal tapestry technique, it features iconic peacock (Bangadi-mor) and lotus motifs in pure gold zari.",
        "lavani": "Lavani is Maharashtra's high-energy traditional dance set to the 14-beat Dhadya rhythm of the Dholki. It has two forms: Nirguni (philosophical) and Shringari (celebratory), traditionally performed in Nauvari (9-yard) sarees.",
        "default": "Namaskar! I'm Shrishti, your cultural guide for Maharashtra. Ask me about Maratha hill forts, Ajanta-Ellora caves, Warli painting, the Pandharpur Wari pilgrimage, or delicious Maharashtrian cuisine!",
    },
    "odisha": {
        "rath": "The Rath Yatra is the world's largest chariot festival where three massive wooden chariots — Nandighosh (Jagannath, 45 ft, 16 wheels), Taladhwaja (Balabhadra, 44 ft, 14 wheels), and Darpadalana (Subhadra, 43 ft, 12 wheels) — are built anew every year without blueprints or nails.",
        "temple": "The Shree Jagannath Temple in Puri is a 12th-century Kalinga architectural masterpiece rising 65 metres. Built by Eastern Ganga King Chodaganga Deva, it features the Vimana, Jagamohana, Natamandapa, Bhoga Mandapa, and 120+ inner shrines.",
        "food": "Puri's food is centred around sacred Mahaprasad cooked in the world's largest traditional kitchen with 752 hearths. Signature dishes include Dalma, Kanika sweet rice, Pakhala Bhata (probiotic fermented rice), and GI-tagged Odisha Rasagola.",
        "pattachitra": "Odisha Pattachitra is a GI-tagged classical scroll painting tradition from Raghurajpur. Painted on cloth treated with tamarind seed paste and chalk powder using 100% natural mineral pigments, finished with glowing lac varnish.",
        "dance": "Odissi is one of India's eight classical dances, characterised by Tribhangi (three-bend posture) and Chauka. It evolved from ancient temple Maharis and Gotipua boys' acrobatics, revived globally in the 1950s by Guru Kelucharan Mohapatra.",
        "konark": "The Sun Temple at Konark, 35 km from Puri, is a 13th-century UNESCO World Heritage Site built by Ganga King Narasimhadeva I as a gigantic stone chariot for Surya with 24 carved stone wheels.",
        "rasagola": "Odisha Rasagola received GI Tag No. 612 in 2019, supported by historical evidence that the soft cottage cheese sweet has been offered to Goddess Lakshmi during Niladri Bije since at least the 12th–15th century.",
        "default": "Jai Jagannath! I'm Shrishti, your cultural guide for Odisha. Ask me about the 12th-century Jagannath Temple, Rath Yatra chariots, Pattachitra paintings, sacred Mahaprasad, or classical Odissi!",
    },
}


def _stub_reply(region_id: Optional[str], message: str) -> str:
    lower = message.lower()
    kb = _STUB_KNOWLEDGE.get(region_id or "", {})
    global_kb = {**_STUB_KNOWLEDGE.get("maharashtra", {}), **_STUB_KNOWLEDGE.get("odisha", {})}
    search_kb = kb if kb else global_kb

    for key, response in search_kb.items():
        if key != "default" and key in lower:
            return response

    if any(k in lower for k in ["food", "cuisine", "dish", "eat"]):
        return search_kb.get("food", search_kb.get("default", "Explore India's rich culinary heritage!"))
    if any(k in lower for k in ["dance", "music", "perform"]):
        return search_kb.get("lavani" if region_id == "maharashtra" else "dance", search_kb.get("default", ""))
    if any(k in lower for k in ["art", "paint", "craft"]):
        return search_kb.get("warli" if region_id == "maharashtra" else "pattachitra", search_kb.get("default", ""))
    if any(k in lower for k in ["temple", "monument", "fort", "cave"]):
        return search_kb.get("caves" if region_id == "maharashtra" else "temple", search_kb.get("default", ""))

    return search_kb.get("default", "I am your Virasat cultural guide. Ask me about India's regional heritage, monuments, arts, and traditions!")


@router.post("", response_model=schemas.ChatResponse, summary="Send a chat message and get an AI guide reply")
def chat(
    req: schemas.ChatRequest,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    session_id = req.session_id or str(uuid.uuid4())
    reply_text = _stub_reply(req.region_id, req.message)

    # Save user message
    user_msg = models.ChatMessage(
        user_id=current_user.id,
        session_id=session_id,
        region_id=req.region_id,
        role="user",
        content=req.message,
    )
    db.add(user_msg)

    # Save assistant message
    asst_msg = models.ChatMessage(
        user_id=current_user.id,
        session_id=session_id,
        region_id=req.region_id,
        role="assistant",
        content=reply_text,
    )
    db.add(asst_msg)
    db.commit()

    sources = []
    if req.region_id == "maharashtra":
        sources = ["Maharashtra Tourism (MTDC)", "ASI", "Sangeet Natak Akademi", "GI Registry"]
    elif req.region_id == "odisha":
        sources = ["Odisha Tourism", "Shree Jagannath Temple Administration", "ASI", "GI Registry No. 56 & 612"]
    else:
        sources = ["Virasat Cultural Knowledge Base"]

    return schemas.ChatResponse(
        session_id=session_id,
        region_id=req.region_id,
        role="assistant",
        reply=reply_text,
        sources=sources,
        is_mock=True,
    )


@router.get("/{session_id}", response_model=list[schemas.ChatMessageOut], summary="Get chat history for a session")
def get_chat_history(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
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
