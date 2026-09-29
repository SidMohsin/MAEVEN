import Link from 'next/link';
import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Icon from '@/components/ui/Icon';
import MediaImage from '@/components/ui/MediaImage';

/**
 * Image-led production story: an asymmetric mosaic of real MAEVEN stills with no captions, claims or
 * service labels. Takes five asset ids (data/home.js):
 *
 *   desktop  row 1: [ wide ........ 8 ][ tall .. 4 ]
 *            row 2: [ 4 ][ 4 ][ 4 ]
 *   mobile   first image full width, then two per row.
 */
const SLOTS = [
  {
    col: 'col-span-2 md:col-span-8',
    aspect: 'aspect-[16/10]',
    sizes: '(min-width: 768px) 66vw, 100vw',
  },
  { col: 'md:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 33vw, 50vw' },
  { col: 'md:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 33vw, 50vw' },
  { col: 'md:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width: 768px) 33vw, 50vw' },
  {
    col: 'col-span-2 md:col-span-4',
    aspect: 'aspect-[16/10]',
    sizes: '(min-width: 768px) 33vw, 100vw',
  },
];

export default function WorkMosaic({ images, tone }) {
  const rows = [
    { height: 'md:h-[36rem]', ids: images.slice(0, 2), offset: 0 },
    { height: 'md:h-[28rem]', ids: images.slice(2, 5), offset: 2 },
  ];

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

      <div className="mt-14 space-y-3 md:mt-20 md:space-y-4">
        {rows.map((row) => (
          <div
            key={row.offset}
            className={`grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4 ${row.height}`}
          >
            {row.ids.map((id, j) => {
              const i = row.offset + j;
              const slot = SLOTS[i];
              return (
                <div key={id} className={`${slot.col} md:h-full`}>
                  <MediaImage
                    id={id}
                    need="Production still"
                    aspect={`${slot.aspect} md:aspect-auto md:h-full`}
                    sizes={slot.sizes}
                    reveal="up"
                    delay={j * 110}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Section>
  );
}
