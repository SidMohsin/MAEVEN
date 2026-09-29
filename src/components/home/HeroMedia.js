'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { isVisible } from '@/lib/assets';

/**
 * Full-bleed hero visual. Always renders the poster image first; a muted looping video fades in on
 * top of it only when playback is appropriate.
 *
 * Video plays only if ALL hold: a client-cleared video is configured, the visitor has not asked for
 * reduced motion, and the connection is not flagged as data-saving / 2G. Otherwise the poster stays.
 * It pauses while scrolled off-screen, and a small pause control is shown (WCAG 2.2.2).
 */

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

function canAutoplay() {
  const conn = navigator.connection;
  const slow = Boolean(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));
  return !query().matches && !slow;
}

export default function HeroMedia({ asset, video }) {
  // Server snapshot is `false`, so the server never renders a <video>.
  const allowed = useSyncExternalStore(subscribe, canAutoplay, () => false);
  const showVideo = Boolean(video && isVisible(video) && allowed);

  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedByUser = useRef(false);

  // Pause when the hero is off-screen (saves CPU/battery); resume unless the user paused it.
  useEffect(() => {
    const el = ref.current;
    if (!showVideo || !el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !pausedByUser.current) el.play().catch(() => {});
      else el.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [showVideo]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      pausedByUser.current = false;
      el.play().catch(() => {});
      setPaused(false);
    } else {
      pausedByUser.current = true;
      el.pause();
      setPaused(true);
    }
  };

  const posterVisible = isVisible(asset);

  return (
    <>
      <div
        className="bg-ink absolute inset-0 -z-10 overflow-hidden"
        aria-hidden={showVideo || undefined}
      >
        {posterVisible ? (
          <Image
            src={asset.src}
            alt={showVideo ? '' : asset.alt}
            fill
            priority
            sizes="100vw"
            style={asset.focus ? { objectPosition: asset.focus } : undefined}
            className="settle object-cover"
          />
        ) : (
          <div className="from-surface-2 to-ink absolute inset-0 bg-gradient-to-br">
            <span className="text-muted absolute top-6 right-5 text-[0.65rem] tracking-[0.22em] uppercase md:right-8">
              Hero visual
              <span className="text-olive-hi ml-3">
                {asset ? 'Permission pending' : 'Asset required'}
              </span>
            </span>
          </div>
        )}

        {showVideo && (
          <video
            ref={ref}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterVisible ? asset.src : undefined}
            onCanPlay={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {video.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}

        {/* Readability: the lower half (where the text sits) is darkened much more than the top,
            so faces and the upper picture stay visible; a left wash helps the headline. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_0%,rgb(10_10_10/0.88)_30%,rgb(10_10_10/0.5)_58%,rgb(10_10_10/0.25)_100%)]" />
        <div className="from-ink/70 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
      </div>

      {showVideo && ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          className="border-paper/30 text-paper hover:border-olive-hi hover:text-olive-hi bg-ink/60 absolute right-5 bottom-28 z-10 flex size-11 items-center justify-center border transition-colors duration-200 md:right-8 md:bottom-32"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
            {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
          </svg>
        </button>
      )}
    </>
  );
}
