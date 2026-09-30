import Link from 'next/link';
import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import JustifiedRows from '@/components/ui/JustifiedRows';

/**
 * Image-led production story: real MAEVEN stills with no captions, claims or service labels.
 * Every image keeps its own proportions at every screen size (justified rows, no cropping).
 * Takes five asset ids (data/home.js):
 *
 *   desktop  [ wide, tall ]  [ three ]
 *   phone    [ wide ]  [ tall, second ]  [ fourth, fifth ]
 */
export default function WorkMosaic({ images, tone }) {
  const [a, b, c, d, e] = images;

  return (
    <Section tone={tone} className="md:!py-32">
      <div
        data-reveal="up"
        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <Eyebrow>Production</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-5xl md:text-7xl">In the studio and on set</h2>
        </div>
        <Link
          href="/services/photography"
          className="group text-olive-hi inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
        >
          Explore Photography
          <Icon
            name="arrow"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <JustifiedRows
        className="mt-14 md:mt-20"
        need="Production still"
        rows={[
          [a, b],
          [c, d, e],
        ]}
        mobileRows={[[a], [b, c], [d, e]]}
      />
    </Section>
  );
}
