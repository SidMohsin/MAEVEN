import Image from 'next/image';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import SplitText from '@/components/ui/SplitText';
import { getAsset } from '@/data/assets';

/**
 * Portfolio mosaic (GoPackshot's category grid): seven labelled tiles on a 4-column grid.
 *   desktop:  [ big 2x2 ][ 1 ][ 2 (tall) ]
 *             [ big    ][ 3 ][ 2       ]
 *             [ 4 ][ 5 ][ 3 ][ 6       ]   (see CELLS)
 * Each tile zooms slightly and its label line extends on hover. Phones: two columns.
 */
const CELLS = [
  'col-span-2 row-span-2 md:col-span-2 md:row-span-2', // big
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2',
  'md:col-span-1 md:row-span-2',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
];

export default function PortfolioMosaic({ portfolio }) {
  return (
    <section className="bg-ink py-20 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <div data-reveal="up" className="flex justify-center">
            <Eyebrow>{portfolio.eyebrow}</Eyebrow>
          </div>
          <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
            {portfolio.title}
          </SplitText>
          <p data-reveal="up" style={{ '--d': '250ms' }} className="text-muted mt-6 text-lg">
            {portfolio.text}
          </p>
        </div>

        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 md:mt-20 md:auto-rows-[15rem] md:grid-cols-4 md:gap-4">
          {portfolio.tiles.map((t, i) => {
            const a = getAsset(t.image);
            return (
              <li
                key={t.image}
                data-reveal="wipe"
                style={{ '--d': `${(i % 4) * 100}ms` }}
                className={`group relative overflow-hidden ${CELLS[i] ?? ''}`}
              >
                <div data-wipe className="bg-surface-2 absolute inset-0">
                  <div data-reveal-scale className="absolute inset-0">
                    {a && (
                      <Image
                        src={a.src}
                        alt={a.alt}
                        fill
                        sizes={
                          i === 0
                            ? '(min-width: 768px) 50vw, 100vw'
                            : '(min-width: 768px) 25vw, 50vw'
                        }
                        style={a.focus ? { objectPosition: a.focus } : undefined}
                        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
                      />
                    )}
                  </div>
                  <div className="from-ink/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                    <span
                      aria-hidden="true"
                      className="bg-olive-hi mb-2 block h-0.5 w-6 transition-all duration-500 ease-[var(--ease-expo)] group-hover:w-12"
                    />
                    <span className="text-xs font-medium tracking-[0.18em] text-white uppercase">
                      {t.label}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div data-reveal="up" className="mt-12 flex justify-center">
          <Link
            href="/services/photography"
            className="group text-olive-hi inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-white"
          >
            View our photography
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
