import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import MediaImage from '@/components/ui/MediaImage';
import SplitText from '@/components/ui/SplitText';

/**
 * "What we do" (GoPackshot's capability blocks): a centred heading, then three alternating
 * image + text blocks, each with a small label on the image and three check-marked points that
 * tick in one after another.
 */
export default function Experts({ experts, tone }) {
  return (
    <Section tone={tone} className="md:!py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div data-reveal="up" className="flex justify-center">
          <Eyebrow>{experts.eyebrow}</Eyebrow>
        </div>
        <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
          {experts.title}
        </SplitText>
        <p data-reveal="up" style={{ '--d': '250ms' }} className="text-muted mt-6 text-lg">
          {experts.text}
        </p>
      </div>

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {experts.blocks.map((b, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <div
              key={b.title}
              className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${
                i > 0 ? 'border-line border-t pt-20 md:pt-28' : ''
              }`}
            >
              <div className={`relative md:col-span-6 ${imageLeft ? '' : 'md:order-2'}`}>
                <MediaImage
                  id={b.image}
                  need={b.title}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  reveal="wipe"
                />
                <span
                  data-reveal="pop"
                  style={{ '--d': '700ms' }}
                  className="bg-ink/85 text-paper absolute bottom-4 left-4 border-l-2 border-[var(--color-olive-hi)] px-4 py-2.5 text-xs font-medium tracking-[0.14em] uppercase md:bottom-6 md:left-6"
                >
                  {b.badge}
                </span>
              </div>
              <div className="md:col-span-6">
                <span
                  aria-hidden="true"
                  data-reveal="draw"
                  className="bg-olive-hi mb-6 block h-0.5 w-10"
                />
                <SplitText as="h3" className="text-3xl leading-tight md:text-4xl">
                  {b.title}
                </SplitText>
                <p
                  data-reveal="up"
                  style={{ '--d': '200ms' }}
                  className="text-paper/75 mt-5 max-w-lg text-base leading-relaxed"
                >
                  {b.text}
                </p>
                <ul
                  data-reveal="stagger"
                  style={{ '--d': '350ms' }}
                  className="border-line mt-8 max-w-lg border-b"
                >
                  {b.points.map((pt, pi) => (
                    <li
                      key={pt}
                      className="border-line flex items-baseline gap-5 border-t py-4 text-[0.95rem] text-white"
                    >
                      <span className="font-heading text-olive-hi text-xs tracking-[0.2em] tabular-nums">
                        {String(pi + 1).padStart(2, '0')}
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
