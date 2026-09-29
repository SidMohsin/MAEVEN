import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

/**
 * The only place on Home where the three pillars appear together. Each shows a few topic names and
 * how many more exist, then links into the Services page, which holds the full catalogue.
 * Rendered on the light (paper) band for a clear break between the two image sections around it.
 */
export default function ServicesPreview({ pillars, show = 3, tone = 'paper' }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div
        data-reveal="up"
        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="text-olive flex items-center gap-3 text-xs font-medium tracking-[0.22em] uppercase">
            <span aria-hidden="true" className="bg-olive h-px w-8" />
            Services
          </p>
          <h2 className="mt-6 text-5xl md:text-7xl">What we do</h2>
        </div>
        <Button href="/services" arrow className="self-start md:self-auto">
          Explore all services
        </Button>
      </div>

      <ul className="border-ink/20 mt-14 grid border-t md:mt-20 md:grid-cols-3">
        {pillars.map((p, i) => {
          const more = p.topics.length - show;
          return (
            <li
              key={p.id}
              data-reveal="up"
              style={{ '--d': `${i * 110}ms` }}
              className={`border-ink/20 border-b md:border-b-0 ${i > 0 ? 'md:border-l' : ''}`}
            >
              <Link
                href={`/services#${p.slug}`}
                className={`group hover:bg-ink/[0.04] flex h-full flex-col py-10 transition-colors duration-300 md:py-12 ${
                  i === 0 ? 'md:pr-8' : i === pillars.length - 1 ? 'md:pl-8' : 'md:px-8'
                }`}
              >
                <span className="text-olive text-xs font-medium tracking-[0.2em]">{p.number}</span>
                <h3 className="text-ink mt-6 text-3xl uppercase md:min-h-[2lh] md:text-[2rem] md:leading-tight">
                  {p.name}
                </h3>
                <p className="text-ink/70 mt-5 flex-1 text-sm leading-relaxed">
                  {p.topics
                    .slice(0, show)
                    .map((t) => t.name)
                    .join(', ')}
                  {more > 0 && <span className="text-ink/60"> and {more} more</span>}
                </p>
                <span className="text-olive mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
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
