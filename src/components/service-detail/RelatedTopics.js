import Link from 'next/link';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';

/**
 * Sibling topics from the same pillar. Links to the detail page when the sibling has one,
 * otherwise to its row on the Services page.
 */
export default function RelatedTopics({ pillar, topics, tone }) {
  if (topics.length === 0) return null;
  return (
    <Section tone={tone} className="md:!py-28">
      <div
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        data-reveal="up"
      >
        <h2 className="text-3xl md:text-5xl">More in {pillar.name}</h2>
        <Link
          href={`/services#${pillar.slug}`}
          className="group text-olive-hi inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
        >
          View all {pillar.name}
          <Icon
            name="arrow"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <ul
        data-reveal="stagger"
        style={{ '--d': '150ms' }}
        className="mt-10 grid gap-4 md:grid-cols-3"
      >
        {topics.map((t) => {
          const number = `${pillar.number}.${String(pillar.topics.findIndex((x) => x.slug === t.slug) + 1).padStart(2, '0')}`;
          return (
            <li key={t.slug}>
              <Link
                href={t.detailPage ? `/services/${t.slug}` : `/services#${t.slug}`}
                className="lift group border-line bg-surface-2 hover:border-olive-hi flex h-full flex-col border p-7"
              >
                <span className="text-olive-hi text-xs tracking-[0.22em]">{number}</span>
                <h3 className="mt-6 text-2xl">{t.name}</h3>
                <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">{t.summary}</p>
                <span className="text-olive-hi mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  {t.detailPage ? 'Explore' : 'See on Services'}
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
