"""Supabase Auth token validation for protected API routes."""

import os
from dataclasses import dataclass

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from dotenv import load_dotenv

load_dotenv()

_bearer = HTTPBearer(auto_error=False)


@dataclass(frozen=True)
class CurrentUser:
    id: str


def _supabase_auth_config() -> tuple[str, str]:
    url = (os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL") or "").rstrip("/")
    anon_key = os.getenv("SUPABASE_ANON_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY") or ""
    return url, anon_key


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> CurrentUser:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="A valid Supabase access token is required.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    supabase_url, anon_key = _supabase_auth_config()
    if not supabase_url or not anon_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Supabase Auth validation is not configured.",
        )

    try:
        response = httpx.get(
            f"{supabase_url}/auth/v1/user",
            headers={
                "apikey": anon_key,
                "Authorization": f"Bearer {credentials.credentials}",
            },
            timeout=5.0,
        )
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Supabase Auth validation is unavailable.",
        ) from exc

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Supabase access token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = response.json().get("id")
    if not isinstance(user_id, str) or not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Supabase access token has no valid user identity.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return CurrentUser(id=user_id)