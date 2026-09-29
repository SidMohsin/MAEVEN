import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import MediaImage from '@/components/ui/MediaImage';
import Breadcrumb from '@/components/service-detail/Breadcrumb';

/**
 * Service-detail hero: breadcrumb, pillar eyebrow, large title, one-line summary, then a wide visual.
 * Text uses the same CSS entrance as the Services hero; the visual reveals on load.
 * With no `hero`/`image` asset the visual is a labelled placeholder, so the template never breaks.
 */
export default function DetailHero({ topic, pillar, crumbs }) {
  const heroId = topic.hero ?? topic.image ?? null;

  return (
    <Section className="!pt-8 !pb-16 md:!pt-12 md:!pb-24">
      <div className="rise">
        <Breadcrumb items={crumbs} />
      </div>

      <div className="mt-14 md:mt-24">
        <div className="rise" style={{ '--d': '80ms' }}>
          <Eyebrow>
            {pillar.number} {pillar.name}
          </Eyebrow>
        </div>
        <h1
          className="rise mt-6 text-5xl [overflow-wrap:anywhere] md:text-8xl lg:text-[8rem] lg:leading-[0.95]"
          style={{ '--d': '160ms' }}
        >
          {topic.name}
        </h1>
        <p className="rise text-muted mt-6 max-w-xl text-lg" style={{ '--d': '260ms' }}>
          {topic.summary}
        </p>
      </div>

      <MediaImage
        id={heroId}
        need={`${topic.name} hero image`}
        mark={pillar.number}
        aspect="aspect-[16/10] md:aspect-[5/2]"
        sizes="(min-width: 1280px) 1184px, 100vw"
        position="object-[15%_50%] md:object-center"
        priority
        reveal="fade"
        delay={200}
        className="mt-12 md:mt-16"
      />
    </Section>
  );
}
