'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Silent looping clip inside a frame. First paint is the clip's own first frame (poster), so
 * nothing switches. Plays only while on screen, never with reduced motion or data saving, and has
 * a pause control (WCAG 2.2.2). `label` is a small caption in the corner.
 */
export default function InlineVideo({ src, poster, label, className = '' }) {
  const ref = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const conn = navigator.connection;
    const check = () => setAllowed(!reduce.matches && !(conn && conn.saveData));
    check();
    reduce.addEventListener('change', check);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(ref.current);
    return () => {
      reduce.removeEventListener('change', check);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (allowed && inView && !paused) v.play().catch(() => {});
    else v.pause();
  }, [allowed, inView, paused]);

  return (
    <div className={`bg-surface-2 relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="from-ink/70 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 md:inset-x-5 md:bottom-5">
        {label && (
          <span className="text-paper flex items-center gap-2.5 text-[0.65rem] font-medium tracking-[0.22em] uppercase">
            <span aria-hidden="true" className="bg-olive-hi h-px w-5" />
            {label}
          </span>
        )}
        {allowed && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play video' : 'Pause video'}
            className="border-paper/30 text-paper hover:border-olive-hi hover:text-olive-hi flex size-8 shrink-0 items-center justify-center border transition-colors duration-300"
          >
            <svg viewBox="0 0 24 24" className="size-3 fill-current" aria-hidden="true">
              {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
