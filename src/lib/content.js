/**
 * Placeholder content.
 *
 * Text, numbers and contact details the client has not supplied yet are written as `ph('...')`.
 * They render like real content (so the design is complete) but carry a subtle dashed underline
 * so they are easy to spot and replace. To replace one, change `ph('00+')` to the real value,
 * e.g. '120+'. To hide all markers (e.g. for launch), set MARK_PLACEHOLDERS to false.
 */
export const MARK_PLACEHOLDERS = true;

export const ph = (text) => ({ text, placeholder: true });

export const isPh = (v) => Boolean(v && typeof v === 'object' && v.placeholder);

export const textOf = (v) => (isPh(v) ? v.text : v);
