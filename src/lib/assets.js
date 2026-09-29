/**
 * Publishing gate for curated media. An asset is shown only when the client has confirmed
 * permission (`cleared: true` in data/assets.js), or when previewing locally with
 * NEXT_PUBLIC_SHOW_PENDING_ASSETS=1 (see .env.example).
 */
export const SHOW_PENDING = process.env.NEXT_PUBLIC_SHOW_PENDING_ASSETS === '1';

export const isVisible = (media) => Boolean(media && (media.cleared || SHOW_PENDING));
