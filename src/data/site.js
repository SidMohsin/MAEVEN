import { pillars } from '@/data/services';

/**
 * Site-wide facts. Anything not confirmed by the client is a placeholder:
 * `{ placeholder: true, label }` renders as a visible "client to supply" marker.
 * Never replace a placeholder with an invented value.
 */
export const site = {
  name: 'MAEVEN Productions',
  shortName: 'MAEVEN',
  // PLACEHOLDER: canonical domain not supplied. Used for metadata/sitemap only.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description: null, // PLACEHOLDER: official positioning line not supplied
};

/** Navbar: exactly these items. The logo links to Home. */
export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact', cta: true },
];

export const contact = {
  email: { placeholder: true, label: 'Email address' },
  phone: { placeholder: true, label: 'Phone number' },
  address: { placeholder: true, label: 'Studio address' },
  social: [], // PLACEHOLDER: no official social links supplied
};

export const footerGroups = [
  {
    title: 'What we do',
    links: pillars.map((p) => ({ label: p.name, href: `/services#${p.slug}` })),
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Privacy', href: '/privacy' }],
  },
];
