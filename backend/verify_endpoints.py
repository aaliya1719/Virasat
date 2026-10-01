import os
import sys
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

endpoints = [
    ('/', 200),
    ('/health', 200),
    ('/docs', 200),
    ('/openapi.json', 200),
    ('/api/v1/regions', 200),
    ('/api/v1/regions/maharashtra', 200),
    ('/api/v1/regions/odisha', 200),
    ('/api/v1/regions/maharashtra/content', 200),
    ('/api/v1/content', 200),
    ('/api/v1/content/ajanta-caves', 200),
    ('/api/v1/places', 200),
    ('/api/v1/places/ajanta-caves-site', 200),
    ('/api/v1/facts', 200),
    ('/api/v1/facts/random', 200),
    ('/api/v1/search?q=caves', 200),
]

all_passed = True
print("=== VERIFYING ENDPOINTS AGAINST SUPABASE POSTGRESQL ===")
for ep, exp_status in endpoints:
    res = client.get(ep)
    status = res.status_code
    ok = (status == exp_status)
    if not ok:
        all_passed = False
    print(f"GET  {ep:<40} -> status: {status} [{'PASS' if ok else 'FAIL'}]")

chat_res = client.post('/api/v1/chat', json={'region_id': 'maharashtra', 'message': 'Tell me about Warli art'})
chat_ok = chat_res.status_code == 401
print(f"POST {'/api/v1/chat (unauthenticated)':<40} -> status: {chat_res.status_code} [{'PASS' if chat_ok else 'FAIL'}]")

access_token = os.getenv('VIRASAT_TEST_ACCESS_TOKEN')
if access_token:
    auth_headers = {'Authorization': f'Bearer {access_token}'}
    auth_chat_res = client.post(
        '/api/v1/chat',
        headers=auth_headers,
        json={'region_id': 'maharashtra', 'message': 'Tell me about Warli art'},
    )
    auth_chat_ok = auth_chat_res.status_code == 200
    print(f"POST {'/api/v1/chat (authenticated)':<40} -> status: {auth_chat_res.status_code} [{'PASS' if auth_chat_ok else 'FAIL'}]")
    if auth_chat_ok:
        session_id = auth_chat_res.json().get('session_id')
        hist_res = client.get(f'/api/v1/chat/{session_id}', headers=auth_headers)
        hist_ok = hist_res.status_code == 200
        print(f"GET  {'/api/v1/chat/{session_id} (owner)':<40} -> status: {hist_res.status_code} [{'PASS' if hist_ok else 'FAIL'}]")
else:
    auth_chat_ok = True
    print('Authenticated chat checks skipped: VIRASAT_TEST_ACCESS_TOKEN is not set.')

print(f"\nALL SUITE STATUS: {'ALL PASSED' if all_passed and chat_ok and auth_chat_ok else 'SOME FAILED'}")
