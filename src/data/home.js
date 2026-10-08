import { ph } from '../lib/content.js';

/**
 * Home page content, in GoPackshot's section order (design is MAEVEN's own).
 *
 * Sources:
 *  - "design": wording from MAEVEN's own Studio X marketing artboards (Studio X = former name).
 *  - "services": wording from the service spreadsheet (data/services.js).
 *  - ph('...'): placeholder, shaped like the real thing; replace with client material.
 *
 * Images are ids from data/assets.js. Videos live in public/video (scripts/build-videos.py);
 * replace the files at the same paths to swap in final footage.
 */
export const home = {
  hero: {
    // design: "Bringing your products to life"
    title: ['Bringing your products', 'to life.'],
    // design (trimmed): "From on-model images and videos to packshots, we deliver high-quality visuals…"
    text: 'From on-model images and videos to packshots, we deliver high-quality visuals that make your products stand out.',
    video: {
      landscape: { src: '/video/hero-landscape.mp4', poster: '/video/hero-landscape-poster.jpg' },
      portrait: { src: '/video/hero-portrait.mp4', poster: '/video/hero-portrait-poster.jpg' },
      label: 'Behind the scenes',
      detail: 'In the studio, shoot day',
    },
    trustedLabel: 'Trusted by',
    trustedCount: 5, // how many client names to show in the hero (from data/clients.js)
  },

  stats: [
    { value: ph('00+'), label: 'Brands served' },
    { value: ph('000+'), label: 'Shoots delivered' },
    { value: ph('00'), label: 'Years of production' },
    { value: ph('00K+'), label: 'Images delivered' },
  ],

  partners: { eyebrow: 'Brands we work with' },

  experts: {
    eyebrow: 'What we do',
    // design: mission ("…handling every aspect of the production process")
    title: 'Every part of the production, under one roof.',
    text: 'A production house for fashion and e-commerce brands, working across Europe and beyond.',
    blocks: [
      {
        image: 'studio-seated-denim',
        badge: 'On-model · Packshot · Video',
        title: 'From on-model images and videos to packshots',
        // design
        text: "We deliver high-quality visuals that make your products stand out in today's competitive market.",
        points: [
          'On-model photography and video',
          'Packshots and detail shots',
          'E-commerce catalogues and A+ content',
        ],
      },
      {
        image: 'bts-styling',
        badge: 'Pre-production to post',
        title: 'We handle every aspect of the production',
        // design: mission
        text: 'We empower our clients to focus on their core business by handling every aspect of the production process.',
        points: [
          'Planning, styling and casting',
          'Shoot days in the studio and on location',
          'Retouching, editing and colour finishing',
        ],
      },
      {
        image: 'post-retouch-screen',
        badge: 'Post-production', // what the photo shows (retouching on screen)
        title: 'Production expertise, with AI and CGI',
        // services: AI Video & Film description
        text: 'We combine AI, CGI, and production expertise to create visually compelling content at scale.',
        points: ['AI video and film', '3D and visualization', 'AR, VR and immersive experiences'],
      },
    ],
  },

  cases: {
    eyebrow: 'Case studies',
    title: 'Content for brands across Europe.',
    text: 'A few of the brands we produce for, and what we delivered.',
    items: [
      {
        client: 'The Female Company',
        image: 'tfc-cami',
        challenge: ph(
          'Two to three sentences on what the client needed: products, volume, channels and timing.',
        ),
        solution: ph(
          'Two to three sentences on what MAEVEN did: services, team, workflow and turnaround.',
        ),
        stats: [
          { value: ph('000'), label: ph('Products photographed') },
          { value: ph('00h'), label: ph('Turnaround') },
        ],
      },
      {
        // Brand not confirmed for this photo: name the client when the case material arrives.
        client: ph('Client brand'),
        image: 'packshot-jacket',
        challenge: ph(
          'Two to three sentences on what the client needed: products, volume, channels and timing.',
        ),
        solution: ph(
          'Two to three sentences on what MAEVEN did: services, team, workflow and turnaround.',
        ),
        stats: [
          { value: ph('000'), label: ph('Products photographed') },
          { value: ph('0'), label: ph('Collections') },
        ],
      },
      {
        client: ph('Client brand'),
        image: 'pink-ball-banner',
        challenge: ph(
          'Two to three sentences on what the client needed: products, volume, channels and timing.',
        ),
        solution: ph(
          'Two to three sentences on what MAEVEN did: services, team, workflow and turnaround.',
        ),
        stats: [
          { value: ph('000'), label: ph('Looks shot') },
          { value: ph('00'), label: ph('Shoot days') },
        ],
      },
    ],
  },

  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Made in the studio and on location.',
    text: 'From night-time campaigns to clean e-commerce packshots.',
    // Mosaic order matters (see PortfolioMosaic): big tile first.
    tiles: [
      { image: 'neon-pink-street', label: 'Lifestyle & Campaign' },
      { image: 'studio-portrait-hood', label: 'On-Model Photography' },
      { image: 'packshot-vest', label: 'Packshot Photography' },
      { image: 'neon-cafe', label: 'Editorial' },
      { image: 'tfc-detail', label: 'Detail shots' },
      { image: 'bts-camera', label: 'Video & Film' },
      { image: 'tfc-brief', label: 'E-Com Production' },
    ],
  },

  results: {
    eyebrow: 'Results',
    title: 'What our work changes.',
    text: ph('One sentence on the outcomes MAEVEN drives for its clients.'),
    items: [
      {
        value: ph('+00%'),
        title: ph('Conversion lift'),
        text: ph('Where the number comes from and how it was measured.'),
      },
      {
        value: ph('-00%'),
        title: ph('Fewer returns'),
        text: ph('Where the number comes from and how it was measured.'),
      },
      {
        value: ph('00%'),
        title: ph('Faster to market'),
        text: ph('Where the number comes from and how it was measured.'),
      },
    ],
  },

  testimonials: {
    eyebrow: 'Client voices',
    title: 'What our clients say.',
    items: [1, 2, 3, 4].map((n) => ({
      id: n,
      brand: ph('Client brand'),
      headline: ph('Result in one line'),
      quote: ph(
        'A short quote from the client about working with MAEVEN: what they needed, and what changed.',
      ),
      name: ph('Name Surname'),
      role: ph('Role, Company'),
    })),
  },

  process: {
    eyebrow: 'How we work',
    title: 'From brief to delivery in five clear steps.',
    text: 'Every project follows the same path, scoped to what you need.',
    steps: [
      {
        title: 'Brief & scope',
        text: 'We map what you need: products, channels, formats and deadlines.',
        fact: ph('0 days to set up'),
      },
      {
        title: 'Pre-production',
        text: 'Concept, styling, casting, locations and shot lists, planned before the shoot.',
        fact: ph('One dedicated producer'),
      },
      {
        title: 'Production',
        text: 'On-model, packshot and video, shot in the studio or on location.',
        fact: ph('Up to 000 products a day'),
      },
      {
        title: 'Post-production',
        // services: Post-Production description
        text: 'Editing, color finishing, graphics, and infographic integration.',
        fact: ph('Every image checked'),
      },
      {
        title: 'Delivery',
        text: 'Final files delivered ready for every channel and platform.',
        fact: ph('All formats included'),
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Start a conversation.',
    response: ph('within 24 hours'),
  },
};
