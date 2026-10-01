/**
 * Virasat — API Client
 * Communicates with the FastAPI backend via VITE_API_BASE_URL.
 * All fetch calls go through the helpers below so the base URL is
 * defined in one place and never hard-coded elsewhere.
 */

// Development requests go through Vite's same-origin proxy to avoid browser
// CORS and localhost/127.0.0.1 address mismatches.
import { supabase } from './supabase';

const BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    const err = new Error(`API ${res.status}: ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function authHeaders() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.access_token
    ? { Authorization: `Bearer ${data.session.access_token}` }
    : {};
}

export async function sendChatMessage(payload) {
  return apiFetch('/api/v1/chat', {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function fetchChatHistory(sessionId) {
  return apiFetch(`/api/v1/chat/${encodeURIComponent(sessionId)}`, {
    headers: await authHeaders(),
  });
}

// ── Regions ──────────────────────────────────────────────────────────────────

/**
 * GET /api/v1/regions
 * Returns an array of RegionSummary objects.
 * @param {{ zone?: string, status?: string }} params Optional query params.
 */
export async function fetchRegions(params = {}) {
  const qs = new URLSearchParams();
  if (params.zone) qs.set('zone', params.zone);
  if (params.status) qs.set('status', params.status);
  const query = qs.toString() ? `?${qs}` : '';
  return apiFetch(`/api/v1/regions${query}`);
}

/**
 * GET /api/v1/regions/{slug}
 * Returns a RegionDetail object (includes places + featured_content).
 * @param {string} slug Region slug or ID.
 */
export async function fetchRegion(slug) {
  return apiFetch(`/api/v1/regions/${encodeURIComponent(slug)}`);
}

/**
 * GET /api/v1/regions/{slug}/content
 * Returns an array of ContentItemSummary objects for the region.
 * @param {string} slug Region slug or ID.
 * @param {{ content_type?: string, subtype?: string, is_gi_tagged?: boolean, limit?: number, offset?: number }} params
 */
export async function fetchRegionContent(slug, params = {}) {
  const qs = new URLSearchParams();
  if (params.content_type) qs.set('content_type', params.content_type);
  if (params.subtype) qs.set('subtype', params.subtype);
  if (params.is_gi_tagged != null) qs.set('is_gi_tagged', String(params.is_gi_tagged));
  if (params.limit != null) qs.set('limit', String(params.limit));
  if (params.offset != null) qs.set('offset', String(params.offset));
  const query = qs.toString() ? `?${qs}` : '';
  return apiFetch(`/api/v1/regions/${encodeURIComponent(slug)}/content${query}`);
}

// ── Content ──────────────────────────────────────────────────────────────────

/**
 * GET /api/v1/content
 * Returns an array of ContentItemSummary objects.
 * @param {{ region_id?: string, content_type?: string, subtype?: string, is_gi_tagged?: boolean, limit?: number, offset?: number }} params
 */
export async function fetchContent(params = {}) {
  const qs = new URLSearchParams();
  if (params.region_id) qs.set('region_id', params.region_id);
  if (params.content_type) qs.set('content_type', params.content_type);
  if (params.subtype) qs.set('subtype', params.subtype);
  if (params.is_gi_tagged != null) qs.set('is_gi_tagged', String(params.is_gi_tagged));
  if (params.limit != null) qs.set('limit', String(params.limit));
  if (params.offset != null) qs.set('offset', String(params.offset));
  const query = qs.toString() ? `?${qs}` : '';
  return apiFetch(`/api/v1/content${query}`);
}

/**
 * GET /api/v1/content/{slug}
 * Returns a ContentItemDetail object (with place, media_items, sources).
 * @param {string} slug Content item slug.
 */
export async function fetchContentItem(slug) {
  return apiFetch(`/api/v1/content/${encodeURIComponent(slug)}`);
}

// ── Places ───────────────────────────────────────────────────────────────────

/**
 * GET /api/v1/places
 * Returns an array of PlaceSummary objects.
 * @param {{ region_id?: string }} params Optional query params.
 */
export async function fetchPlaces(params = {}) {
  const qs = new URLSearchParams();
  if (params.region_id) qs.set('region_id', params.region_id);
  const query = qs.toString() ? `?${qs}` : '';
  return apiFetch(`/api/v1/places${query}`);
}

/**
 * GET /api/v1/places/{slug}
 * Returns a PlaceDetail object (with content_items).
 * @param {string} slug Place slug.
 */
export async function fetchPlace(slug) {
  return apiFetch(`/api/v1/places/${encodeURIComponent(slug)}`);
}
