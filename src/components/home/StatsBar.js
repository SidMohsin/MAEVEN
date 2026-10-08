'use client';

import { useEffect, useRef, useState } from 'react';
import T from '@/components/ui/T';
import { isPh } from '@/lib/content';

/**
 * Four headline figures under the hero (GoPackshot's stats bar). Real numbers count up once when
 * the bar scrolls into view; placeholders (ph('00+')) stay static. Reduced motion: no counting.
 */
function parse(value) {
  const m = /^([^\d]*)([\d.,]+)(.*)$/.exec(value);
  if (!m) return null;
  const n = parseFloat(m[2].replace(/,/g, ''));
  return Number.isFinite(n)
    ? {
        pre: m[1],
        n,
        post: m[3],
        decimals: (m[2].split('.')[1] || '').length,
        comma: m[2].includes(','),
      }
    : null;
}

function CountUp({ value, start }) {
  const p = parse(value);
  const [shown, setShown] = useState(p ? 0 : null);
  useEffect(() => {
    if (!p || !start) return undefined;
    // Reduced motion: jump straight to the final value (first frame, duration 0).
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1600;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const k = duration ? Math.min(1, (t - t0) / duration) : 1;
      setShown(p.n * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);
  if (!p) return value;
  const num = shown.toFixed(p.decimals);
  return `${p.pre}${p.comma ? Number(num).toLocaleString('en-US') : num}${p.post}`;
}

export default function StatsBar({ stats, tone }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="MAEVEN in numbers"
      className={tone === 'olive' ? 'tone-olive' : 'border-line bg-surface border-y'}
    >
      <dl className="container-page grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`border-line flex flex-col-reverse items-center py-7 text-center md:py-10 ${
              i % 2 ? 'border-l' : ''
            } ${i > 0 ? 'md:border-l' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''}`}
          >
            <dt className="text-muted mt-2 text-xs tracking-[0.16em] uppercase">{s.label}</dt>
            <dd className="font-heading text-4xl text-white tabular-nums md:text-5xl">
              {isPh(s.value) ? <T v={s.value} /> : <CountUp value={s.value} start={seen} />}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
