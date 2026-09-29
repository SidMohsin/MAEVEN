import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import CtaBand from '@/components/ui/CtaBand';
import ContinueExploring from '@/components/ui/ContinueExploring';
import PillarBar from '@/components/services/PillarBar';
import PillarHeader from '@/components/services/PillarHeader';
import TopicRow from '@/components/services/TopicRow';
import { getPillars } from '@/lib/services';

export const metadata = {
  title: 'Services',
  description:
    'Content & Production, Smart Tech, and Creative & Brand services from MAEVEN Productions.',
};

/**
 * Bands alternate ink / surface from top to bottom, and each pillar header is one of the bands,
 * so every chapter opening and every row sits against a different tone from its neighbours.
 */
const nextTone = (tone) => (tone === 'ink' ? 'surface' : 'ink');

export default function ServicesPage() {
  const pillars = getPillars();
  // Plan every band's tone up front (plain loops, no reassignment during render callbacks).
  let tone = 'ink'; // the hero band
  const plan = [];
  for (const pillar of pillars) {
    tone = nextTone(tone);
    const entry = { pillar, headerTone: tone, rows: [] };
    for (const topic of pillar.topics) {
      tone = nextTone(tone);
      entry.rows.push({ topic, tone });
    }
    plan.push(entry);
  }
  const closingTone = nextTone(tone);

  return (
    <>
      <Section className="relative !pt-20 !pb-14 md:!pt-32 md:!pb-20">
        <div className="rise" style={{ '--d': '0ms' }}>
          <Eyebrow>What we do</Eyebrow>
        </div>
        {/* TODO: client-approved hero headline. Neutral title used until supplied. */}
        <h1
          className="rise mt-6 text-6xl md:text-[9rem] md:leading-[0.95]"
          style={{ '--d': '90ms' }}
        >
          Services
        </h1>
        <p className="rise text-muted mt-6 max-w-xl text-lg" style={{ '--d': '200ms' }}>
          Content &amp; Production, Smart Tech, and Creative &amp; Brand.
        </p>
        <span
          aria-hidden="true"
          className="draw-line bg-olive/70 absolute inset-x-5 bottom-0 h-px md:inset-x-8 xl:inset-x-12"
        />
      </Section>

      <PillarBar pillars={pillars} />

      {plan.map(({ pillar, headerTone, rows }, pi) => (
        <div key={pillar.id}>
          <PillarHeader pillar={pillar} index={pi} total={pillars.length} tone={headerTone} />
          {rows.map(({ topic, tone: rowTone }, i) => (
            <TopicRow key={topic.slug} topic={topic} pillar={pillar} index={i} tone={rowTone} />
          ))}
        </div>
      ))}

      <CtaBand
        title="Tell us about your project"
        text="Start with a conversation about what you need."
        href="/contact"
        label="Get in touch"
        tone={closingTone}
      />

      <ContinueExploring
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
        tone={tone}
      />
    </>
  );
}
