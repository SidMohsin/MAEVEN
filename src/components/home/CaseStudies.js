import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import SplitText from '@/components/ui/SplitText';
import T from '@/components/ui/T';
import { getAsset } from '@/data/assets';

/**
 * Case studies (GoPackshot's dark band): three cards, each with a photo from the client's shoot,
 * the client name, challenge, solution and two figures. Text and figures are placeholders until
 * the client supplies them (data/home.js).
 */
function CaseCard({ item, index }) {
  const asset = getAsset(item.image);
  return (
    <li
      data-reveal="up"
      style={{ '--d': `${index * 120}ms` }}
      className="group border-line bg-ink/60 flex flex-col overflow-hidden border transition-colors duration-500 hover:border-[var(--color-olive)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {asset && (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
          />
        )}
        <div className="from-ink/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        <p className="font-heading absolute bottom-4 left-5 text-xl tracking-[0.12em] text-white uppercase">
          <T v={item.client} />
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-olive-hi text-[0.65rem] font-medium tracking-[0.22em] uppercase">
          The challenge
        </p>
        <p className="text-paper/75 mt-2 text-sm leading-relaxed">
          <T v={item.challenge} />
        </p>
        <p className="text-olive-hi mt-6 text-[0.65rem] font-medium tracking-[0.22em] uppercase">
          What we did
        </p>
        <p className="text-paper/75 mt-2 flex-1 text-sm leading-relaxed">
          <T v={item.solution} />
        </p>
        <dl className="border-line mt-7 grid grid-cols-2 border-t pt-6">
          {item.stats.map((s, i) => (
            <div key={i} className={i ? 'border-line border-l pl-5' : 'pr-5'}>
              <dd className="font-heading text-olive-hi text-3xl tabular-nums">
                <T v={s.value} />
              </dd>
              <dt className="text-muted mt-1 text-xs">
                <T v={s.label} />
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </li>
  );
}

export default function CaseStudies({ cases }) {
  return (
    <section className="bg-surface py-20 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <div data-reveal="up" className="flex justify-center">
            <Eyebrow>{cases.eyebrow}</Eyebrow>
          </div>
          <SplitText as="h2" className="mt-6 text-4xl md:text-6xl">
            {cases.title}
          </SplitText>
          <p data-reveal="up" style={{ '--d': '250ms' }} className="text-muted mt-6 text-lg">
            {cases.text}
          </p>
        </div>
        <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {cases.items.map((item, i) => (
            <CaseCard key={i} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
