"""
Virasat — Pydantic Schemas (v2)
Data Transfer Objects for Region, ContentItem, Place, Media, Source, Facts, Search, Chat
"""

from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, Any
from datetime import datetime


# ════════════════════════════════════════════════════════════════════════════
# MEDIA & SOURCE SCHEMAS
# ════════════════════════════════════════════════════════════════════════════

class MediaBase(BaseModel):
    title: str
    media_type: str = "image"
    url: str
    thumbnail_url: Optional[str] = None
    alt_text: Optional[str] = None
    attribution: Optional[str] = None


class MediaOut(MediaBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class SourceBase(BaseModel):
    title: str
    url: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    publication_year: Optional[int] = None
    citation_text: Optional[str] = None


class SourceOut(SourceBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# ════════════════════════════════════════════════════════════════════════════
# PLACE SCHEMAS
# ════════════════════════════════════════════════════════════════════════════

class PlaceSummary(BaseModel):
    id: int
    region_id: str
    name: str
    slug: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    address: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class PlaceDetail(PlaceSummary):
    description: Optional[str] = None
    created_at: Optional[datetime] = None
    content_items: list["ContentItemSummary"] = []

    model_config = ConfigDict(from_attributes=True)


# ════════════════════════════════════════════════════════════════════════════
# CONTENT ITEM SCHEMAS
# ════════════════════════════════════════════════════════════════════════════

class ContentItemSummary(BaseModel):
    id: int
    region_id: str
    place_id: Optional[int] = None
    slug: str
    title: str
    subtitle: Optional[str] = None
    content_type: str
    subtype: Optional[str] = None
    summary: Optional[str] = None
    period: Optional[str] = None
    is_gi_tagged: bool = False
    gi_year: Optional[int] = None
    unesco_status: Optional[str] = None
    historical_era: Optional[str] = None
    tags: Optional[list[str]] = []
    primary_image: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ContentItemDetail(BaseModel):
    id: int
    region_id: str
    place_id: Optional[int] = None
    slug: str
    title: str
    subtitle: Optional[str] = None
    content_type: str
    subtype: Optional[str] = None
    summary: Optional[str] = None
    description: str
    period: Optional[str] = None
    is_gi_tagged: bool = False
    gi_year: Optional[int] = None
    unesco_status: Optional[str] = None
    historical_era: Optional[str] = None
    tags: Optional[list[str]] = []
    item_metadata: Optional[dict[str, Any]] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    # Nested relationships
    place: Optional[PlaceSummary] = None
    media_items: list[MediaOut] = []
    sources: list[SourceOut] = []

    model_config = ConfigDict(from_attributes=True)


# ════════════════════════════════════════════════════════════════════════════
# REGION SCHEMAS
# ════════════════════════════════════════════════════════════════════════════

class RegionSummary(BaseModel):
    id: str
    name: str
    slug: str
    devanagari: Optional[str] = None
    tagline: Optional[str] = None
    status: str = "available"
    is_pilot: bool = False
    zone: Optional[str] = None
    coord_x: Optional[float] = None
    coord_y: Optional[float] = None
    summary: Optional[str] = None
    color_accent: Optional[str] = None
    badge: Optional[str] = None
    categories: Optional[list[str]] = []
    highlights: Optional[list[str]] = []
    content_count: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class RegionDetail(RegionSummary):
    created_at: Optional[datetime] = None
    places: list[PlaceSummary] = []
    featured_content: list[ContentItemSummary] = []

    model_config = ConfigDict(from_attributes=True)


# ════════════════════════════════════════════════════════════════════════════
# FACTS SCHEMAS (Derived from ContentItem type="fact")
# ════════════════════════════════════════════════════════════════════════════

class FactOut(BaseModel):
    id: int
    slug: str
    region_id: str
    region_name: Optional[str] = None
    tag: Optional[str] = None
    region_label: Optional[str] = None
    quote: str
    description: str
    explore_link: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# ════════════════════════════════════════════════════════════════════════════
# SEARCH SCHEMAS
# ════════════════════════════════════════════════════════════════════════════

class SearchResult(BaseModel):
    query: str
    total_results: int
    regions: list[RegionSummary] = []
    content_items: list[ContentItemSummary] = []
    places: list[PlaceSummary] = []


# ════════════════════════════════════════════════════════════════════════════
# CHAT SCHEMAS
# ════════════════════════════════════════════════════════════════════════════

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    region_id: Optional[str] = None
    message: str = Field(..., min_length=1, max_length=2000)
    page_context: Optional[str] = None
    current_topic: Optional[str] = None


class ChatResponse(BaseModel):
    session_id: str
    region_id: Optional[str] = None
    role: str = "assistant"
    reply: str
    sources: list[str] = []
    is_mock: bool = True


class ChatMessageOut(BaseModel):
    id: int
    session_id: str
    region_id: Optional[str] = None
    role: str
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
