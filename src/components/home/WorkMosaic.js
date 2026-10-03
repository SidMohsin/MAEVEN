import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import SplitText from '@/components/ui/SplitText';
import JustifiedRows from '@/components/ui/JustifiedRows';
import WorkRail from '@/components/home/WorkRail';
import { getAsset } from '@/data/assets';
import { isVisible } from '@/lib/assets';

/**
 * Image-led production story: real MAEVEN stills with a hover caption each (service name + what
 * the photo shows). No cropping at any screen size.
 *
 * When enough images are cleared for publishing, they drift slowly in a full-width rail
 * (WorkRail). Otherwise the section falls back to a still mosaic, so placeholder tiles are never
 * animated.
 */
const MIN_FOR_RAIL = 4;

export default function WorkMosaic({ items, tone }) {
  const resolved = items.map((i) => ({ ...i, asset: getAsset(i.id) })).filter((i) => i.asset);
  const cleared = resolved.filter((i) => isVisible(i.asset));
  const useRail = cleared.length >= MIN_FOR_RAIL;

  const [a, b, c, d, e] = items.map((i) => i.id);
  const byId = Object.fromEntries(items.map((i) => [i.id, { label: i.label, text: i.text }]));

  return (
    // Plain <section> (not <Section>) so the rail can run edge to edge beyond the page container.
    <section className={`${tone === 'surface' ? 'bg-surface' : 'bg-ink'} py-16 md:py-32`}>
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-reveal="up">
              <Eyebrow>Production</Eyebrow>
            </div>
            <SplitText as="h2" className="mt-6 max-w-3xl text-5xl md:text-7xl">
              In the studio and on set
            </SplitText>
          </div>
          <Link
            href="/services/photography"
            data-reveal="up"
            style={{ '--d': '200ms' }}
            className="group text-olive-hi inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-white"
          >
            <span className="relative">
              Explore Photography
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100"
              />
            </span>
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {useRail ? (
        <div className="mt-20 md:mt-24">
          <WorkRail items={cleared} />
        </div>
      ) : (
        <div className="container-page">
          <JustifiedRows
            className="mt-14 md:mt-20"
            need="Production still"
            caption={(id) => byId[id]}
            rows={[
              [a, b],
              [c, d, e],
            ]}
            mobileRows={[[a], [b, c], [d, e]]}
          />
        </div>
      )}
    </section>
  );
}
