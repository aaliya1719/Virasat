"""
Virasat - Vercel Python Serverless Entry Point
Vercel invokes this ASGI handler for all /api/* requests.
Adds backend/ to sys.path so relative imports in main.py resolve correctly.
"""
import sys
import os

_backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backend')
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from main import app  # noqa: F401
