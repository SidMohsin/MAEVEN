import SplitText from '@/components/ui/SplitText';
import ServiceShowcase from '@/components/services/ServiceShowcase';
import { getAsset } from '@/data/assets';
import { isVisible } from '@/lib/assets';

/** Resolve a media entry (asset id or { video }) into what the frame renders. */
function resolve(entry, key) {
  if (entry && typeof entry === 'object' && entry.video) {
    return {
      key,
      type: 'video',
      src: `/video/services/${entry.video}.mp4`,
      poster: `/video/services/${entry.video}-poster.jpg`,
    };
  }
  const a = entry ? getAsset(entry) : null;
  if (!isVisible(a)) return null;
  return { key, type: 'image', src: a.src, alt: a.alt, focus: a.focus ?? null };
}

/**
 * One block of the Services page (GoPackshot's structure, MAEVEN's design): a photo with a label
 * beside a short heading, one line of text and the block's services as cards. Pointing at a card
 * (desktop) or swiping to it (phone) shows that service's photo or clip (see ServiceShowcase).
 * The heading reveals like the rest of the site; nothing changes on its own.
 */
export default function ServiceBlock({ block, imageLeft }) {
  const { pillar } = block;

  // media[0] = the block's resting photo; then one entry per distinct card media.
  const media = [resolve(block.image, block.image)];
  const indexOf = new Map([[block.image, 0]]);
  const cards = block.cards.map((c) => {
    const entry = block.media?.[c.slug];
    if (!entry) return { ...c, media: null };
    const key = typeof entry === 'string' ? entry : `video:${entry.video}`;
    if (!indexOf.has(key)) {
      const m = resolve(entry, key);
      if (!m) return { ...c, media: null };
      indexOf.set(key, media.length);
      media.push(m);
    }
    return { ...c, media: indexOf.get(key) };
  });

  const header = (
    <>
      <span aria-hidden="true" data-reveal="draw" className="bg-olive-hi block h-0.5 w-10" />
      <p
        data-reveal="up"
        className="text-olive-hi mt-6 text-xs font-medium tracking-[0.22em] uppercase"
      >
        {pillar.number} · {pillar.name}
      </p>
      <SplitText as="h2" delay={80} className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
        {block.title}
      </SplitText>
      <p
        data-reveal="up"
        style={{ '--d': '200ms' }}
        className="text-paper/75 mt-5 max-w-xl text-base leading-relaxed"
      >
        {block.text}
      </p>
    </>
  );

  return (
    <ServiceShowcase
      media={media}
      cards={cards}
      label={block.label}
      imageLeft={imageLeft}
      header={header}
    />
  );
}
