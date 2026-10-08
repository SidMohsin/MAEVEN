import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';

/**
 * Process: a bordered panel of numbered steps (large outlined number, title, short text), three per
 * row on desktop, two on tablets, one on phones. Steps appear one after another.
 */
export default function ProcessSteps({ process, tone }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div data-reveal="up" className="flex justify-center">
          <Eyebrow>{process.eyebrow}</Eyebrow>
        </div>
        <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
          {process.title}
        </SplitText>
        <p data-reveal="up" style={{ '--d': '250ms' }} className="text-muted mt-6 text-lg">
          {process.text}
        </p>
      </div>

      <ol
        data-reveal="stagger"
        className="bg-line border-line mt-14 grid gap-px border md:mt-20 md:grid-cols-2 lg:grid-cols-3"
      >
        {process.steps.map((s, i) => (
          <li key={s.title} className="group bg-ink flex flex-col p-7 md:p-9">
            <span
              aria-hidden="true"
              className="text-stroke font-heading text-6xl leading-none transition-colors duration-500 group-hover:text-[var(--color-olive)]"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-7 text-2xl">{s.title}</h3>
            <p className="text-paper/70 mt-3 text-sm leading-relaxed">{s.text}</p>
            <div aria-hidden="true" className="mt-auto pt-7">
              <span className="bg-olive-hi block h-0.5 w-8 transition-all duration-500 group-hover:w-14" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
