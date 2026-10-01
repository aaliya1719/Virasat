"""
Virasat — SQLAlchemy ORM Models
Core Architecture: Region, Place, Media, Source, ContentItem
Supporting: content_media, content_sources, chat_messages
"""

from sqlalchemy import (
    Column, Integer, String, Text, Boolean, Float,
    ForeignKey, DateTime, JSON, Table
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


# ════════════════════════════════════════════════════════════════════════════
# ASSOCIATION TABLES (Many-to-Many)
# ════════════════════════════════════════════════════════════════════════════

content_media = Table(
    "content_media",
    Base.metadata,
    Column("content_item_id", Integer, ForeignKey("content_items.id", ondelete="CASCADE"), primary_key=True),
    Column("media_id", Integer, ForeignKey("media.id", ondelete="CASCADE"), primary_key=True),
    Column("is_primary", Boolean, default=False),
    Column("display_order", Integer, default=0),
)

content_sources = Table(
    "content_sources",
    Base.metadata,
    Column("content_item_id", Integer, ForeignKey("content_items.id", ondelete="CASCADE"), primary_key=True),
    Column("source_id", Integer, ForeignKey("sources.id", ondelete="CASCADE"), primary_key=True),
    Column("note", String, nullable=True),
)


# ════════════════════════════════════════════════════════════════════════════
# CORE MODELS
# ════════════════════════════════════════════════════════════════════════════

class Region(Base):
    __tablename__ = "regions"

    id = Column(String, primary_key=True, index=True)          # e.g. "maharashtra", "odisha"
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    devanagari = Column(String, nullable=True)
    tagline = Column(String, nullable=True)
    status = Column(String, default="available")                # "available", "coming_soon"
    is_pilot = Column(Boolean, default=False)
    zone = Column(String, nullable=True)                       # "north", "south", "east", "west", "central", "northeast"
    coord_x = Column(Float, nullable=True)
    coord_y = Column(Float, nullable=True)
    summary = Column(Text, nullable=True)
    color_accent = Column(String, nullable=True)
    badge = Column(String, nullable=True)
    categories = Column(JSON, nullable=True)                    # list[str]
    highlights = Column(JSON, nullable=True)                    # list[str]
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    places = relationship("Place", back_populates="region", cascade="all, delete-orphan")
    content_items = relationship("ContentItem", back_populates="region", cascade="all, delete-orphan")
    chat_messages = relationship("ChatMessage", back_populates="region")


class Place(Base):
    __tablename__ = "places"

    id = Column(Integer, primary_key=True, autoincrement=True)
    region_id = Column(String, ForeignKey("regions.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)  # e.g. "ajanta-caves-site", "konark-complex"
    description = Column(Text, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    region = relationship("Region", back_populates="places")
    content_items = relationship("ContentItem", back_populates="place")


class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    media_type = Column(String, default="image", nullable=False)  # "image", "video", "audio", "3d_model"
    url = Column(String, nullable=False)
    thumbnail_url = Column(String, nullable=True)
    alt_text = Column(String, nullable=True)
    attribution = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    content_items = relationship("ContentItem", secondary=content_media, back_populates="media_items")


class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)                       # e.g. "UNESCO World Heritage Centre"
    url = Column(String, nullable=True)
    author = Column(String, nullable=True)
    publisher = Column(String, nullable=True)
    publication_year = Column(Integer, nullable=True)
    citation_text = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    content_items = relationship("ContentItem", secondary=content_sources, back_populates="sources")


class ContentItem(Base):
    __tablename__ = "content_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    region_id = Column(String, ForeignKey("regions.id", ondelete="CASCADE"), nullable=False, index=True)
    place_id = Column(Integer, ForeignKey("places.id", ondelete="SET NULL"), nullable=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=True)
    content_type = Column(String, nullable=False, index=True)   # "monument", "art_craft", "performing_art", "festival_ritual", "cuisine", "textile", "fact", etc.
    subtype = Column(String, nullable=True, index=True)        # "cave_temple", "tribal_art", "classical_dance", "chariot_festival", "trivia", etc.
    summary = Column(Text, nullable=True)
    description = Column(Text, nullable=False)
    period = Column(String, nullable=True)                      # e.g. "2nd century BCE – 5th century CE"
    is_gi_tagged = Column(Boolean, default=False)
    gi_year = Column(Integer, nullable=True)
    unesco_status = Column(String, nullable=True)               # e.g. "World Heritage Site", "Tentative List", "Representative List of ICH"
    historical_era = Column(String, nullable=True)              # e.g. "Rashtrakuta", "Satavahana", "Eastern Ganga", "Maratha"
    tags = Column(JSON, nullable=True)                          # list[str]
    item_metadata = Column(JSON, nullable=True)                 # Flexible metadata dictionary for fact quotes, coordinates, metrics, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    region = relationship("Region", back_populates="content_items")
    place = relationship("Place", back_populates="content_items")
    media_items = relationship("Media", secondary=content_media, back_populates="content_items", lazy="selectin")
    sources = relationship("Source", secondary=content_sources, back_populates="content_items", lazy="selectin")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, nullable=True, index=True)
    session_id = Column(String, index=True)
    region_id = Column(String, ForeignKey("regions.id", ondelete="SET NULL"), nullable=True)
    role = Column(String, nullable=False)                       # "user" | "assistant"
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    region = relationship("Region", back_populates="chat_messages")
