import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import MediaImage from '@/components/ui/MediaImage';

/**
 * Studio: a full-width editorial image at its own proportions (identical composition at every screen
 * size), then a heading and two short source paragraphs. Explains how the studio works (pre-production
 * to post), not what it sells, so it doesn't overlap the Services preview.
 */
export default function StudioBand({ studio, tone }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <MediaImage
        id={studio.image}
        need="Studio image"
        aspect="natural"
        fallbackRatio={2.5}
        sizes="(min-width: 1280px) 1184px, 100vw"
        reveal="fade"
      />
      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-6" data-reveal="up">
          <Eyebrow>The studio</Eyebrow>
          <h2 className="mt-6 text-4xl leading-[1.05] md:text-6xl">{studio.title}</h2>
        </div>
        <div
          className="text-paper/80 space-y-5 text-base leading-relaxed md:col-span-5 md:col-start-8 md:self-end"
          data-reveal="up"
          style={{ '--d': '140ms' }}
        >
          {studio.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
