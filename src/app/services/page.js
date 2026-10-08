import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import InlineVideo from '@/components/ui/InlineVideo';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';
import ContinueExploring from '@/components/ui/ContinueExploring';
import PillarBar from '@/components/services/PillarBar';
import ServiceShowcase from '@/components/services/ServiceShowcase';
import { getAsset } from '@/data/assets';
import { SERVICE_BLOCKS } from '@/data/servicesPage';
import { contact } from '@/data/site';
import { isVisible } from '@/lib/assets';
import { getPillars, visibleGroups } from '@/lib/services';

export const metadata = {
  title: 'Services',
  description:
    'Content & Production, Smart Tech, and Creative & Brand services from MAEVEN Productions.',
};

// Real studio footage (scripts/build-videos.py; the Studio X logo is cut out).
const REEL = { src: '/video/studio-reel.mp4', poster: '/video/studio-reel-poster.jpg' };

const CTA = {
  title: 'Something else in mind?',
  text: 'Tell us what you need and we will shape it with you.',
};

function buildBlock(block, pillars, bi) {
  const pillar = pillars.find((p) => p.slug === block.pillar);
  const cards = block.topics.map((slug) => {
    const index = pillar.topics.findIndex((t) => t.slug === slug);
    const topic = pillar.topics[index];
    const a = getAsset(topic.image);
    return {
      slug,
      number: `${pillar.number}.${String(index + 1).padStart(2, '0')}`,
      name: topic.name,
      summary: topic.summary,
      items: visibleGroups(topic).flatMap((g) => g.items.map((i) => i.name)),
      href: topic.detailPage ? `/services/${slug}` : null,
      photo: isVisible(a) ? { src: a.src, alt: a.alt, focus: a.focus ?? null } : null,
    };
  });
  return {
    ...block,
    pillar,
    cards: cards.filter((c) => c.photo),
    text: block.text ?? pillar.intro,
    // First block of a pillar carries its anchor (#smart-tech) for the tabs and footer links.
    anchor: SERVICE_BLOCKS.findIndex((b) => b.pillar === block.pillar) === bi ? pillar.slug : null,
  };
}

export default function ServicesPage() {
  const pillars = getPillars();
  const blocks = SERVICE_BLOCKS.map((b, bi) => buildBlock(b, pillars, bi));
  const total = pillars.reduce((n, p) => n + p.topics.length, 0);
  const endTone = blocks.length % 2 === 0 ? 'surface' : 'ink';

  return (
    <>
      <Section className="!pt-16 !pb-14 md:!pt-24 md:!pb-20">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="rise">
              <Eyebrow>What we do</Eyebrow>
            </div>
            <h1
              className="rise mt-6 text-6xl leading-[0.95] md:text-8xl lg:text-[8.5rem]"
              style={{ '--d': '90ms' }}
            >
              Services
            </h1>
            <p
              className="rise text-paper/75 mt-7 max-w-lg text-lg leading-relaxed"
              style={{ '--d': '200ms' }}
            >
              {total} services in three areas, from the shoot itself to the technology and the brand
              around it.
            </p>
            <ol className="rise mt-10" style={{ '--d': '300ms' }}>
              {pillars.map((p) => (
                <li key={p.id} className="border-line border-t last:border-b">
                  <a href={`#${p.slug}`} className="group flex items-baseline gap-5 py-4">
                    <span className="font-heading text-olive-hi text-xs tracking-[0.2em]">
                      {p.number}
                    </span>
                    <span className="font-heading group-hover:text-olive-hi flex-1 text-lg tracking-[0.1em] text-white uppercase transition-colors duration-300 md:text-xl">
                      {p.name}
                    </span>
                    <span className="text-muted text-xs tabular-nums">
                      {String(p.topics.length).padStart(2, '0')} services
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="rise md:col-span-5" style={{ '--d': '250ms' }}>
            <InlineVideo
              src={REEL.src}
              poster={REEL.poster}
              label="In the studio"
              className="aspect-[4/5]"
            />
          </div>
        </div>
      </Section>

      <PillarBar pillars={pillars} />

      {blocks.map((block, bi) => (
        <Section
          key={bi}
          id={block.anchor ?? undefined}
          tone={bi % 2 === 0 ? 'surface' : 'ink'}
          className="!py-16 md:!py-28"
        >
          <ServiceShowcase
            cards={block.cards}
            cta={block.cards.length % 2 === 1 ? CTA : null}
            imageLeft={bi % 2 === 0}
          >
            <span aria-hidden="true" data-reveal="draw" className="bg-olive-hi block h-0.5 w-10" />
            <p
              data-reveal="up"
              className="text-olive-hi mt-6 text-xs font-medium tracking-[0.22em] uppercase"
            >
              {block.pillar.number} · {block.pillar.name}
            </p>
            <SplitText as="h2" delay={80} className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
              {block.title}
            </SplitText>
            <p
              data-reveal="up"
              style={{ '--d': '200ms' }}
              className="text-paper/75 mt-5 max-w-xl text-base leading-relaxed"
            >
              {block.text}
            </p>
          </ServiceShowcase>
        </Section>
      ))}

      <Section tone={endTone} className="text-center md:!py-28">
        <SplitText as="h2" className="text-4xl md:text-5xl">
          Ready to start your production?
        </SplitText>
        <p data-reveal="up" style={{ '--d': '150ms' }} className="text-muted mt-5 text-lg">
          Start with a conversation about what you need.
        </p>
        <div data-reveal="up" style={{ '--d': '250ms' }} className="mt-9 flex justify-center">
          <Button href="/contact" arrow>
            Get in touch
          </Button>
        </div>
        <p data-reveal="up" style={{ '--d': '350ms' }} className="text-muted mt-6 text-sm">
          Or email directly: <T v={contact.email} className="text-white" />
        </p>
      </Section>

      <ContinueExploring
        tone={endTone === 'surface' ? 'ink' : 'surface'}
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
