import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';

/** Closing call to action for Home: very large type, generous space, olive accent on one word. */
export default function HomeCta({ tone }) {
  return (
    <Section tone={tone} className="md:!py-48">
      <div data-reveal="up">
        <Eyebrow>Contact</Eyebrow>
      </div>
      <SplitText
        as="h2"
        delay={110}
        className="mt-8 max-w-6xl text-6xl leading-[0.98] md:text-[8.5rem]"
      >
        Tell us about your <span className="text-olive-hi">project</span>
      </SplitText>
      <div
        data-reveal="up"
        style={{ '--d': '500ms' }}
        className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-center md:gap-12"
      >
        <Button href="/contact" arrow className="!px-9 !py-5 !text-base">
          Get in touch
        </Button>
        <p className="text-muted max-w-sm text-base">
          Start with a conversation about what you need.
        </p>
      </div>
    </Section>
  );
}
