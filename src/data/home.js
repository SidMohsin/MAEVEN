/**
 * Home page content.
 *
 * Home introduces the studio; the Services page owns the full service catalogue. Home therefore
 * never lists all topics. It shows the three pillars once (Services preview) and links onward.
 *
 * Copy sources:
 *  - `source`: verbatim or near-verbatim from data/services.js (the client spreadsheet).
 *  - `draft`: neutral wording written for this site that makes no factual claim (no numbers, clients,
 *    locations, equipment, history). Needs client approval; replace freely.
 *
 * HERO VIDEO: no video exists in the supplied source material yet, so `hero.video` is null and the
 * hero shows the poster image. To switch on video, add client-approved files and set:
 *
 *   video: {
 *     sources: [
 *       { src: '/video/maeven-hero.webm', type: 'video/webm' },
 *       { src: '/video/maeven-hero.mp4', type: 'video/mp4' },
 *     ],
 *     cleared: true, // client publishing permission confirmed
 *   },
 *
 * Files live in public/video/. Spec: 1920x1080, 10 to 20 s seamless loop, no audio track, H.264 MP4
 * (and optionally WebM), under about 8 MB. The poster is the `image` asset below.
 * The player only autoplays when the visitor has not asked for reduced motion or data saving.
 */
export const home = {
  hero: {
    image: 'night-street-hero', // poster / fallback: an id from data/assets.js
    video: null,
    title: 'MAEVEN Productions',
    // draft
    text: 'A production studio for content, technology and brand.',
  },

  intro: {
    // draft: a positioning statement with no factual claim. Replace with approved copy.
    statement:
      'Visual content and brand work, produced with care from the first brief to the final frame.',
    // source: adapted from the Photography description in services.js.
    support:
      'Photography, film and digital content crafted for websites, social media, advertising, and every brand touchpoint.',
  },

  studio: {
    image: 'shadow-walk-banner',
    // draft heading; the paragraphs below are source text (Video & Film, Post-Production descriptions).
    title: 'From pre-production to post-production',
    paragraphs: [
      'Complete film, advertising, and live content production, managed from pre-production through post-production.',
      'Professional post-production services including editing, color finishing, graphics, and infographic integration.',
    ],
  },

  // Services preview: the only place the pillars appear on Home. `topics` = how many names to show.
  servicesPreview: { topics: 3 },

  // Work mosaic: five stills, no captions or claims. Order matters (see WorkMosaic layout):
  // wide, tall, then three. None of the curated assets flagged for visible brand marks are used.
  work: {
    images: [
      'brick-wall-banner',
      'rain-editorial',
      'pair-light-set',
      'packshot-jeans',
      'detail-bag-interior',
    ],
  },

  // draft: a GENERIC workflow, presented as such. Not a description of specific internal processes.
  approach: [
    {
      title: 'Brief',
      text: 'We start with what you need: the goal, the audience and the channels.',
    },
    { title: 'Create', text: 'Concept, direction and planning before anything is shot or built.' },
    { title: 'Produce', text: 'The content is shot, built or generated to the agreed direction.' },
    {
      title: 'Deliver',
      text: 'Edited, finished and handed over ready for every channel it needs.',
    },
  ],
};
