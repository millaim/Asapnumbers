/**
 * theme.ts — Single source of truth for brand look & feel.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  SWAP-IN CHECKLIST (replace every value marked `TODO(brand)` below)   │
 * │  • Colors: pull the exact hex values from numberasap.com              │
 * │  • Fonts:  swap Inter for the brand's real typeface if different      │
 * │  • Logo:   see src/components/Logo.tsx                                 │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * NOTE: The live site (numberasap.com) could not be reached from the build
 * environment (network policy blocked the host), so the copy and colors here
 * are tasteful, Apple-keynote-style placeholders in the "get a business number,
 * fast" direction. Everything below is designed to be swapped in one place.
 */

// ─────────────────────────────────────────────────────────────────────────────
// COLORS  (dark-mode, cinematic — TODO(brand): confirm against numberasap.com)
// ─────────────────────────────────────────────────────────────────────────────
export const colors = {
  // Deep, rich background. Near-black with a faint cool-blue cast.
  bg: '#05070B',
  bgDeep: '#020306', // used at the vignette edges
  // Card / surface color for UI mockups.
  surface: '#10141C',
  surfaceBorder: 'rgba(255,255,255,0.08)',

  // Typography
  textPrimary: '#F6F8FC',
  textSecondary: '#9AA4B6',
  textMuted: '#5C6678',

  // TODO(brand): replace these two with the real accent + secondary accent.
  accent: '#2E8BFF', // confident tech blue (placeholder)
  accentSoft: '#7FB4FF', // lighter tint for glows/highlights (placeholder)
  accent2: '#8B5CFF', // secondary accent for gradient lighting (placeholder)

  // Glow colors (derived from accent — usually no need to edit directly)
  glowPrimary: 'rgba(46,139,255,0.55)',
  glowSecondary: 'rgba(139,92,255,0.40)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────────────────────────────────────
// Font family is loaded in src/lib/fonts.ts (via @remotion/google-fonts).
// Inter is used as a stand-in for Apple's SF Pro (closest freely-available match).
// TODO(brand): if NumberAsap uses a specific typeface, swap it in fonts.ts.
export const fonts = {
  // Filled in at runtime by loadFonts(); see src/lib/fonts.ts.
  display: 'Inter, system-ui, -apple-system, sans-serif',
  body: 'Inter, system-ui, -apple-system, sans-serif',
} as const;

export const type = {
  // Large, confident display sizes (px @ 1080p).
  hero: 118,
  title: 96,
  headline: 72,
  subtitle: 40,
  body: 30,
  caption: 24,
  // Apple-style tight tracking on big type, looser on small.
  trackingTight: '-0.03em',
  trackingNormal: '-0.01em',
  trackingWide: '0.02em',
  weightBlack: 800,
  weightBold: 700,
  weightMedium: 500,
  weightRegular: 400,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING (px @ 1080p)
// ─────────────────────────────────────────────────────────────────────────────
export const spacing = {
  xs: 8,
  sm: 16,
  md: 28,
  lg: 48,
  xl: 80,
  xxl: 140,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO / FORMAT
// ─────────────────────────────────────────────────────────────────────────────
export const video = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;
