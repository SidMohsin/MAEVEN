import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import JustifiedRows, { chunk } from '@/components/ui/JustifiedRows';
import { getAsset } from '@/data/assets';

/**
 * Supporting imagery for a topic, every image at its own proportions (no cropping at any size).
 * Portrait/square images form justified rows (four per row on desktop, two on phones); wide
 * images get a row to themselves. Renders nothing when there is no gallery.
 */
export default function GalleryGrid({ ids = [], topicName, tone }) {
  if (ids.length === 0) return null;

  const isWide = (id) => {
    const a = getAsset(id);
    return Boolean(a && a.width / a.height > 1.6);
  };
  const tall = ids.filter((id) => !isWide(id));
  const wide = ids.filter(isWide);

  return (
    <Section tone={tone} className="md:!py-28">
      <div data-reveal="up">
        <Eyebrow>Gallery</Eyebrow>
      </div>
      <JustifiedRows
        className="mt-10"
        need={`${topicName} image`}
        caption={(id) => ({ label: topicName, text: getAsset(id)?.alt })}
        rows={[...chunk(tall, 4), ...wide.map((id) => [id])]}
        mobileRows={[...chunk(tall, 2), ...wide.map((id) => [id])]}
      />
    </Section>
  );
}
