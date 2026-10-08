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
    // client: headline and line (material request, Home)
    title: ['Where Content, Technology', '& Brands Come Together'],
    text: 'From pre-production to post-production, powered by creativity and Smart Tech AI',
    video: {
      landscape: { src: '/video/hero-landscape.mp4', poster: '/video/hero-landscape-poster.jpg' },
      portrait: { src: '/video/hero-portrait.mp4', poster: '/video/hero-portrait-poster.jpg' },
      label: 'Behind the scenes',
      detail: 'In the studio, shoot day',
    },
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
    // client (material request, Home · what we do)
    title: 'From Concept · Through Production · To Final Frame',
    text: 'Photography, film and digital content crafted for websites, social media, advertising, and every brand touchpoint.',
    blocks: [
      {
        image: 'onmodel-floral',
        badge: 'On-model · Packshot · Video',
        // client (material request, block 1)
        title: 'From packshots and on-model to videos.',
        text: 'Packshots, films, model shoots and live content produced from concept to final delivery, combining creative production, post-production and Smart Tech AI where it adds value.',
        points: [
          'On-model photography and video',
          'Packshots and detail shots',
          'E-commerce catalogues and A+ content',
        ],
      },
      {
        image: 'bts-styling',
        badge: 'Pre-production to post',
        // client (material request, block 2)
        title: 'Every aspect of production, under one roof.',
        text: 'From the first scroll to the final frame, we create visual content that brings your brand to life across every touchpoint.',
        points: [
          'Planning, styling and casting',
          'Shoot days in the studio and on location',
          'Retouching, editing and colour finishing',
        ],
      },
      {
        image: 'post-retouch-screen',
        badge: 'Post-production', // what the photo shows (retouching on screen)
        // client (material request, block 3)
        title: 'Production expertise, powered by Smart Tech and CGI.',
        text: 'We combine the craft of production with the possibilities of Smart Tech AI, CGI and digital technology to create new ways for brands to tell their stories.',
        points: ['AI video and film', '3D and visualization', 'AR, VR and immersive experiences'],
      },
    ],
  },

  portfolio: {
    eyebrow: 'Portfolio',
    // client (material request, Home · portfolio)
    title: 'Crafted in the studio. Made for every channel.',
    text: 'MAEVEN Productions brings photography, film, smart technology and brand work together in one production studio.',
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

  // Steps and wording taken verbatim from thestudiox.pl ("Our simple process"), as the client asked.
  process: {
    eyebrow: 'Process',
    title: 'Our simple process',
    text: 'A simple, structured workflow from concept to final delivery. Built for fast, consistent e-commerce production.',
    steps: [
      {
        title: 'Consultation',
        text: 'We understand your products, goals and visual direction to align on the right output.',
      },
      {
        title: 'Planning',
        text: 'We define the shoot setup, styling and required deliverables for your e-commerce store.',
      },
      {
        title: 'Production',
        text: 'We capture your products in a controlled studio environment with a focus on consistency, detail and quality at scale.',
      },
      {
        title: 'Post-Production',
        text: 'We refine and optimise images for e-commerce use, keeping them clean, accurate and ready to sell. Any necessary retouching or adjustments are included at no additional cost.',
      },
      {
        title: 'Review',
        text: 'You review the results and share any final feedback or changes needed.',
      },
      {
        title: 'Delivery',
        text: 'Final images are delivered ready to use across all e-commerce channels.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Start a conversation.',
    response: ph('within 24 hours'),
  },
};
