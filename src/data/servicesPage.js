/**
 * The page's blocks (GoPackshot's services page: a few identical blocks of service cards).
 * Every topic appears exactly once (checked in scripts/validate-data.mjs). `text` falls back to the
 * pillar introduction (data/services.js). Blocks with an odd number of services end with a
 * "talk to us" card so every grid is complete.
 */
export const SERVICE_BLOCKS = [
  {
    pillar: 'content-production',
    title: 'Shot, edited and delivered in one place.', // draft
    topics: ['photography', 'video-film', 'e-com-production', 'post-production', 'audio'],
  },
  {
    pillar: 'smart-tech',
    // source: AI Video & Film description
    title: 'AI-powered production, from concept to final output.',
    topics: [
      'ai-video-film',
      'ai-content-creation',
      'product-retail-video',
      'enterprise-learning-video',
    ],
  },
  {
    pillar: 'smart-tech',
    title: 'Immersive, 3D and creator content.', // draft
    // draft (summarises the four topics' items; no factual claim)
    text: 'Virtual try-on and showrooms, photoreal 3D, virtual hosts and content libraries for digital-first brands.',
    topics: ['ar-vr-immersive', '3d-visualization', 'creator-ip-studio', 'assets-niches'],
  },
  {
    pillar: 'creative-brand',
    // source: Branding summary
    title: 'Brands that are instantly recognisable.',
    topics: ['branding', 'design', 'content', 'campaign-strategy', 'insourcing'],
  },
];
