export const SITE = {
  title: 'SIMSENblog',
  tagline: 'Modern endpoint management',
  description:
    'Things I learn, tools I build, shared with you. Microsoft Intune, Windows, macOS and endpoint security by Simon Hartmann Eriksen.',
  author: 'Simon Hartmann Eriksen',
  authorRole: 'Senior Security Architect',
  github: 'https://github.com/Simsen',
  linkedin: 'https://linkedin.com/in/simoneriksendk/',
  // Sections that are not rebuilt yet still point at the WordPress site.
  legacy: 'https://www.simsenblog.dk',
};

/** Social profiles shown as icons under the MVP logo. */
export const SOCIALS = [
  { id: 'x', label: 'X (Twitter)', url: 'https://twitter.com/Sim0nEriksen' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/simoneriksendk/' },
  { id: 'youtube', label: 'YouTube: Intune Insider', url: 'https://www.youtube.com/@IntuneInsiderDK' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/Simsen' },
] as const;

/**
 * Contact form on the About page. GitHub Pages can't receive form posts, so a form service
 * delivers the messages to your inbox. Fill in ONE of these:
 *  - Formspree: create a form at https://formspree.io, copy the ID from https://formspree.io/f/<ID>
 *  - Web3Forms: get an access key at https://web3forms.com (the key is meant to be public)
 * Leave both empty and the form explains that it isn't connected yet.
 */
export const CONTACT = {
  formspreeId: '',
  web3formsKey: '',
};

/** Topic filters on the homepage. Add one here and it appears as a filter button. */
export const CATEGORIES = ['Intune', 'Windows', 'macOS', 'Tools'] as const;
export type Category = (typeof CATEGORIES)[number];

/** Post icons. The name goes in front matter (icon: macos); the glyph is what is drawn. */
export const ICONS = {
  article: '≡',
  windows: '≡',
  intune: '≡',
  macos: '⌘',
  code: '{ }',
  tool: '{ }',
  qr: '⌗',
  terminal: '>_',
} as const;
export const ICON_NAMES = Object.keys(ICONS) as [keyof typeof ICONS, ...(keyof typeof ICONS)[]];
