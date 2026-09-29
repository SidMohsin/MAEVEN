import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';

/**
 * Process / approach. Only renders when the topic has real `process` content (none exists in the
 * source material yet), so nothing is invented. Add `process: [{ title, text }]` to a topic to enable.
 */
export default function ProcessSteps({ steps, tone }) {
  if (!steps?.length) return null;
  return (
    <Section tone={tone} className="md:!py-28">
      <div data-reveal="up">
        <Eyebrow>Approach</Eyebrow>
      </div>
      <ol className="mt-10 grid gap-px md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="border-line border-t py-8 md:pr-8"
            data-reveal="up"
            style={{ '--d': `${i * 90}ms` }}
          >
            <span className="text-stroke font-heading text-5xl leading-none">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 text-2xl">{step.title}</h3>
            <p className="text-paper/80 mt-3 text-sm leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
