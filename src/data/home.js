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
    { value: '50+', label: 'Brands served' }, // client
    { value: '200+', label: 'Shoots delivered' }, // client
    // client: "With over 10 years of experience in e-commerce photography" (About)
    { value: '10+', label: 'Years of experience' },
    { value: '200K+', label: 'Images delivered' }, // client
  ],

  partners: { eyebrow: 'Brands we work with' },

  experts: {
    eyebrow: 'What we do',
    // client (material request, Home · what we do)
    title: 'From Concept to Production to Final Frame',
    text: 'Photography, film and digital content crafted for websites, social media, advertising, and every brand touchpoint.',
    blocks: [
      {
        image: 'onmodel-pair-black',
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
        image: 'ai-model-portrait',
        badge: 'Smart Tech AI', // still from the supplied AI content video
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
      { image: 'wa-packshot', label: 'Packshot Photography' },
      { image: 'wa-editorial', label: 'Editorial' },
      { image: 'wa-detail', label: 'Detail shots' },
      { image: 'bts-camera', label: 'Video & Film' },
      { image: 'wa-ecom', label: 'E-Com Production' },
    ],
  },

  // The six steps are taken verbatim from thestudiox.pl, as the client asked.
  process: {
    // client (Shristi): heading, line, and no small label above
    eyebrow: null,
    title: 'From Studio to Screen — And Beyond',
    text: 'We turn ideas into visual content through a considered, end-to-end process from creative development and pre-production to shooting, post-production and Smart Tech AI. One team, one workflow, every frame thoughtfully made.',
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
    // client
    title: 'Have an idea? Let’s make it happen',
    response: 'within 3 hours',
  },
};
