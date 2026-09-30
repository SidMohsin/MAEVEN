import JustifiedRows, { chunk } from '@/components/ui/JustifiedRows';

/**
 * Supporting images (up to `max`) beneath a topic, at their own proportions (no cropping):
 * one justified row on desktop, two per row on phones. Renders nothing without a gallery.
 */
export default function ImageStrip({ ids = [], need, max = 4 }) {
  const shown = ids.slice(0, max);
  if (shown.length === 0) return null;
  return (
    <JustifiedRows
      className="mt-12 md:mt-16"
      need={need}
      rows={[shown]}
      mobileRows={chunk(shown, 2)}
    />
  );
}
