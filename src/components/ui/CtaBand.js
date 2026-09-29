import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

/** Centred closing call to action (H2, one line, one button, optional secondary link). */
export default function CtaBand({ title, text, href, label, secondary, tone = 'ink' }) {
  return (
    <Section tone={tone} className="text-center md:!py-32">
      <div data-reveal="up">
        <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl">{title}</h2>
        {text && <p className="text-muted mx-auto mt-5 max-w-xl">{text}</p>}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={href} arrow>
            {label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="outline">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
