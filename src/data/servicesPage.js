/**
 * Services page blocks (GoPackshot's services page: a few identical blocks, each a photo with a
 * label, a heading, one line and a grid of service cards; pointing at a card shows its media).
 *
 * Every topic appears exactly once (checked in scripts/validate-data.mjs). `text` falls back to the
 * pillar introduction (data/services.js). Blocks with an odd number of services end with a
 * "talk to us" card so every grid is complete.
 *
 * `image` / `label`: the block's resting photo and a label saying what it shows.
 * `media`: per service, what the frame shows when that card is pointed at (desktop) or swiped to
 *   (phone). An asset id (data/assets.js) for a photo, or { video: '<file>' } for a clip in
 *   public/video/services (built by scripts/build-videos.py; used only where the service is video
 *   itself). A service without an entry keeps the block photo (no related material yet).
 * No photo here is used on Home or About, none is used twice, and no card uses its block's
 * starting photo (so pointing at any card always changes the picture).
 */
export const SERVICE_BLOCKS = [
  {
    pillar: 'content-production',
    title: 'Shot, edited and delivered in one place.', // draft
    image: 'pair-back-front',
    label: 'On-model photography',
    topics: ['photography', 'video-film', 'e-com-production', 'post-production', 'audio'],
    media: {
      photography: 'onmodel-purple-tee',
      'video-film': { video: 'video-film' },
      'e-com-production': 'packshot-jeans',
      'post-production': 'bts-retouch-laptop',
      // audio: no related material yet (keeps the block photo)
    },
  },
  {
    pillar: 'smart-tech',
    // source: AI Video & Film description
    title: 'AI-powered production, from concept to final output.',
    // draft (summarises the six topics; no factual claim)
    text: 'AI films and ads, AI-generated content, product and learning video, virtual stores and photoreal 3D.',
    image: 'shadow-portrait',
    label: 'In the studio',
    topics: [
      'ai-video-film',
      'ai-content-creation',
      'product-retail-video',
      'enterprise-learning-video',
      'ar-vr-immersive',
      '3d-visualization',
    ],
    media: {
      // supplied AI work (WEBSITE ASSETS folder)
      'ai-video-film': { video: 'ai-video-film' },
      'ai-content-creation': { video: 'ai-content-creation' },
      'product-retail-video': { video: 'product-retail-video' },
      'enterprise-learning-video': 'design-studio-set',
      // client renders (AR_3D folder): virtual store walkthrough, 3D bag turntable
      'ar-vr-immersive': { video: 'ar-vr-immersive' },
      '3d-visualization': { video: '3d-visualization' },
    },
  },
  {
    pillar: 'creative-brand',
    // client sheet (Creative & Brand); the block text is the pillar intro (data/services.js)
    title: 'Creative that makes brands recognisable.',
    image: 'neon-modny-close',
    label: 'Campaign shoot',
    topics: ['branding', 'design', 'content', 'campaign-strategy'],
    media: {
      branding: 'wa-essentials',
      design: 'design-poster',
      content: 'design-mission',
      'campaign-strategy': 'neon-wall-lean',
    },
  },
];
