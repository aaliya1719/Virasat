"""
Virasat — FastAPI Application Entry Point
Stack: FastAPI → SQLite (local dev) → Supabase/PostgreSQL (production)
Architecture: Region, ContentItem, Place, Media, Source
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database import engine, Base
from routers import regions, content, places, facts, chat, search


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create all tables on startup (no Alembic needed for local dev)."""
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Virasat API",
    description=(
        "Backend for Virasat — The Heritage of India.\n\n"
        "Serves structured regional cultural data (Regions, ContentItems, Places, Media, Sources), "
        "cultural facts, unified search, and AI chat."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
import os
_extra_origins = [o.strip() for o in os.getenv("CORS_ORIGINS", os.getenv("FRONTEND_URL", "")).split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        *_extra_origins,
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import logging

_logger = logging.getLogger("virasat.main")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    _logger.error(f"422 Validation error on {request.url.path}: {exc.errors()} | body={getattr(exc, 'body', None)}")
    # Sanitize error details: bytes objects in 'input' fields are not JSON-serializable
    safe_errors = []
    for err in exc.errors():
        safe_err = dict(err)
        if isinstance(safe_err.get("input"), bytes):
            safe_err["input"] = safe_err["input"].decode("utf-8", errors="replace")
        safe_errors.append(safe_err)
    return JSONResponse(status_code=422, content={"detail": safe_errors})


# ── Routers (v1) ─────────────────────────────────────────────────────────────
app.include_router(regions.router)
app.include_router(content.router)
app.include_router(places.router)
app.include_router(facts.router)
app.include_router(chat.router)
app.include_router(search.router)


# ── Health / Root ─────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
def root():
    return {
        "status": "ok",
        "service": "Virasat API",
        "version": "1.0.0",
        "endpoints": {
            "regions": "/api/v1/regions",
            "content": "/api/v1/content",
            "places": "/api/v1/places",
            "facts": "/api/v1/facts",
            "search": "/api/v1/search",
            "chat": "/api/v1/chat",
            "docs": "/docs"
        }
    }


@app.get("/health", tags=["Health"])
def health():
    return {"status": "healthy"}
