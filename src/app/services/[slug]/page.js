import { notFound } from 'next/navigation';
import CtaBand from '@/components/ui/CtaBand';
import DetailHero from '@/components/service-detail/DetailHero';
import Overview from '@/components/service-detail/Overview';
import GalleryGrid from '@/components/service-detail/GalleryGrid';
import ProcessSteps from '@/components/service-detail/ProcessSteps';
import RelatedTopics from '@/components/service-detail/RelatedTopics';
import { site } from '@/data/site';
import { getDetailTopics, getRelatedTopics, getTopic } from '@/lib/services';

/**
 * Service-detail template. One layout for every topic: add `detailPage: true` to a topic in
 * data/services.js and it gets a page (plus its "Explore" link and sitemap entry). Sections that
 * have no data (gallery, process) simply don't render.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getDetailTopics().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return {
    title: topic.name,
    description: topic.description,
    alternates: { canonical: `/services/${topic.slug}` },
    openGraph: { title: `${topic.name} | ${site.name}`, description: topic.description },
  };
}

const nextTone = (tone) => (tone === 'ink' ? 'surface' : 'ink');

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const { pillar } = topic;
  const related = getRelatedTopics(slug);
  const gallery = (topic.gallery ?? []).filter((id) => id !== (topic.hero ?? topic.image));
  const hasProcess = Boolean(topic.process?.length);

  // Alternate band tones down the page (hero is ink), counting only the sections that render.
  const order = [
    'overview',
    gallery.length > 0 && 'gallery',
    hasProcess && 'process',
    related.length > 0 && 'related',
    'cta',
  ].filter(Boolean);
  const toneOf = (key) => (order.indexOf(key) % 2 === 0 ? 'surface' : 'ink');

  const crumbs = [
    { label: 'Services', href: '/services' },
    { label: pillar.name, href: `/services#${pillar.slug}` },
    { label: topic.name },
  ];

  // Structured data: only facts present in the source data (no ratings, prices, addresses, etc.).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: topic.name,
        description: topic.description,
        serviceType: pillar.name,
        url: `${site.url}/services/${topic.slug}`,
        provider: { '@type': 'Organization', name: site.name },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Services', item: `${site.url}/services` },
          {
            '@type': 'ListItem',
            position: 2,
            name: pillar.name,
            item: `${site.url}/services#${pillar.slug}`,
          },
          { '@type': 'ListItem', position: 3, name: topic.name },
        ],
      },
    ],
  };

  return (
    <>
      <DetailHero topic={topic} pillar={pillar} crumbs={crumbs} />
      <Overview topic={topic} tone={toneOf('overview')} />
      {gallery.length > 0 && (
        <GalleryGrid ids={gallery} topicName={topic.name} tone={toneOf('gallery')} />
      )}
      {hasProcess && <ProcessSteps steps={topic.process} tone={toneOf('process')} />}
      {related.length > 0 && (
        <RelatedTopics pillar={pillar} topics={related} tone={toneOf('related')} />
      )}
      <CtaBand
        title="Planning your next shoot?"
        text="Tell us about your products and we’ll plan the packshots and model shoots with you."
        href="/contact"
        label="Get in touch"
        secondary={{ href: '/services', label: 'All services' }}
        tone={toneOf('cta')}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
