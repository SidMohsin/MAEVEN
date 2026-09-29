'use server';

import { getPillars } from '@/lib/services';

/**
 * Contact form handler (Next.js server action).
 *
 * Delivery: POSTs the inquiry as JSON to CONTACT_WEBHOOK_URL (any endpoint: a form service, a Zapier
 * / Make hook, or an internal mail API). No inbox has been supplied yet, so when the variable is not
 * set the visitor is told plainly that the form isn't connected; nothing is silently dropped.
 */
const LIMITS = { name: 120, company: 160, email: 200, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendInquiry(_prev, formData) {
  const get = (k) => String(formData.get(k) ?? '').trim();
  const values = {
    name: get('name'),
    company: get('company'),
    email: get('email'),
    pillar: get('pillar'),
    message: get('message'),
  };

  // Honeypot: real visitors never see or fill this field. Pretend success for bots.
  if (get('website')) return { status: 'sent', values: {} };

  const errors = {};
  if (!values.name) errors.name = 'Please enter your name.';
  if (!values.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.message) errors.message = 'Please tell us a little about the project.';
  if (formData.get('consent') !== 'on')
    errors.consent = 'Please confirm you agree to be contacted.';
  for (const [k, max] of Object.entries(LIMITS)) {
    if (values[k].length > max) errors[k] = `Please keep this under ${max} characters.`;
  }
  const allowed = ['', 'unsure', ...getPillars().map((p) => p.slug)];
  if (!allowed.includes(values.pillar)) values.pillar = '';

  if (Object.keys(errors).length) return { status: 'invalid', errors, values };

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) return { status: 'unconfigured', values };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, submittedAt: new Date().toISOString(), source: 'website' }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error('Contact form delivery failed:', err);
    return { status: 'error', values };
  }
  return { status: 'sent', values: {} };
}
