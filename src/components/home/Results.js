import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';

/** Results (GoPackshot's "proven results"): three large figures with a title and a short note. */
export default function Results({ results, tone }) {
  return (
    <Section tone={tone} className="md:!py-28">
      <div className="mx-auto max-w-3xl text-center">
        <div data-reveal="up" className="flex justify-center">
          <Eyebrow>{results.eyebrow}</Eyebrow>
        </div>
        <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
          {results.title}
        </SplitText>
        <p data-reveal="up" style={{ '--d': '250ms' }} className="text-muted mt-6 text-lg">
          <T v={results.text} />
        </p>
      </div>
      <ul data-reveal="stagger" className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
        {results.items.map((r, i) => (
          <li
            key={i}
            className="lift border-line bg-surface-2/60 border px-7 py-9 text-center hover:border-[var(--color-olive)]"
          >
            <p className="font-heading text-olive-hi text-5xl tabular-nums md:text-6xl">
              <T v={r.value} />
            </p>
            <p className="mt-4 text-base font-medium text-white">
              <T v={r.title} />
            </p>
            <p className="text-muted mx-auto mt-2 max-w-xs text-sm leading-relaxed">
              <T v={r.text} />
            </p>
            <span aria-hidden="true" className="bg-olive mx-auto mt-6 block h-0.5 w-8" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
