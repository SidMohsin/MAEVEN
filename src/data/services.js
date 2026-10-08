/**
 * MAEVEN service architecture: single source of truth.
 *
 * Source: Source_Materials/Maeven productions_Service_Categorization_final.xlsx
 *   - Sheet B ("Sheet1") is the base: topic list, service items, one-line summaries.
 *   - Sheet A ("Service Categorization") supplies the longer `description` where it exists.
 *   Wording is copied verbatim from the spreadsheet. Do not paraphrase.
 *
 * Hidden items (`hidden: true`) stay in the data but are never rendered. They are held back
 * pending client approval (Models / VTO / Face Swap / Context Backgrounds).
 *
 * @typedef {{ name: string, hidden?: boolean, hiddenReason?: string }} ServiceItem
 * @typedef {{ title?: string, items: ServiceItem[] }} ServiceGroup
 * @typedef {{
 *   slug: string,
 *   name: string,
 *   summary: string,
 *   description: string,
 *   groups: ServiceGroup[],
 *   detailPage: boolean,
 *   image: string | null,      // asset id (see data/assets.js); null = no photo of this service yet
 *   hero?: string | null,      // detail-page hero asset id (wide); falls back to `image`
 *   gallery?: string[],        // supporting asset ids (detail page gallery)
 *   process?: { title: string, text: string }[], // only when real process content exists
 * }} Topic
 * @typedef {{
 *   id: string, slug: string, number: string, name: string,
 *   intro: string | null, banner: string | null, topics: Topic[]
 * }} Pillar
 */

const HELD_BACK = 'Held back pending client approval (Models rule / GoPackshot-derived naming).';

const hidden = (name) => ({ name, hidden: true, hiddenReason: HELD_BACK });
const items = (...names) => names.map((name) => ({ name }));

/** @type {Pillar[]} */
export const pillars = [
  {
    id: 'content-production',
    slug: 'content-production',
    number: '01',
    name: 'Content & Production',
    // draft (summarises the topics below; no factual claim). Client to confirm.
    intro:
      'Photography, film, e-commerce content, post-production and audio: everything shot, edited and delivered for every channel.',
    banner: 'shadow-walk-banner',
    topics: [
      {
        slug: 'photography',
        name: 'Photography',
        summary: 'Editorial, product and brand photography for every channel.',
        description:
          'Creative editorial, product, and brand photography crafted for websites, social media, advertising, and every brand touchpoint. High-performing visuals designed to drive conversions across marketplaces and your online store.',
        groups: [
          {
            items: items(
              'Packshot Photography',
              'Lifestyle & Campaign',
              'On-Model Photography',
              'Social Media & Digital Content',
              'Multi-channel Content Production',
            ),
          },
        ],
        detailPage: true,
        image: 'studio-portrait-hood',
        // Photos on this page are used nowhere else on the site (checked in validate-data.mjs).
        hero: 'brick-wall-banner',
        gallery: [
          'neon-library',
          'lifestyle-brick-full',
          'studio-portrait-pose',
          'neon-modny-pair',
          'pair-light-set',
          'night-street-hero',
          'packshot-dress',
          'detail-knit-collar',
          'packshot-shirt',
          'packshot-knit-polo',
        ],
      },
      {
        slug: 'video-film',
        name: 'Video & Film',
        summary: 'Films, ads and live content shot and produced end-to-end.',
        description:
          'Complete film, advertising, and live content production, managed from pre-production through post-production.',
        groups: [
          {
            items: items(
              'Brand films & promos',
              'Testimonials & ads',
              'Live streaming',
              'Podcast & audio',
              'Video Production',
            ),
          },
        ],
        detailPage: false,
        image: 'bts-camera',
      },
      {
        slug: 'e-com-production',
        name: 'E-Com Production',
        summary: 'Conversion-ready visuals for marketplaces and own-store.',
        description: 'Conversion-ready visuals for marketplaces and own-store.',
        groups: [
          {
            items: items('Catalogue shoots', 'A+ content', 'Lookbooks', 'E-Com catalogues'),
          },
        ],
        detailPage: false,
        image: 'packshot-jeans',
        gallery: [
          'tfc-cami',
          'packshot-vest',
          'tfc-lace',
          'packshot-zip-knit',
          'tfc-brief',
          'detail-zip-knit',
          'tfc-detail',
          'packshot-quilted-tote',
          'packshot-dress',
          'packshot-shirt',
          'packshot-jacket',
          'packshot-knit-polo',
          'packshot-bag-shoulder',
          'packshot-bag-taupe',
          'detail-bag-interior',
          'detail-knit-collar',
        ],
      },
      {
        slug: 'post-production',
        name: 'Post-Production',
        summary: 'Editing and finishing for shot footage.',
        description:
          'Professional post-production services including editing, color finishing, graphics, and infographic integration.',
        groups: [{ items: items('Video editing') }],
        detailPage: false,
        image: 'post-retouch-screen',
      },
      {
        slug: 'audio',
        name: 'Audio',
        summary: 'Voice and sound production for broadcast and digital.',
        description: 'Voice and sound production for broadcast and digital.',
        groups: [{ items: items('Voice-over & radio') }],
        detailPage: false,
        image: null,
      },
    ],
  },
  {
    id: 'smart-tech',
    slug: 'smart-tech',
    number: '02',
    name: 'Smart Tech',
    // draft (summarises the topics below; no factual claim). Client to confirm.
    intro:
      'AI video, immersive experiences, 3D and creator content, combining AI, CGI and production expertise to create content at scale.',
    banner: null,
    topics: [
      {
        slug: 'ai-video-film',
        name: 'AI Video & Film',
        summary: 'AI-generated films, ads and full production pipelines.',
        description:
          'From product launches and commercial campaigns to feature-length storytelling, we combine AI, CGI, and production expertise to create visually compelling content at scale. Whether you need a high-impact TV commercial, a personalized ad campaign, a social content engine, or a Smart Tech feature film, we deliver end-to-end AI-powered production—from concept to final output.',
        groups: [
          {
            title: 'Films & Episodic',
            items: items(
              'Short films',
              'Web series & episodic',
              'Music videos',
              'Documentary & factual',
              'Films',
            ),
          },
          {
            title: 'Ads & Brand',
            items: items(
              'Ads & brand story films',
              'Personalised video ads',
              'Always-on content engine',
              'Real-time trend content',
              'Performance-driven ad variants',
              'Dynamic creative (DCO)',
              'Social-first vertical ad factory',
              'Brand campaigns',
              'Creative optimisation & variations',
            ),
          },
          {
            title: 'Production pipeline',
            items: items(
              'Script & storyboard',
              'Concept-to-video prototyping',
              'Pre-visualisation & simulation',
              'CGI (modelling/texturing/animation/compositing)',
              'Smart Tech feature films', // NOTE: wording looks like a find/replace; client to confirm
            ),
          },
        ],
        detailPage: false,
        image: null,
      },
      {
        slug: 'ar-vr-immersive',
        name: 'AR / VR & Immersive',
        summary: 'AI-powered try-on, virtual stores and 360° experiences.',
        description: 'AI-powered try-on, virtual stores and 360° experiences.',
        groups: [
          {
            items: items(
              'Virtual try-on (AR product try-on)',
              'Virtual store / VR showroom',
              '360° content & virtual tours',
              'VR expo & exhibitions',
              'AR/VR experiences',
            ),
          },
        ],
        detailPage: false,
        image: null,
      },
      {
        slug: '3d-visualization',
        name: '3D & Visualization',
        summary: 'Photoreal 3D, rendering and visualization for product and property.',
        description: 'Photoreal 3D, rendering and visualization for product and property.',
        groups: [
          {
            items: items(
              '3D product display',
              '3D product modeling',
              'Photogrammetry',
              'Property / real-estate tours',
              'Architectural visualization',
            ),
          },
        ],
        detailPage: false,
        image: null,
      },
      {
        slug: 'ai-content-creation',
        name: 'AI Content Creation',
        summary: 'AI-generated models, avatars and video at scale.', // client to confirm "models" wording
        description: 'AI-generated models, avatars and video at scale.',
        groups: [
          {
            items: [
              hidden('AI models generation (fashion & kids )'),
              hidden('VTO - Packshot to Model'),
              hidden('AI Face Swap'),
              { name: 'AI voiceovers' },
              { name: 'AI promo videos' },
              hidden('AI Context Backgrounds'),
              { name: 'AI image → video reels' },
            ],
          },
        ],
        detailPage: false,
        image: null,
      },
      {
        slug: 'product-retail-video',
        name: 'Product & Retail Video',
        summary: 'AI product and marketplace videos that drive sales.',
        description: 'AI product and marketplace videos that drive sales.',
        groups: [
          {
            items: items(
              '3D product visualisation',
              'AR product experiences',
              'Marketplace listing videos (Amazon/Flipkart)',
              'Product comparison & explainer (UGC)',
            ),
          },
        ],
        detailPage: false,
        image: null,
      },
      {
        slug: 'enterprise-learning-video',
        name: 'Enterprise & Learning Video',
        summary: 'AI-assisted corporate, training and compliance content.',
        description: 'AI-assisted corporate, training and compliance content.',
        groups: [
          {
            items: items(
              'Corporate info videos',
              'Internal comms & leadership',
              'Compliance / policy / SOP training',
              'Course content',
              'Micro-learning & assessment',
              'Skill simulation',
            ),
          },
        ],
        detailPage: false,
        image: null,
      },
    ],
  },
  {
    id: 'creative-brand',
    slug: 'creative-brand',
    number: '03',
    name: 'Creative & Brand',
    // draft (summarises the topics below; no factual claim). Client to confirm.
    intro:
      'Brand identity, design, content and campaign direction that make brands recognisable and memorable.',
    banner: null,
    topics: [
      {
        slug: 'branding',
        name: 'Branding',
        summary: 'Distinctive identity systems built to last.',
        description: 'Distinctive identity systems built to last.',
        groups: [
          {
            items: items(
              'Brand identity & logo',
              'Brand creation & naming',
              'Visual guidelines',
              'Typography & colour',
            ),
          },
        ],
        detailPage: false,
        image: null,
      },
      {
        slug: 'design',
        name: 'Design',
        summary: 'Graphic, editorial and packaging design across every format.',
        description: 'Graphic, editorial and packaging design across every format.',
        groups: [
          {
            items: items(
              'Graphic design',
              'Editorial design',
              'Print & collateral',
              'Packaging design',
              'Presentation design',
            ),
          },
        ],
        detailPage: false,
        image: null,
      },
      {
        slug: 'content',
        name: 'Content',
        summary: 'Brand stories, words and visual content that build a consistent voice.',
        description: 'Brand stories, words and visual content that build a consistent voice.',
        groups: [{ items: items('Copywriting', 'Content strategy', 'Blog & editorial') }],
        detailPage: false,
        image: null,
      },
      {
        slug: 'campaign-strategy',
        name: 'Campaigns',
        summary: 'Big ideas and creative direction that bring the brand to life.',
        description: 'Big ideas and creative direction that bring the brand to life.',
        groups: [
          { items: items('Campaign ideation', 'Creative mandate & briefs', 'Concept creation') },
        ],
        detailPage: false,
        image: null,
      },
    ],
  },
];
