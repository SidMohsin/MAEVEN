'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Route-level scroll behaviour for the App Router.
 *
 *  - New page (link click, push): starts at the top. If the URL has a #hash, Next.js scrolls to that
 *    target itself and we leave it alone.
 *  - Back / forward (popstate): returns to where the visitor was in that history entry.
 *  - Same-page #anchors: untouched (native behaviour).
 *  - Reload: returns to the same position.
 *
 * Browser scroll restoration is unreliable in a client-rendered app (it restores before the previous
 * route re-renders, so positions get clamped), so we take it over (`manual`) and restore after the
 * route commits. Positions are keyed per history entry: each entry gets an id stored in
 * history.state (merged with Next.js's own state), so the same URL visited twice keeps two positions.
 *
 * Also requires `data-scroll-behavior="smooth"` on <html> (see layout.js) so Next.js disables the
 * CSS smooth scrolling during route changes instead of animating the jump.
 */
const STORE = 'maeven:scroll';
const FIELD = '__maevenScroll';

function readStore() {
  try {
    return JSON.parse(sessionStorage.getItem(STORE)) ?? {};
  } catch {
    return {};
  }
}

function writeStore(positions) {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(positions));
  } catch {
    // storage unavailable: in-memory positions still work for this session
  }
}

/** Id of the current history entry, creating one if the entry doesn't have it yet. */
function entryId() {
  const state = window.history.state;
  if (state?.[FIELD]) return state[FIELD];
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  window.history.replaceState({ ...state, [FIELD]: id }, '');
  return id;
}

// Scroll instantly, bypassing CSS `scroll-behavior: smooth`.
function jumpTo(y) {
  window.scrollTo({ top: y, left: 0, behavior: 'instant' });
}

/** Scroll to `y` now and again on the next frame, in case anything moved it after commit. */
function settleAt(y) {
  jumpTo(y);
  requestAnimationFrame(() => {
    if (Math.abs(window.scrollY - y) > 1) jumpTo(y);
  });
}

export default function ScrollManager() {
  const pathname = usePathname();
  const positions = useRef({});
  const current = useRef(null); // id of the entry scroll events are recorded against
  const paused = useRef(false); // true while a route change settles
  const popped = useRef(false); // the pending route change came from back/forward
  const first = useRef(true);

  useEffect(() => {
    positions.current = readStore();
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    current.current = entryId();

    // Reload, or back/forward into the site from another origin: restore this entry's position.
    const nav = performance.getEntriesByType?.('navigation')[0];
    const saved = positions.current[current.current];
    if (nav && (nav.type === 'reload' || nav.type === 'back_forward') && saved != null) {
      settleAt(saved);
    }

    let frame = 0;
    const onScroll = () => {
      if (frame || paused.current) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (paused.current) return;
        // A same-page history change (e.g. a #hash link) moved us to a new entry.
        if (window.history.state?.[FIELD] !== current.current) current.current = entryId();
        positions.current[current.current] = window.scrollY;
      });
    };

    const onPop = () => {
      popped.current = true;
      const routeAtPop = document.documentElement.dataset.route;
      // If the pathname is unchanged no route commit follows (hash-only step), so handle it here.
      requestAnimationFrame(() => {
        if (window.location.pathname !== routeAtPop) return;
        popped.current = false;
        current.current = entryId();
        const y = positions.current[current.current];
        if (y != null) settleAt(y);
      });
    };

    const persist = () => writeStore(positions.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', onPop);
    window.addEventListener('pagehide', persist);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('pagehide', persist);
      if (frame) cancelAnimationFrame(frame);
      persist();
    };
  }, []);

  // Runs after a new route has committed, before paint.
  useLayoutEffect(() => {
    document.documentElement.dataset.route = pathname;
    if (first.current) {
      first.current = false;
      return;
    }

    // Ignore the scroll events this route change produces until it has settled.
    paused.current = true;
    const wasPop = popped.current;
    popped.current = false;

    if (wasPop) {
      const id = window.history.state?.[FIELD];
      settleAt((id && positions.current[id]) ?? 0);
    } else if (!window.location.hash) {
      settleAt(0);
    }

    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        current.current = entryId();
        paused.current = false;
      });
      cleanup.r2 = r2;
    });
    const cleanup = { r2: 0 };
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(cleanup.r2);
      paused.current = false;
    };
  }, [pathname]);

  return null;
}
