'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Sticky pillar navigation, styled as an editorial index.
 * Anchors to each pillar section; a passive scroll listener highlights the pillar in view.
 *
 * The underline belongs to each label (so its width always matches the text exactly, with no
 * measuring): it draws in from the left on the active item and retracts to the right on the item
 * you leave. Transform only. On small screens the bar scrolls horizontally and keeps the active
 * item in view.
 */
export default function PillarBar({ pillars }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);
  const scroller = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // A pillar is "current" once its top has passed the header + bar (about 10rem).
      const line = 160;
      let current = 0;
      pillars.forEach((p, i) => {
        const el = document.getElementById(p.slug);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pillars]);

  // Keep the active item visible inside the horizontally scrolling bar (mobile).
  useEffect(() => {
    const box = scroller.current;
    const el = itemRefs.current[active];
    if (!box || !el || box.scrollWidth <= box.clientWidth) return;
    box.scrollTo({
      left: el.offsetLeft - (box.clientWidth - el.clientWidth) / 2,
      behavior: 'smooth',
    });
  }, [active]);

  return (
    <div className="border-line bg-ink/85 sticky top-[4.25rem] z-40 border-b backdrop-blur-md">
      <nav aria-label="Service categories" className="container-page relative">
        <div
          ref={scroller}
          className="-mx-5 flex snap-x scroll-px-5 scrollbar-none overflow-x-auto px-5 md:mx-0 md:px-0"
        >
          {pillars.map((p, i) => {
            const isActive = i === active;
            return (
              <a
                key={p.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                href={`#${p.slug}`}
                aria-current={isActive ? 'location' : undefined}
                className={`flex shrink-0 snap-start py-4 pr-8 text-sm whitespace-nowrap transition-colors duration-300 md:pr-14 md:text-base ${
                  isActive ? 'text-white' : 'text-muted hover:text-paper'
                }`}
              >
                <span className="relative flex items-baseline gap-3 pb-0.5">
                  <span className="font-heading text-olive-hi text-xs tracking-[0.2em]">
                    {p.number}
                  </span>
                  <span className="font-heading tracking-[0.12em] uppercase">{p.name}</span>
                  {/* Underline: exactly the label width; sits on the bar's bottom edge */}
                  <span
                    aria-hidden="true"
                    className={`bg-olive-hi absolute inset-x-0 -bottom-4 h-0.5 transition-transform duration-500 ease-out ${
                      isActive ? 'origin-left scale-x-100' : 'origin-right scale-x-0'
                    }`}
                  />
                </span>
              </a>
            );
          })}
        </div>
        {/* Edge fade hints at horizontal overflow on mobile */}
        <span
          aria-hidden="true"
          className="from-ink pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent md:hidden"
        />
      </nav>
    </div>
  );
}
