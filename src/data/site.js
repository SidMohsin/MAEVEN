import { pillars } from '@/data/services';
import { ph } from '@/lib/content';

/**
 * Site-wide facts. Values the client has not supplied yet are placeholders written as `ph('...')`
 * (see lib/content.js): shaped like the real thing so the layout is final, marked so they're easy
 * to find. Replace them with the real values.
 */
export const site = {
  name: 'MAEVEN Productions',
  shortName: 'MAEVEN',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  // design: "Bringing your products to life"
  tagline: 'Bringing your products to life.',
  description: null,
};

/** Navbar: exactly these items. The logo links to Home. */
export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact', cta: true },
];

export const contact = {
  email: ph('hello@yourdomain.com'),
  phone: ph('+48 000 000 000'),
  // design: Wrocław. Street address still to be supplied.
  city: 'Wrocław, Poland',
  address: ph('Street 00, 00-000 Wrocław, Poland'),
  legalName: ph('MAEVEN Productions Sp. z o.o.'),
  taxId: ph('NIP 000-000-00-00'),
  social: [
    { label: 'Instagram', href: null },
    { label: 'LinkedIn', href: null },
  ],
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
      { label: 'Privacy', href: '/privacy' },
    ],
  },
];
