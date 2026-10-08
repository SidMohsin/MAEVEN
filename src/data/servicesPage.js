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
      photography: 'studio-portrait-tee',
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
    // draft (summarises the four topics; no factual claim)
    text: 'AI films and ads, AI-generated content, product and marketplace videos, and corporate and learning video.',
    image: 'shadow-portrait',
    label: 'In the studio',
    topics: [
      'ai-video-film',
      'ai-content-creation',
      'product-retail-video',
      'enterprise-learning-video',
    ],
    media: {
      'ai-video-film': 'bts-tethered',
      'ai-content-creation': 'bts-portrait-bw',
      'product-retail-video': { video: 'product-retail-video' },
      'enterprise-learning-video': 'bts-casting',
    },
  },
  {
    pillar: 'smart-tech',
    title: 'Immersive, 3D and creator content.', // draft
    // draft (summarises the four topics; no factual claim)
    text: 'Virtual try-on and showrooms, photoreal 3D, virtual hosts and content libraries for digital-first brands.',
    image: 'ball-pose',
    label: 'Studio shoot',
    topics: ['ar-vr-immersive', '3d-visualization', 'creator-ip-studio', 'assets-niches'],
    media: {
      'ar-vr-immersive': 'rain-square',
      '3d-visualization': 'packshot-quilted-tote',
      'creator-ip-studio': 'bts-makeup',
      'assets-niches': 'lifestyle-brick-close',
    },
  },
  {
    pillar: 'creative-brand',
    // source: Branding summary
    title: 'Brands that are instantly recognisable.',
    image: 'neon-modny-close',
    label: 'Campaign shoot',
    topics: ['branding', 'design', 'content', 'campaign-strategy', 'insourcing'],
    media: {
      branding: 'tfc-lace',
      design: 'packshot-print-back',
      content: 'bts-wardrobe',
      'campaign-strategy': 'neon-street-walk',
      insourcing: 'bts-team',
    },
  },
];
