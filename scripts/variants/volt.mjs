// Variant: Volt Noir (jet black, acid volt, electric blue, off-white).
//
// A dark identity: every original surface, light or dark, lands on a navy step, and text
// lands on mist. Accent fills become violet; the orange call-to-action fills become aqua with
// navy text. Surface-aware custom properties (--vb-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  void: '#060607', navy: '#0d0d0f', navy2: '#141417', navy3: '#1c1c21', navy4: '#27272e',
  indigo: '#1a2a66', indigoDeep: '#0d1640', indigoPale: '#161c33',
  violet: '#3d6bff', violetHi: '#7c9cff', lilac: '#b8c8ff',
  aqua: '#c8ff00', aquaPale: '#e6ff99',
  mist: '#f4f4f0', mist2: '#d6d6cf', muted: '#9a9a94',
};
const P = PALETTE;

const BASE = [
  `--vb-accent:${P.aqua}`, `--vb-accent2:${P.aquaPale}`, `--vb-white:${P.mist}`, `--vb-fg:${P.mist}`,
  `--vb-fg2:${P.mist2}`, `--vb-muted:${P.muted}`, `--vb-deep:${P.lilac}`, `--vb-hot:${P.violetHi}`,
  '--vb-line:rgba(244, 244, 240,.14)', '--vb-line2:rgba(244, 244, 240,.3)', `--vb-glow:${P.violet}`,
].join(';');

// text-like entry: the surface variable when opaque, and the same variable at the token's
// opacity (color-mix) when translucent, so ink follows the surface it lands on
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });

export default {
  name: 'volt',
  dist: 'dist',
  port: 4321,
  prefix: '--vb-',
  styles: ['/styles/volt.css'],
  scripts: ['/scripts/volt.js'],

  ctx: {
    dark: BASE,
    light: BASE,
    // violet / indigo fills
    accent: [`--vb-accent:#ffffff`, `--vb-accent2:#ffffff`, `--vb-white:#ffffff`, `--vb-fg:#ffffff`, `--vb-fg2:#f2f5ff`,
      `--vb-muted:#dce4ff`, `--vb-deep:#ffffff`, `--vb-hot:#ffffff`, '--vb-line:rgba(255,255,255,.3)',
      '--vb-line2:rgba(255,255,255,.5)', `--vb-glow:${P.violet}`].join(';'),
    // aqua fills (were orange call-to-actions): navy ink on top
    orange: [`--vb-accent:${P.navy}`, `--vb-accent2:${P.navy}`, `--vb-white:${P.navy}`, `--vb-fg:${P.navy}`, `--vb-fg2:${P.navy}`,
      '--vb-muted:rgba(13, 13, 15,.72)', `--vb-deep:${P.navy}`, `--vb-hot:${P.navy}`, '--vb-line:rgba(13, 13, 15,.25)',
      '--vb-line2:rgba(13, 13, 15,.45)', `--vb-glow:${P.aqua}`].join(';'),
  },
  whiteTextCtx: '',
  lineVar: 'var(--vb-line,rgba(244, 244, 240,.14))',
  // custom properties are mapped by what they paint where they are read (see collectUses)
  varRoles: true,
  // off-palette pale tints (creams, blush, pastel washes) are light surfaces too: on a dark skin
  // they must land on navy like the rest
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.navy, paper: P.navy2, silver: P.navy3, grey: P.navy4, ink: P.void, ink2: '#101013',
      teal: P.violet, blue: P.violet, mint: P.indigo, mintPale: P.indigoPale, deep: P.indigoDeep, orange: P.aqua },
    grad: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#101013',
      teal: P.violet, mint: '#22408f', mintPale: P.navy2, deep: '#0f1a4d', blue: P.violet, orange: P.aqua },
    // gradients clipped to text (background-clip: text): light, glowing stops
    gradText: { white: P.mist, paper: P.mist2, silver: P.muted, grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violetHi, mint: P.aquaPale, mintPale: P.aquaPale, deep: P.lilac, orange: P.violetHi },
    text: {
      white: t('--vb-white', P.mist), paper: t('--vb-white', P.mist),
      silver: t('--vb-muted', '#b4b4ad', P.mist), grey: t('--vb-muted', P.muted, P.mist),
      ink: t('--vb-fg', P.mist), ink2: t('--vb-fg2', P.mist2, P.mist),
      teal: t('--vb-accent', P.aqua), blue: t('--vb-accent', P.aqua),
      mint: t('--vb-accent2', P.aquaPale, P.aqua), mintPale: t('--vb-accent2', P.aquaPale, P.aqua),
      deep: t('--vb-deep', P.lilac), orange: t('--vb-hot', P.violetHi, P.violet),
    },
    border: {
      white: { solid: 'rgba(244, 244, 240,.55)', alpha: P.mist },
      paper: { solid: 'var(--vb-line,rgba(244, 244, 240,.14))', alpha: null },
      silver: { solid: 'var(--vb-line,rgba(244, 244, 240,.14))', alpha: null },
      mintPale: { solid: 'var(--vb-line,rgba(244, 244, 240,.14))', alpha: null },
      grey: { solid: 'rgba(244, 244, 240,.22)', alpha: P.mist },
      ink: { solid: 'var(--vb-line2,rgba(244, 244, 240,.3))', alpha: P.mist },
      ink2: { solid: 'var(--vb-line2,rgba(244, 244, 240,.3))', alpha: P.mist },
      teal: t('--vb-accent', P.aqua), mint: t('--vb-accent', P.aqua), blue: t('--vb-accent', P.aqua),
      deep: P.violet, orange: P.aqua,
    },
    svg: { white: P.mist, paper: P.navy3, silver: '#3a4378', grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violet, mint: P.aquaPale, mintPale: P.navy3, deep: P.lilac, orange: P.aqua },
    // fallback for custom properties read both as text and as a surface (or never read):
    // neutrals act as surfaces, saturated colours as accents that must stay readable on navy
    var: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#101013',
      teal: { solid: `var(--vb-accent,${P.aqua})`, alpha: P.violet }, blue: { solid: `var(--vb-accent,${P.aqua})`, alpha: P.violet },
      mint: P.aquaPale, mintPale: P.indigoPale, deep: P.aqua, orange: P.violetHi },
    canvas: { white: P.mist, ink: P.navy, ink2: P.navy2, teal: P.aqua, mint: P.aquaPale, mintPale: P.indigoPale,
      deep: P.violet, blue: P.violet, orange: P.aqua },
  },
};
