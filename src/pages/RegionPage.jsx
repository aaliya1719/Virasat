import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import maharashtraHtml from '../../maharashtra.html?raw';
import odishaHtml from '../../odisha.html?raw';
import { fetchRegions, fetchRegion, fetchRegionContent, fetchPlaces } from '../lib/api';
import HeritageDetailModal from '../components/HeritageDetailModal';
import '../region.css';

function extractBody(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.innerHTML
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/(src|href)="assets\//g, '$1="/assets/');
}

/**
 * Synchronize live backend API data into the rendered regional DOM.
 * Updates regional header, devanagari title, tagline, category chips,
 * cultural intro summary, and featured explore cards.
 */
function applyApiDataToDom(container, regionData, contentData, placesData, onOpenDetail) {
  if (!container || !regionData) return;

  // 1. Regional title & Devanagari script
  const titleEl = container.querySelector('.region-name');
  if (titleEl && regionData.name) {
    if (regionData.devanagari) {
      titleEl.innerHTML = `${regionData.name} <span class="devanagari-title" style="font-family: 'Cinzel', serif; font-size: 0.65em; opacity: 0.85; margin-left: 8px; font-weight: normal;">(${regionData.devanagari})</span>`;
    } else {
      titleEl.textContent = regionData.name;
    }
  }

  // 2. Tagline
  const taglineEl = container.querySelector('.region-tagline');
  if (taglineEl && regionData.tagline) {
    taglineEl.textContent = regionData.tagline;
  }

  // 3. Category chips
  const chipsContainer = container.querySelector('.category-chips');
  if (chipsContainer && Array.isArray(regionData.categories) && regionData.categories.length > 0) {
    chipsContainer.innerHTML = regionData.categories
      .map(cat => `<span class="chip">${cat}</span>`)
      .join('');
  }

  // 4. Cultural introduction summary
  const introEl = container.querySelector('.intro-text');
  if (introEl && regionData.summary) {
    introEl.textContent = regionData.summary;
  }

  // 5. Sidebar navigation title
  const navTitleEl = container.querySelector('.nav-title');
  if (navTitleEl && regionData.name) {
    navTitleEl.textContent = `Explore ${regionData.name}`;
  }

  // 6. Featured heritage explore cards
  if (Array.isArray(contentData) && contentData.length > 0) {
    const cardEls = container.querySelectorAll('.explore-card');
    cardEls.forEach((cardEl, idx) => {
      const item = contentData[idx];
      if (!item) return;

      const title = cardEl.querySelector('.card-title') || cardEl.querySelector('h3');
      const desc = cardEl.querySelector('.card-desc') || cardEl.querySelector('p');
      const tag = cardEl.querySelector('.card-tag') || cardEl.querySelector('.explore-tag');
      const img = cardEl.querySelector('.explore-img') || cardEl.querySelector('img');

      if (title && item.title) title.textContent = item.title;
      if (desc && item.summary) desc.textContent = item.summary;
      if (tag && (item.content_type || item.subtype)) {
        tag.textContent = (item.subtype || item.content_type).replace(/_/g, ' ').toUpperCase();
      }
      if (img && item.primary_image) {
        img.src = item.primary_image;
      }

      cardEl.style.cursor = 'pointer';
      cardEl.onclick = (e) => {
        e.preventDefault();
        if (onOpenDetail) {
          onOpenDetail({ type: 'content', slug: item.slug, initialData: item });
        }
      };
    });
  }

  // 7. Historical Places & Monuments
  if (Array.isArray(placesData) && placesData.length > 0) {
    const monumentEls = container.querySelectorAll('.monument-card');
    monumentEls.forEach((cardEl, idx) => {
      const place = placesData[idx];
      if (!place) return;

      const title = cardEl.querySelector('h3');
      const era = cardEl.querySelector('.monument-era');
      const desc = cardEl.querySelector('p');

      if (title && place.name) title.textContent = place.name;
      if (era && place.address) era.textContent = place.address;
      if (desc && place.description) desc.textContent = place.description;

      cardEl.style.cursor = 'pointer';
      cardEl.onclick = (e) => {
        e.preventDefault();
        if (onOpenDetail) {
          onOpenDetail({ type: 'place', slug: place.slug, initialData: place });
        }
      };
    });
  }
}

export default function RegionPage() {
  const { regionId } = useParams();
  const containerRef = useRef(null);

  // Normalize slug ('puri' routes to 'odisha')
  const normalizedId = useMemo(() => {
    const id = (regionId || '').toLowerCase().trim();
    return id === 'puri' ? 'odisha' : id;
  }, [regionId]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const [contentData, setContentData] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [allRegions, setAllRegions] = useState([]);

  const [activeDetail, setActiveDetail] = useState({
    isOpen: false,
    type: 'content',
    slug: '',
    initialData: null,
  });

  const handleOpenDetail = ({ type, slug, initialData }) => {
    setActiveDetail({
      isOpen: true,
      type: type || 'content',
      slug,
      initialData: initialData || null,
    });
  };

  const handleCloseDetail = () => {
    setActiveDetail(prev => ({ ...prev, isOpen: false }));
  };

  const isStaticKnown = normalizedId === 'odisha' || normalizedId === 'maharashtra';
  const source = normalizedId === 'odisha' ? odishaHtml : maharashtraHtml;
  const controller = normalizedId === 'odisha' ? '/odisha.js' : '/maharashtra.js';
  const body = useMemo(() => extractBody(source), [source]);

  // Fetch backend data using GET /api/v1/regions, GET /api/v1/regions/{slug}, GET /api/v1/regions/{slug}/content, and GET /api/v1/places
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.allSettled([
      fetchRegions(),
      fetchRegion(normalizedId),
      fetchRegionContent(normalizedId, { limit: 50 }),
      fetchPlaces({ region_id: normalizedId }),
    ]).then(([regionsRes, regionRes, contentRes, placesRes]) => {
      if (cancelled) return;

      if (regionsRes.status === 'fulfilled') {
        setAllRegions(regionsRes.value);
      }

      if (placesRes.status === 'fulfilled' && Array.isArray(placesRes.value)) {
        setPlacesData(placesRes.value);
      }

      if (regionRes.status === 'fulfilled') {
        setRegionData(regionRes.value);
        if (contentRes.status === 'fulfilled') {
          setContentData(contentRes.value);
        }
        setLoading(false);
      } else {
        // Backend API returned error or unreachable
        if (isStaticKnown) {
          // Graceful fallback: Maharashtra & Odisha preserve their content
          console.warn(`[Virasat] Backend unreachable for ${normalizedId}; displaying offline archive.`);
          setLoading(false);
        } else {
          // Unknown region not in backend
          setError(`Cultural archive for "${regionId}" was not found or is currently being curated.`);
          setLoading(false);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [normalizedId, isStaticKnown, regionId]);

  // Always reset scroll to the top when navigating to or switching regional pages.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
  }, [normalizedId]);

  // Synchronize API data into rendered DOM elements whenever API data is ready
  useEffect(() => {
    if (!loading && !error && containerRef.current && regionData) {
      applyApiDataToDom(containerRef.current, regionData, contentData, placesData, handleOpenDetail);
    }
  }, [loading, error, regionData, contentData, placesData, body]);

  // Controller script and mobile responsive bar setup
  useEffect(() => {
    if (loading || error) return;

    document.body.classList.add('regional-route');
    const existing = document.querySelector(`script[src="${controller}"]`);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.src = controller;
    script.async = false;
    document.body.appendChild(script);

    // Setup mobile controls for regional sidebar and cultural assistant
    const setupMobileControls = () => {
      document.querySelector('.mobile-regional-bar')?.remove();
      document.querySelector('.mobile-regional-backdrop')?.remove();

      const sidebar = document.querySelector('.cultural-sidebar');
      const rightPanel = document.querySelector('.right-panel');

      if (!sidebar && !rightPanel) return;

      const bar = document.createElement('div');
      bar.className = 'mobile-regional-bar';
      bar.innerHTML = `
        <button type="button" class="mobile-bar-btn mobile-bar-btn-sidebar" id="mobileSidebarToggleBtn" aria-label="Toggle Regional Navigation">
          <i class="fas fa-compass"></i>
          <span>Topics</span>
        </button>
        <button type="button" class="mobile-bar-btn mobile-bar-btn-chat" id="mobileChatToggleBtn" aria-label="Toggle Cultural Assistant">
          <i class="fas fa-comment-dots"></i>
          <span>AI Guide</span>
        </button>
      `;

      const backdrop = document.createElement('div');
      backdrop.className = 'mobile-regional-backdrop';

      document.body.appendChild(bar);
      document.body.appendChild(backdrop);

      const closeAll = () => {
        sidebar?.classList.remove('open');
        rightPanel?.classList.remove('open');
        backdrop.classList.remove('active');
        document.body.classList.remove('regional-drawer-open');
      };

      backdrop.addEventListener('click', closeAll);

      const sidebarBtn = bar.querySelector('#mobileSidebarToggleBtn');
      const chatBtn = bar.querySelector('#mobileChatToggleBtn');

      sidebarBtn?.addEventListener('click', () => {
        const isOpen = sidebar?.classList.contains('open');
        rightPanel?.classList.remove('open');
        if (isOpen) {
          sidebar?.classList.remove('open');
          backdrop.classList.remove('active');
          document.body.classList.remove('regional-drawer-open');
        } else {
          sidebar?.classList.add('open');
          backdrop.classList.add('active');
          document.body.classList.add('regional-drawer-open');
        }
      });

      chatBtn?.addEventListener('click', () => {
        const isOpen = rightPanel?.classList.contains('open');
        sidebar?.classList.remove('open');
        if (isOpen) {
          rightPanel?.classList.remove('open');
          backdrop.classList.remove('active');
          document.body.classList.remove('regional-drawer-open');
        } else {
          rightPanel?.classList.add('open');
          backdrop.classList.add('active');
          document.body.classList.add('regional-drawer-open');
        }
      });

      sidebar?.querySelectorAll('.cultural-navigation a')?.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 1150) {
            closeAll();
          }
        });
      });
    };

    const timer = setTimeout(setupMobileControls, 50);

    return () => {
      clearTimeout(timer);
      script.remove();
      document.body.classList.remove('regional-route');
      document.body.classList.remove('regional-drawer-open');
      document.querySelector('.mobile-menu-toggle')?.remove();
      document.querySelector('.mobile-regional-bar')?.remove();
      document.querySelector('.mobile-regional-backdrop')?.remove();
    };
  }, [loading, error, controller]);

  // Loading State View
  if (loading) {
    return (
      <div
        className="regional-page regional-loading-state"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#0d0a08',
          color: '#c8943b',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.25rem', filter: 'drop-shadow(0 0 16px rgba(200,148,59,0.5))' }}>
          🪔
        </div>
        <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.75rem', color: '#f3e5ab', marginBottom: '0.6rem' }}>
          Unfolding Regional Heritage Archive…
        </h2>
        <p style={{ maxWidth: '420px', fontSize: '0.95rem', color: '#d0c2b2', lineHeight: '1.6' }}>
          Connecting to Virasat archives to retrieve living traditions, sacred monuments, and cultural narratives.
        </p>
      </div>
    );
  }

  // Error State View
  if (error) {
    return (
      <div
        className="regional-page regional-error-state"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#0d0a08',
          color: '#e0d0b8',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏛️</div>
        <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '1.8rem', color: '#e87a5d', marginBottom: '0.75rem' }}>
          Regional Archive Not Available
        </h2>
        <p style={{ maxWidth: '480px', marginBottom: '2rem', lineHeight: '1.6', fontSize: '0.95rem', color: '#c5b49e' }}>
          {error}
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: '1px solid #c8943b',
              background: 'transparent',
              color: '#c8943b',
              cursor: 'pointer',
              fontWeight: '600',
              fontFamily: 'inherit',
            }}
          >
            ↻ Retry Archive
          </button>
          <Link
            to="/atlas"
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              background: '#b84e29',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '600',
              fontFamily: 'inherit',
            }}
          >
            ← Return to Cultural Atlas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="regional-page"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <HeritageDetailModal
        isOpen={activeDetail.isOpen}
        onClose={handleCloseDetail}
        type={activeDetail.type}
        slug={activeDetail.slug}
        initialData={activeDetail.initialData}
        onNavigatePlace={(placeSlug) => handleOpenDetail({ type: 'place', slug: placeSlug })}
        onNavigateContent={(contentSlug) => handleOpenDetail({ type: 'content', slug: contentSlug })}
      />
    </>
  );
}