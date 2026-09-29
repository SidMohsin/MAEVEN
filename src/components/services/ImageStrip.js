import MediaImage from '@/components/ui/MediaImage';

/** Row of supporting images (up to `max`) beneath a topic, revealed with a light stagger. */
export default function ImageStrip({ ids = [], need, max = 4 }) {
  const shown = ids.slice(0, max);
  if (shown.length === 0) return null;
  return (
    <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4">
      {shown.map((id, i) => (
        <li key={id}>
          <MediaImage
            id={id}
            need={need}
            aspect="aspect-[4/5]"
            sizes="(min-width: 768px) 25vw, 50vw"
            reveal="up"
            delay={i * 90}
          />
        </li>
      ))}
    </ul>
  );
}
