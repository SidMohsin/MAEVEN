/**
 * About page content.
 *
 * The supplied source material contains no company history, team, location, facilities, equipment,
 * clients or statistics, so none appear here. The story slot renders as a clearly marked
 * placeholder until the client supplies it.
 *
 * Copy labels (same convention as data/home.js):
 *  - `source`: taken from the service spreadsheet (data/services.js), quoted or lightly trimmed.
 *  - `draft`:  neutral wording with no factual claim; needs client approval.
 */
export const about = {
  hero: {
    // draft: a positioning headline (two short lines), not a restatement of the nav label.
    title: ['Crafted in the studio.', 'Made for every channel.'],
    // draft
    text: 'MAEVEN Productions brings photography, film, smart technology and brand work together in one production studio.',
  },

  // Image band after the hero (asset ids): one wide, one square.
  images: ['pink-ball-banner', 'rain-square'],

  story: {
    // draft: story lead, no factual claim
    lead: 'We make the visuals brands live on, and the brand work around them, for companies that need to be seen on every channel.',
    // Placeholder: founding, team and studio location are not in the source material.
    body: null,
  },

  // "Why MAEVEN": each principle is backed by a sentence from the service spreadsheet.
  principles: [
    {
      title: 'End to end',
      // source: Video & Film summary; AI Video & Film description
      text: 'Films, ads and live content shot and produced end-to-end, from concept to final output.',
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
  ],
};
