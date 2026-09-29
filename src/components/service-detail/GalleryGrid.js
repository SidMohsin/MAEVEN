import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import MediaImage from '@/components/ui/MediaImage';
import { getAsset } from '@/data/assets';

/**
 * Supporting imagery for a topic. Tall images form a grid; wide ones take a full row afterwards.
 * Orientation is read from the asset manifest, so any mix of assets lays out sensibly.
 * Renders nothing when there is no gallery (the section simply doesn't appear).
 */
export default function GalleryGrid({ ids = [], topicName, tone }) {
  const assets = ids.map((id) => ({ id, asset: getAsset(id) }));
  if (assets.length === 0) return null;

  const isWide = ({ asset }) => asset && asset.width / asset.height > 1.6;
  const tall = assets.filter((a) => !isWide(a));
  const wide = assets.filter(isWide);

  return (
    <Section tone={tone} className="md:!py-28">
      <div data-reveal="up">
        <Eyebrow>Gallery</Eyebrow>
      </div>

      {tall.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {tall.map(({ id }, i) => (
            <li key={id}>
              <MediaImage
                id={id}
                need={`${topicName} image`}
                aspect="aspect-[4/5]"
                sizes="(min-width: 768px) 25vw, 50vw"
                reveal="up"
                delay={(i % 4) * 90}
              />
            </li>
          ))}
        </ul>
      )}

      {wide.map(({ id }) => (
        <MediaImage
          key={id}
          id={id}
          need={`${topicName} image`}
          aspect="aspect-[16/10] md:aspect-[5/2]"
          sizes="(min-width: 1280px) 1184px, 100vw"
          reveal="fade"
          className="mt-3 md:mt-4"
        />
      ))}
    </Section>
  );
}
