import Link from 'next/link';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';
import MediaImage from '@/components/ui/MediaImage';
import ServiceList from '@/components/services/ServiceList';
import ImageStrip from '@/components/services/ImageStrip';

/**
 * One topic on the Services page: image + text, alternating sides.
 *
 * Reveal rhythm follows the layout: each side slides in from its own edge, and the lead alternates.
 *   image-left rows : image first, text follows
 *   image-right rows: text first, image follows
 * Topics without an image get a shorter placeholder tile so the page stays a sensible length.
 */
export default function TopicRow({ topic, pillar, index, tone }) {
  const imageLeft = index % 2 === 0;
  const hasImage = Boolean(topic.image);
  const number = `${pillar.number}.${String(index + 1).padStart(2, '0')}`;

  const imageDelay = imageLeft ? 0 : 170;
  const textDelay = imageLeft ? 170 : 0;

  return (
    <Section tone={tone} id={topic.slug} className="!py-14 md:!py-24">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className={`min-w-0 md:col-span-5 ${imageLeft ? '' : 'md:order-2'}`}>
          <MediaImage
            id={topic.image}
            need={`${topic.name} image`}
            mark={number}
            aspect={hasImage ? 'aspect-[4/3] md:aspect-[4/5]' : 'aspect-[16/9] md:aspect-[16/10]'}
            sizes="(min-width: 768px) 40vw, 100vw"
            reveal={imageLeft ? 'left' : 'right'}
            delay={imageDelay}
          />
        </div>

        <div
          className="min-w-0 md:col-span-7"
          data-reveal={imageLeft ? 'right' : 'left'}
          style={{ '--d': `${textDelay}ms` }}
        >
          <p className="text-olive-hi flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase">
            <span aria-hidden="true" className="bg-olive h-px w-8" />
            {number}
          </p>
          <h3 className="mt-5 text-3xl md:text-4xl">{topic.name}</h3>
          <p className="text-paper/80 mt-5 max-w-2xl text-base leading-relaxed">
            {topic.description}
          </p>

          <div className="mt-8">
            <ServiceList topic={topic} />
          </div>

          {topic.detailPage && (
            <Link
              href={`/services/${topic.slug}`}
              className="group text-olive-hi mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
            >
              <span className="relative">
                Explore {topic.name}
                <span
                  aria-hidden="true"
                  className="bg-olive-hi absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                />
              </span>
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>

      <ImageStrip ids={topic.gallery} need={`${topic.name} supporting image`} />
    </Section>
  );
}
