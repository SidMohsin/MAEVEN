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
  // client (footer tagline)
  tagline: 'Creating beyond the frames',
  description: null,
};

/** Navbar: exactly these items. The logo links to Home. */
export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact', cta: true },
];

// client (material request, section 9). Email still to be confirmed; legal name / tax ID are not
// shown for now (client: "not needed now").
export const contact = {
  email: ph('hello@yourdomain.com'),
  phone: '+48 791 417 023',
  phoneHref: 'tel:+48791417023',
  whatsapp: 'https://wa.me/48791417023',
  city: 'Wrocław, Poland',
  address: 'Joachima Lelewela 4, Wrocław, Poland',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/studiox.pl' },
    { label: 'Facebook', href: 'https://www.facebook.com/share/1GEzJQU6pU' },
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
