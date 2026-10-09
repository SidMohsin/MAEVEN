import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';
import ContinueExploring from '@/components/ui/ContinueExploring';
import PillarBar from '@/components/services/PillarBar';
import ServiceBlock from '@/components/services/ServiceBlock';
import { SERVICE_BLOCKS } from '@/data/servicesPage';
import { contact } from '@/data/site';
import { getPillars } from '@/lib/services';

export const metadata = {
  title: 'Services',
  description:
    'Content & Production, Smart Tech, and Creative & Brand services from MAEVEN Productions.',
};

function buildBlock(block, pillars, bi) {
  const pillar = pillars.find((p) => p.slug === block.pillar);
  const cards = block.topics.map((slug) => {
    const index = pillar.topics.findIndex((t) => t.slug === slug);
    const topic = pillar.topics[index];
    return {
      slug,
      name: topic.name,
      summary: topic.summary,
      href: topic.detailPage ? `/services/${slug}` : null,
    };
  });
  return {
    ...block,
    pillar,
    cards,
    text: block.text ?? pillar.intro,
    // First block of a pillar carries its anchor (#smart-tech) for the tabs and footer links.
    anchor: SERVICE_BLOCKS.findIndex((b) => b.pillar === block.pillar) === bi ? pillar.slug : null,
  };
}

export default function ServicesPage() {
  const pillars = getPillars();
  const blocks = SERVICE_BLOCKS.map((b, bi) => buildBlock(b, pillars, bi));

  return (
    <>
      {/* GoPackshot-style top: label, title, one line; the category tabs follow directly below. */}
      <Section atmos={3} className="!pt-20 !pb-14 text-center md:!pt-32 md:!pb-20">
        <div className="rise flex justify-center">
          <Eyebrow>Services</Eyebrow>
        </div>
        {/* client wording (material request, Services · introduction) */}
        <h1
          className="rise mx-auto mt-6 max-w-4xl text-[2.6rem] leading-[1.05] md:text-6xl lg:text-7xl"
          style={{ '--d': '90ms' }}
        >
          One studio for content, technology and{' '}
          <span className="text-olive-hi">brand creativity.</span>
        </h1>
        <p
          className="rise text-paper/75 mx-auto mt-7 max-w-2xl text-lg leading-relaxed"
          style={{ '--d': '200ms' }}
        >
          From precise packshots and model shoots to campaign photography, film and digital content,
          we manage production from concept to final delivery, bringing creative direction, studio
          expertise and post-production together under one roof.
        </p>
      </Section>

      <PillarBar pillars={pillars} />

      {blocks.map((block, bi) => (
        <Section
          key={bi}
          id={block.anchor ?? undefined}
          // Light and dark alternate; dark blocks get the olive light + grain.
          tone={bi % 2 === 0 ? 'light' : 'ink'}
          atmos={bi % 2 === 0 ? undefined : bi === 1 ? 1 : 2}
          className="!py-16 md:!py-28"
        >
          <ServiceBlock block={block} imageLeft={bi % 2 === 0} />
        </Section>
      ))}

      <Section tone="olive" className="text-center md:!py-28">
        <SplitText as="h2" className="text-4xl md:text-5xl">
          Have a project in mind?
        </SplitText>
        <p data-reveal="up" style={{ '--d': '150ms' }} className="text-muted mt-5 text-lg">
          Tell us what you’re creating and we’ll get back to you within 3 hours.
        </p>
        <div data-reveal="up" style={{ '--d': '250ms' }} className="mt-9 flex justify-center">
          <Button href="/contact" arrow>
            Get in touch
          </Button>
        </div>
        <p data-reveal="up" style={{ '--d': '350ms' }} className="text-muted mt-6 text-sm">
          Or call / WhatsApp:{' '}
          <a
            href={contact.phoneHref}
            className="hover:text-olive-hi text-white underline decoration-[var(--color-olive-hi)] underline-offset-4 transition-colors"
          >
            {contact.phone}
          </a>
        </p>
      </Section>

      <ContinueExploring
        tone="light"
        items={[
          {
            title: 'About',
            text: 'Who MAEVEN is and how we work.',
            href: '/about',
            cta: 'About MAEVEN',
          },
          {
            title: 'Contact',
            text: 'Send an inquiry to the team.',
            href: '/contact',
            cta: 'Contact us',
          },
        ]}
      />
    </>
  );
}
