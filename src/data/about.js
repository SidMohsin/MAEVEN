import { ph } from '../lib/content.js';

/**
 * About page content, in GoPackshot's About order (design is MAEVEN's own):
 *   hero · images · numbers · mission · team · founder quote · what sets us apart · brands.
 *
 * Copy labels (same convention as data/home.js):
 *  - `design`:  wording from MAEVEN's own Studio X marketing artboards (Studio X = former name).
 *  - `source`:  from the service spreadsheet (data/services.js), quoted or lightly trimmed.
 *  - `draft`:   neutral wording with no factual claim; needs client approval.
 *  - ph('...'): placeholder, shaped like the real thing; replace with client material.
 */
export const about = {
  hero: {
    // draft: a positioning headline (two short lines), not a restatement of the nav label.
    title: ['Crafted in the studio.', 'Made for every channel.'],
    // draft
    text: 'MAEVEN Productions brings photography, film, smart technology and brand work together in one production studio.',
  },

  // Image band after the hero (asset ids): one wide, one portrait.
  images: ['neon-brick-step', 'bts-profile'],

  stats: [
    { value: ph('20XX'), label: 'Founded' },
    { value: ph('00'), label: 'People in the team' },
    { value: ph('00+'), label: 'Brands served' },
    // design: the artboards place the studio in Wrocław
    { value: 'Wrocław', label: 'Studio, Poland' },
  ],

  mission: {
    eyebrow: 'Our mission',
    // design (verbatim)
    lead: 'Our mission is to be a leading European production house, renowned for our sharp, modern approach and seamless, high-quality production services.',
    // design (verbatim)
    text: 'We empower our clients to focus on their core business by handling every aspect of the production process.',
    story: ph(
      'Two or three sentences on how MAEVEN started: when, by whom, and how Studio X became MAEVEN Productions.',
    ),
  },

  team: {
    eyebrow: 'The team',
    title: 'The people behind the production.',
    // One card per person; photo = asset id when supplied (null shows a neutral silhouette).
    members: [1, 2, 3, 4].map((n) => ({
      id: n,
      name: ph('Name Surname'),
      role: ph(
        ['Founder & CEO', 'Head of Production', 'Lead Photographer', 'Post-Production Lead'][n - 1],
      ),
      photo: null,
    })),
  },

  quote: {
    text: ph(
      'A short statement from the founder on why MAEVEN exists and what every client should expect from the studio.',
    ),
    name: ph('Name Surname'),
    role: ph('Founder, MAEVEN Productions'),
    image: 'neon-window-pair',
  },

  // "What sets us apart": each point is backed by a sentence from the source material.
  principles: [
    {
      title: 'End to end',
      // design: mission
      text: 'From planning and styling to shooting, retouching and delivery: every aspect of the production process, handled for you.',
    },
    {
      title: 'Every channel',
      // source: Photography description
      text: 'Visuals crafted for websites, social media, advertising, and every brand touchpoint.',
    },
    {
      title: 'Production and technology',
      // source: AI Video & Film description
      text: 'We combine AI, CGI, and production expertise to create visually compelling content at scale.',
    },
    {
      title: 'On-model to packshot',
      // design
      text: 'From on-model images and videos to packshots, we deliver high-quality visuals that make your products stand out.',
    },
  ],

  partners: { eyebrow: 'Brands we work with' },
};
