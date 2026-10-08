'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';

/**
 * Client testimonials (GoPackshot's slider): cards in a horizontally scrolling row with
 * previous / next buttons and position dots. Native scroll-snap, so swipe, trackpad and keyboard
 * work without extra code. Three cards visible on desktop, one on phones.
 */
export default function Testimonials({ testimonials }) {
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const go = (dir) => {
    const el = track.current;
    el?.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="atmos atmos-1 bg-ink py-20 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <div data-reveal="up" className="flex justify-center">
            <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          </div>
          <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
            {testimonials.title}
          </SplitText>
        </div>

        <div className="relative mt-14 md:mt-20" data-reveal="up" style={{ '--d': '200ms' }}>
          <ul
            ref={track}
            onScroll={measure}
            aria-label="Client testimonials"
            tabIndex={0}
            className="focus-visible:outline-olive-hi -mx-1 flex snap-x snap-mandatory scrollbar-none gap-5 overflow-x-auto px-1"
          >
            {testimonials.items.map((t) => (
              <li
                key={t.id}
                className="border-line bg-surface/80 flex w-full shrink-0 snap-start flex-col border p-7 md:w-[calc((100%-2.5rem)/3)] md:p-8"
              >
                <p className="font-heading text-paper/60 text-sm tracking-[0.2em] uppercase">
                  <T v={t.brand} />
                </p>
                <p className="font-heading mt-5 text-2xl leading-snug text-white">
                  <T v={t.headline} />
                </p>
                <blockquote className="text-paper/75 mt-5 flex-1 border-l-2 border-[var(--color-olive)] pl-4 text-sm leading-relaxed">
                  <T v={t.quote} />
                </blockquote>
                <p className="mt-7 text-sm font-medium text-white">
                  <T v={t.name} />
                </p>
                <p className="text-muted text-xs">
                  <T v={t.role} />
                </p>
              </li>
            ))}
          </ul>

          {pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={page === 0}
                aria-label="Previous testimonials"
                className="border-line hover:border-olive-hi hover:text-olive-hi flex size-10 items-center justify-center rounded-full border text-white transition-colors duration-300 disabled:opacity-30"
              >
                <Icon name="chevron-left" className="size-4" />
              </button>
              <div className="flex gap-2" aria-hidden="true">
                {Array.from({ length: pages }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === page ? 'bg-olive-hi w-6' : 'bg-line w-1.5'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={page >= pages - 1}
                aria-label="Next testimonials"
                className="border-line hover:border-olive-hi hover:text-olive-hi flex size-10 items-center justify-center rounded-full border text-white transition-colors duration-300 disabled:opacity-30"
              >
                <Icon name="chevron-right" className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
