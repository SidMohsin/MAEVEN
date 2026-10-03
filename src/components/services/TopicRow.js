import Link from 'next/link';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';
import MediaImage from '@/components/ui/MediaImage';
import ServiceList from '@/components/services/ServiceList';
import ImageStrip from '@/components/services/ImageStrip';
import SplitText from '@/components/ui/SplitText';

/**
 * One topic on the Services page: image + text, alternating sides.
 *
 * Reveal rhythm: the image wipes in; the number rises, the name rises word by word, the description
 * follows and the service items stagger in. The lead alternates with the layout:
 *   image-left rows : image first, text follows
 *   image-right rows: text first, image follows
 * Images keep their own proportions at every screen size (no cropping).
 */
export default function TopicRow({ topic, pillar, index, tone }) {
  const imageLeft = index % 2 === 0;
  const number = `${pillar.number}.${String(index + 1).padStart(2, '0')}`;

  const imageDelay = imageLeft ? 0 : 250;
  const t = imageLeft ? 200 : 0; // text lead-in

  return (
    <Section tone={tone} id={topic.slug} className="!py-14 md:!py-24">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className={`min-w-0 md:col-span-5 ${imageLeft ? '' : 'md:order-2'}`}>
          <MediaImage
            id={topic.image}
            need={`${topic.name} image`}
            mark={number}
            aspect="natural"
            fallbackRatio={16 / 10}
            sizes="(min-width: 768px) 40vw, 100vw"
            reveal="wipe"
            delay={imageDelay}
          />
        </div>

        <div className="min-w-0 md:col-span-7">
          <p
            data-reveal="up"
            style={{ '--d': `${t}ms` }}
            className="text-olive-hi flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase"
          >
            <span aria-hidden="true" className="bg-olive h-px w-8" />
            {number}
          </p>
          <SplitText as="h3" delay={t + 80} className="mt-5 text-3xl md:text-4xl">
            {topic.name}
          </SplitText>
          <p
            data-reveal="up"
            style={{ '--d': `${t + 250}ms` }}
            className="text-paper/80 mt-5 max-w-2xl text-base leading-relaxed"
          >
            {topic.description}
          </p>

          <div className="mt-8">
            <ServiceList topic={topic} delay={t + 380} />
          </div>

          {topic.detailPage && (
            <Link
              href={`/services/${topic.slug}`}
              data-reveal="up"
              style={{ '--d': `${t + 500}ms` }}
              className="group text-olive-hi mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:text-white"
            >
              <span className="relative">
                Explore {topic.name}
                <span
                  aria-hidden="true"
                  className="bg-olive-hi absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100"
                />
              </span>
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>

      <ImageStrip ids={topic.gallery} need={`${topic.name} supporting image`} />
    </Section>
  );
}
