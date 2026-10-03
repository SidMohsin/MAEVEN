import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SplitText from '@/components/ui/SplitText';

/**
 * The only place on Home where the three pillars appear together. Each shows a few topic names
 * (revealed one after another as small labels) and how many more exist, then links into the
 * Services page, which holds the full catalogue. Hover: an olive rule draws across the column top.
 * Rendered on the light (paper) band for a clear break between the two image sections around it.
 */
export default function ServicesPreview({ pillars, show = 3, tone = 'paper' }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            data-reveal="up"
            className="text-olive flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase"
          >
            <span aria-hidden="true" className="bg-olive h-px w-8" />
            Services
          </p>
          <SplitText as="h2" className="mt-6 text-5xl md:text-7xl">
            What we do
          </SplitText>
        </div>
        <div data-reveal="up" style={{ '--d': '200ms' }} className="self-start md:self-auto">
          <Button href="/services" arrow>
            Explore all services
          </Button>
        </div>
      </div>

      <ul className="border-ink/20 mt-14 grid border-t md:mt-20 md:grid-cols-3">
        {pillars.map((p, i) => {
          const more = p.topics.length - show;
          const base = 150 + i * 140;
          return (
            <li
              key={p.id}
              data-reveal="up"
              style={{ '--d': `${base}ms` }}
              className={`border-ink/20 relative border-b md:border-b-0 ${i > 0 ? 'md:border-l' : ''}`}
            >
              <Link
                href={`/services#${p.slug}`}
                className={`group hover:bg-ink/[0.04] relative flex h-full flex-col py-10 transition-colors duration-500 md:py-12 ${
                  i === 0 ? 'md:pr-8' : i === pillars.length - 1 ? 'md:pl-8' : 'md:px-8'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="bg-olive absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
                />
                <span className="text-olive text-xs font-medium tracking-[0.2em]">{p.number}</span>
                <h3 className="text-ink mt-6 text-3xl uppercase transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1 md:min-h-[2lh] md:text-[2rem] md:leading-tight">
                  {p.name}
                </h3>
                <ul
                  data-reveal="stagger"
                  style={{ '--d': `${base + 300}ms` }}
                  className="text-ink/75 mt-5 flex flex-1 flex-col gap-2 text-sm"
                >
                  {p.topics.slice(0, show).map((t) => (
                    <li key={t.slug} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="bg-olive h-px w-3 shrink-0" />
                      {t.name}
                    </li>
                  ))}
                  {more > 0 && <li className="text-ink/60 pl-5">and {more} more</li>}
                </ul>
                <span className="text-olive mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
