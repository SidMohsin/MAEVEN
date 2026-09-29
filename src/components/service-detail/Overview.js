import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';

/** Introduction band: the topic description, set large. Copy comes straight from the service data. */
export default function Overview({ topic, tone }) {
  return (
    <Section tone={tone} className="md:!py-28">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4" data-reveal="up">
          <Eyebrow>Overview</Eyebrow>
        </div>
        <p
          className="font-heading text-paper text-2xl leading-snug md:col-span-8 md:text-4xl"
          data-reveal="up"
          style={{ '--d': '120ms' }}
        >
          {topic.description}
        </p>
      </div>
    </Section>
  );
}
