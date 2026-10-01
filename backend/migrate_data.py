"""
Virasat — SQLite to PostgreSQL / Supabase Data Migration Utility
Dumps existing SQLite records and transfers them cleanly into PostgreSQL.
Usage:
    python migrate_data.py --source sqlite:///./virasat.db --target <SUPABASE_POSTGRES_URL>
Or automatically reads DATABASE_URL from .env as the target.
"""

import os
import sys
import argparse
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Ensure local imports resolve
sys.path.insert(0, os.path.dirname(__file__))

import models
from database import Base

load_dotenv()

def migrate(source_url: str, target_url: str):
    print(f"\n[*] Source Database : {source_url}")
    print(f"[*] Target Database : {target_url.split('@')[-1] if '@' in target_url else target_url}\n")

    # Connect to Source (SQLite)
    source_engine = create_engine(source_url, connect_args={"check_same_thread": False})
    SourceSession = sessionmaker(bind=source_engine)
    src_db = SourceSession()

    # Normalise target URL for SQLAlchemy 2.0 + psycopg2
    if target_url.startswith("postgres://"):
        target_url = target_url.replace("postgres://", "postgresql+psycopg2://", 1)
    elif target_url.startswith("postgresql://") and "+psycopg2" not in target_url:
        target_url = target_url.replace("postgresql://", "postgresql+psycopg2://", 1)

    target_engine = create_engine(target_url, echo=False)
    TargetSession = sessionmaker(bind=target_engine)
    tgt_db = TargetSession()

    try:
        # Step 1: Ensure Target Tables Exist
        print("[1/6] Creating database schema in target PostgreSQL...")
        Base.metadata.create_all(bind=target_engine)
        print("  -> Schema initialized successfully.")

        # Step 2: Migrate Regions
        print("\n[2/6] Migrating Regions...")
        src_regions = src_db.query(models.Region).all()
        for r in src_regions:
            existing = tgt_db.query(models.Region).filter_by(id=r.id).first()
            if not existing:
                tgt_db.add(models.Region(
                    id=r.id,
                    name=r.name,
                    slug=r.slug,
                    devanagari=r.devanagari,
                    tagline=r.tagline,
                    status=r.status,
                    is_pilot=r.is_pilot,
                    zone=r.zone,
                    coord_x=r.coord_x,
                    coord_y=r.coord_y,
                    summary=r.summary,
                    color_accent=r.color_accent,
                    badge=r.badge,
                    categories=r.categories,
                    highlights=r.highlights,
                ))
        tgt_db.commit()
        print(f"  -> {len(src_regions)} Regions synced.")

        # Step 3: Migrate Places
        print("\n[3/6] Migrating Places...")
        src_places = src_db.query(models.Place).all()
        for p in src_places:
            existing = tgt_db.query(models.Place).filter_by(slug=p.slug).first()
            if not existing:
                tgt_db.add(models.Place(
                    id=p.id,
                    region_id=p.region_id,
                    name=p.name,
                    slug=p.slug,
                    description=p.description,
                    latitude=p.latitude,
                    longitude=p.longitude,
                    address=p.address,
                ))
        tgt_db.commit()
        print(f"  -> {len(src_places)} Places synced.")

        # Step 4: Migrate Media & Sources
        print("\n[4/6] Migrating Media & Sources...")
        src_media = src_db.query(models.Media).all()
        for m in src_media:
            existing = tgt_db.query(models.Media).filter_by(id=m.id).first()
            if not existing:
                tgt_db.add(models.Media(
                    id=m.id,
                    title=m.title,
                    media_type=m.media_type,
                    url=m.url,
                    thumbnail_url=m.thumbnail_url,
                    alt_text=m.alt_text,
                    attribution=m.attribution,
                ))

        src_sources = src_db.query(models.Source).all()
        for s in src_sources:
            existing = tgt_db.query(models.Source).filter_by(id=s.id).first()
            if not existing:
                tgt_db.add(models.Source(
                    id=s.id,
                    title=s.title,
                    url=s.url,
                    author=s.author,
                    publisher=s.publisher,
                    publication_year=s.publication_year,
                    citation_text=s.citation_text,
                ))
        tgt_db.commit()
        print(f"  -> {len(src_media)} Media items and {len(src_sources)} Sources synced.")

        # Step 5: Migrate ContentItems
        print("\n[5/6] Migrating ContentItems...")
        src_items = src_db.query(models.ContentItem).all()
        for item in src_items:
            existing = tgt_db.query(models.ContentItem).filter_by(slug=item.slug).first()
            if not existing:
                new_item = models.ContentItem(
                    id=item.id,
                    region_id=item.region_id,
                    place_id=item.place_id,
                    slug=item.slug,
                    title=item.title,
                    subtitle=item.subtitle,
                    content_type=item.content_type,
                    subtype=item.subtype,
                    summary=item.summary,
                    description=item.description,
                    period=item.period,
                    is_gi_tagged=item.is_gi_tagged,
                    gi_year=item.gi_year,
                    unesco_status=item.unesco_status,
                    historical_era=item.historical_era,
                    tags=item.tags,
                    item_metadata=item.item_metadata,
                )
                tgt_db.add(new_item)
        tgt_db.commit()
        print(f"  -> {len(src_items)} ContentItems synced.")

        # Step 6: Migrate Many-to-Many Associations & Chat
        print("\n[6/6] Migrating Associations & Chat Messages...")
        # content_media
        cm_rows = src_db.execute(models.content_media.select()).fetchall()
        for row in cm_rows:
            exists = tgt_db.execute(
                models.content_media.select().where(
                    (models.content_media.c.content_item_id == row.content_item_id) &
                    (models.content_media.c.media_id == row.media_id)
                )
            ).first()
            if not exists:
                tgt_db.execute(
                    models.content_media.insert().values(
                        content_item_id=row.content_item_id,
                        media_id=row.media_id,
                        is_primary=row.is_primary,
                        display_order=row.display_order
                    )
                )

        # content_sources
        cs_rows = src_db.execute(models.content_sources.select()).fetchall()
        for row in cs_rows:
            exists = tgt_db.execute(
                models.content_sources.select().where(
                    (models.content_sources.c.content_item_id == row.content_item_id) &
                    (models.content_sources.c.source_id == row.source_id)
                )
            )
            if not exists:
                tgt_db.execute(
                    models.content_sources.insert().values(
                        content_item_id=row.content_item_id,
                        source_id=row.source_id,
                        note=row.note
                    )
                )

        # chat_messages
        chat_rows = src_db.query(models.ChatMessage).all()
        for c in chat_rows:
            existing = tgt_db.query(models.ChatMessage).filter_by(id=c.id).first()
            if not existing:
                tgt_db.add(models.ChatMessage(
                    id=c.id,
                    user_id=c.user_id,
                    session_id=c.session_id,
                    region_id=c.region_id,
                    role=c.role,
                    content=c.content
                ))

        # Step 7: Sync PostgreSQL Sequences (if targeting PostgreSQL)
        if not target_url.startswith("sqlite"):
            from sqlalchemy import text
            for t in ["places", "media", "sources", "content_items", "chat_messages"]:
                try:
                    tgt_db.execute(text(f"SELECT setval(pg_get_serial_sequence('{t}', 'id'), COALESCE(MAX(id), 1)) FROM {t}"))
                    tgt_db.commit()
                except Exception:
                    pass

        print(f"  -> Associations, Chat messages, and DB sequences synced.")
        print("\n[SUCCESS] Migration completed successfully!")

    except Exception as e:
        tgt_db.rollback()
        print(f"\n[ERROR] Migration failed: {e}")
        raise
    finally:
        src_db.close()
        tgt_db.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Migrate Virasat SQLite database to Supabase PostgreSQL")
    parser.add_argument("--source", default="sqlite:///./virasat.db", help="Source SQLite DB URL")
    parser.add_argument("--target", default=os.getenv("DATABASE_URL"), help="Target PostgreSQL DB URL")
    args = parser.parse_args()

    if not args.target or args.target.startswith("sqlite"):
        print("[!] No target PostgreSQL DATABASE_URL supplied in .env or arguments.")
        print("    Usage: python migrate_data.py --target \"postgresql+psycopg2://user:pass@host:5432/postgres\"")
    else:
        migrate(args.source, args.target)
