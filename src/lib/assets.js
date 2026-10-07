/**
 * Publishing gate for media. An asset is shown when it is marked `cleared: true` in
 * data/assets.js (or, for the hero video, in data/home.js). No environment variable is involved,
 * so the same code behaves identically locally, in previews and in production.
 */
export const isVisible = (media) => Boolean(media && media.cleared);
