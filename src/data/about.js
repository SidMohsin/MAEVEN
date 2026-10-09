/**
 * About page content (client wording, Oct 2026), in GoPackshot's About order:
 *   hero · images · numbers · who we are · founder note · what sets us apart · brands.
 *
 * Copy labels (same convention as data/home.js):
 *  - `design`:  wording from MAEVEN's own Studio X marketing artboards (Studio X = former name).
 *  - `source`:  from the service spreadsheet (data/services.js), quoted or lightly trimmed.
 *  - `draft`:   neutral wording with no factual claim; needs client approval.
 *  - ph('...'): placeholder, shaped like the real thing; replace with client material.
 */
export const about = {
  hero: {
    // client (material request, About)
    title: ['Made in the studio.', 'Built for every channel.'],
    text: 'MAEVEN Productions brings creative production and Smart Tech AI together under one roof.',
  },

  // Image band after the hero (asset ids): one wide, one portrait.
  images: ['neon-brick-step', 'bts-profile'],

  stats: [
    // client: "With over 10 years of experience in e-commerce photography"
    { value: '10+', label: 'Years of experience' },
    { value: '50+', label: 'Brands served' }, // client
    // design: the artboards place the studio in Wrocław
    { value: 'Wrocław', label: 'Studio, Poland' },
  ],

  mission: {
    eyebrow: 'Who we are',
    // client (material request, About · mission)
    lead: 'With over 10 years of experience in e-commerce photography, MAEVEN is a production partner for fashion brands across Europe.',
    text: 'We create high-quality visual content that helps brands present their products clearly, consistently and at scale across all e-commerce channels.',
    story:
      'Brands need more than great images. They need a visual world that works everywhere. MAEVEN brings photography, film, digital content, advertising and Smart Tech AI together in one production studio, creating, adapting and delivering content from the first brief to every final touchpoint.',
  },

  quote: {
    eyebrow: 'A note from the founder',
    // client (material request, A Note from the Founder)
    text: [
      'MAEVEN exists to make great production simpler, more creative and more connected. We bring craft, technology and a strong production mindset together under one roof, so every client gets thoughtful collaboration, attention to detail and work they can be proud to put their name behind.',
      'That’s what you can expect from MAEVEN: clarity, craft and consistency, from the first brief to the final frame.',
    ],
    // client: shown as "Founder", no name
    name: 'Founder',
    role: 'MAEVEN Productions',
    image: 'neon-window-pair',
  },

  // "What sets us apart" (client, material request)
  apart: {
    lead: 'Our focus is simple. Fast, reliable production that delivers visuals designed to sell.',
    text: 'We take time to understand your brand, products and requirements before every shoot to ensure the right visual direction from the start.',
    tagline: ['One studio', 'Every channel', 'Production + Smart Tech AI'],
  },
  principles: [
    {
      title: 'End to end',
      text: 'Packshots, films, model shoots and live content produced from concept to final delivery, combining creative production, post-production and Smart Tech AI where it adds value.',
    },
    {
      title: 'Every channel',
      text: 'From the first scroll to the final frame, we create visual content that brings your brand to life across every touchpoint.',
    },
    {
      title: 'Production and technology',
      text: 'We combine the craft of production with the possibilities of Smart Tech AI, CGI and digital technology to create new ways for brands to tell their stories.',
    },
  ],

  partners: { eyebrow: 'Brands we work with' },
};
