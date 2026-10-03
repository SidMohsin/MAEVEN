import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';

/** Positioning: one large statement and a short supporting line. No pillar names, no service list. */
export default function IntroBand({ intro, tone }) {
  return (
    <Section tone={tone} className="md:!py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3" data-reveal="up">
          <Eyebrow>MAEVEN</Eyebrow>
        </div>
        <div className="md:col-span-9">
          <SplitText
            as="p"
            delay={100}
            className="font-heading text-[2.1rem] leading-[1.12] text-white md:text-6xl md:leading-[1.08]"
          >
            {intro.statement}
          </SplitText>
          <div className="mt-12 flex items-start gap-6 md:mt-16">
            <span
              aria-hidden="true"
              data-reveal="draw"
              style={{ '--d': '500ms' }}
              className="bg-olive mt-3 h-px w-12 shrink-0"
            />
            <p
              data-reveal="up"
              style={{ '--d': '650ms' }}
              className="text-paper/75 max-w-lg text-base leading-relaxed md:text-lg"
            >
              {intro.support}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
