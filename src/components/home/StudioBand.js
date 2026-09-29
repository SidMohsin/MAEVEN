import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import MediaImage from '@/components/ui/MediaImage';

/**
 * Studio: a large editorial image beside a heading and two short source paragraphs. Explains how the
 * studio works (pre-production to post), not what it sells, so it doesn't overlap the Services preview.
 */
export default function StudioBand({ studio, tone }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-7">
          <MediaImage
            id={studio.image}
            need="Studio image"
            aspect="aspect-[4/5] md:aspect-[5/4]"
            sizes="(min-width: 768px) 58vw, 100vw"
            reveal="left"
          />
        </div>
        <div className="md:col-span-5" data-reveal="right" style={{ '--d': '160ms' }}>
          <Eyebrow>The studio</Eyebrow>
          <h2 className="mt-6 text-4xl leading-[1.05] md:text-6xl">{studio.title}</h2>
          <div className="text-paper/80 mt-8 space-y-5 text-base leading-relaxed">
            {studio.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
