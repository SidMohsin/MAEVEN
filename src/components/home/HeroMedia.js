'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { isVisible } from '@/lib/assets';

/**
 * Full-bleed hero visual, in order of preference:
 *   1. a client-cleared video (muted, looping), when `video` is configured
 *   2. a crossfade of real MAEVEN stills with a slow zoom/pan (temporary, until footage exists)
 *   3. the first still, static
 *
 * Motion only runs when the visitor has not asked for reduced motion and the connection isn't
 * data-saving / 2G. It pauses while the hero is off-screen or the tab is hidden, and a pause
 * control is always offered while something moves (WCAG 2.2.2). The server always renders the
 * first still, so it is the first paint and the LCP image.
 *
 * `slides`: [{ asset, label, detail }] (asset objects from data/assets.js).
 * The information card (top right) shows which slide is on screen and a progress line.
 */
const SLIDE_MS = 7000;
const query = () => window.matchMedia('(prefers-reduced-motion: reduce)');

function subscribe(cb) {
  const mq = query();
  mq.addEventListener('change', cb);
  const conn = navigator.connection;
  conn?.addEventListener?.('change', cb);
  return () => {
    mq.removeEventListener('change', cb);
    conn?.removeEventListener?.('change', cb);
  };
}

function canAnimate() {
  const conn = navigator.connection;
  const slow = Boolean(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));
  return !query().matches && !slow;
}

// Alternate the pan direction per slide so consecutive stills don't drift the same way.
const PANS = [
  { '--kx': '-2%', '--ky': '-1%' },
  { '--kx': '2%', '--ky': '1%' },
  { '--kx': '-1.5%', '--ky': '1.5%' },
];

function PauseButton({ paused, onClick, label, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={paused ? `Play ${label}` : `Pause ${label}`}
      className={`border-paper/30 text-paper hover:border-olive-hi hover:text-olive-hi flex size-9 shrink-0 items-center justify-center border transition-colors duration-300 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
        {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
      </svg>
    </button>
  );
}

export default function HeroMedia({ slides = [], video }) {
  // Server snapshot is `false`: the server renders the first still only.
  const allowed = useSyncExternalStore(subscribe, canAnimate, () => false);
  const stills = slides.filter((s) => isVisible(s.asset));
  const first = stills[0] ?? null;
  const showVideo = Boolean(video && isVisible(video) && allowed);
  const showSlides = !showVideo && allowed && stills.length > 1;

  const root = useRef(null);
  const videoRef = useRef(null);
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: -1 });
  const [mounted, setMounted] = useState(false); // later slides load after the first paint
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const running = (showSlides || showVideo) && !userPaused && inView;

  // Load the remaining stills shortly after first paint so they don't compete with the LCP image.
  useEffect(() => {
    if (!showSlides) return undefined;
    const t = setTimeout(() => setMounted(true), 1500);
    return () => clearTimeout(t);
  }, [showSlides]);

  // Off-screen or hidden tab: stop moving.
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && !document.hidden));
    const onVis = () => setInView(!document.hidden && el.getBoundingClientRect().bottom > 0);
    io.observe(el);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // The slide changes when the progress line finishes, so pausing (button, off-screen, hidden tab)
  // freezes both together and they never drift apart.
  const advance = () => setSlide((s) => ({ index: (s.index + 1) % stills.length, prev: s.index }));

  // Video play/pause follows `running`.
  useEffect(() => {
    const v = videoRef.current;
    if (!showVideo || !v) return;
    if (running) v.play().catch(() => {});
    else v.pause();
  }, [showVideo, running]);

  const current = showSlides ? stills[index] : first;

  return (
    <>
      <div
        ref={root}
        className="bg-ink absolute inset-0 -z-10 overflow-hidden"
        data-paused={!running || undefined}
        aria-hidden={showVideo || showSlides || undefined}
      >
        {first ? (
          stills.slice(0, showSlides && mounted ? stills.length : 1).map((s, i) => (
            <div
              key={s.asset.id}
              className="hero-slide absolute inset-0"
              data-state={i === index ? 'active' : i === prev ? 'prev' : undefined}
              style={PANS[i % PANS.length]}
            >
              <Image
                src={s.asset.src}
                alt={showSlides || showVideo ? '' : s.asset.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                style={s.asset.focus ? { objectPosition: s.asset.focus } : undefined}
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <div className="from-surface-2 to-ink absolute inset-0 bg-gradient-to-br">
            <span className="text-muted absolute top-6 right-5 text-[0.65rem] tracking-[0.22em] uppercase md:right-8">
              Hero visual
              <span className="text-olive-hi ml-3">Asset required</span>
            </span>
          </div>
        )}

        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={first?.asset.src}
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {video.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}

        {/* Readability: the lower half (where the text sits) is darkened much more than the top. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_0%,rgb(10_10_10/0.88)_30%,rgb(10_10_10/0.5)_58%,rgb(10_10_10/0.25)_100%)]" />
        <div className="from-ink/70 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
      </div>

      {/* Information card: what is on screen, slide progress and the pause control. */}
      {first && (showSlides || !showVideo) && current?.label && (
        <div className="pointer-events-none absolute inset-x-0 top-5 z-10 md:top-8">
          <div className="container-page flex justify-end">
            <div
              className="pop-in border-olive bg-ink/75 pointer-events-auto flex w-60 items-center gap-4 border-l py-3 pr-3 pl-4 md:w-72"
              style={{ '--d': '900ms' }}
            >
              <div className="min-w-0 flex-1">
                <p className="text-paper/60 flex items-center justify-between text-[0.6rem] tracking-[0.22em] uppercase">
                  <span>Photography</span>
                  {showSlides && (
                    <span className="tabular-nums">
                      {String(index + 1).padStart(2, '0')} /{' '}
                      {String(stills.length).padStart(2, '0')}
                    </span>
                  )}
                </p>
                <p key={`l${index}`} className="pop-in mt-2 truncate text-sm text-white">
                  {current.label}
                </p>
                <p
                  key={`d${index}`}
                  className="pop-in text-muted truncate text-xs"
                  style={{ '--d': '120ms' }}
                >
                  {current.detail}
                </p>
                {showSlides && (
                  <div className="bg-paper/15 mt-3 h-px overflow-hidden">
                    <div
                      key={`p${index}`}
                      className="hero-progress bg-olive-hi h-px"
                      style={{
                        '--slide-ms': `${SLIDE_MS}ms`,
                        animationPlayState: running ? 'running' : 'paused',
                      }}
                      onAnimationEnd={advance}
                    />
                  </div>
                )}
              </div>
              {showSlides && (
                <PauseButton
                  paused={userPaused}
                  onClick={() => setUserPaused((p) => !p)}
                  label="hero slideshow"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {showVideo && videoReady && (
        <PauseButton
          paused={userPaused}
          onClick={() => setUserPaused((p) => !p)}
          label="background video"
          className="bg-ink/60 absolute right-5 bottom-28 z-10 md:right-8 md:bottom-32"
        />
      )}
    </>
  );
}
