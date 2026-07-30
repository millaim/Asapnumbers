/**
 * theme.ts — Single source of truth for the AsapNumbers brand.
 *
 * Values are matched to the real product screenshots (deep-navy fintech UI,
 * indigo→purple gradients, cyan auth accents, green status chips, Naira ₦).
 * Anything I couldn't sample exactly is marked TODO(brand) — tweak in one place.
 *
 * Format: VERTICAL 1080×1920 @ 60fps (per direction). A landscape variant will
 * reuse these tokens; only layout constants change.
 */

// ─────────────────────────────────────────────────────────────────────────────
// COLORS  (sampled from the AsapNumbers dashboard/auth screens)
// ─────────────────────────────────────────────────────────────────────────────
export const colors = {
  // App background — very dark navy, subtle blue cast.
  bg: '#080B14',
  bgPanel: '#0C1120', // sidebar / raised panels
  bgElevated: '#10162A',

  // Cards / surfaces
  surface: '#111827',
  surface2: '#0E1524',
  surfaceBorder: 'rgba(255,255,255,0.07)',
  surfaceBorderStrong: 'rgba(255,255,255,0.12)',

  // Typography
  textPrimary: '#F4F7FB',
  textSecondary: '#9AA6BC',
  textMuted: '#5D6980',

  // Brand accents — the app uses an indigo→purple family…
  accent: '#4F6BFF', // primary indigo (buttons, active nav, links)
  accent2: '#8B5CF6', // purple (gradient partner)
  accentSoft: '#8AA2FF', // lighter indigo for glows/highlights
  // …the auth screens + logo use a cyan→blue family.
  cyan: '#22D3EE',
  cyanBlue: '#38BDF8',

  // Status
  success: '#22C55E',
  successSoft: '#34D399',
  warning: '#F59E0B',
  danger: '#F43F5E',

  // Gradients (the wallet card, primary buttons, "Get Number")
  gradPrimary: 'linear-gradient(135deg, #5A6EF6 0%, #8B5CF6 100%)',
  gradCyan: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
  gradWallet: 'linear-gradient(135deg, #5568F0 0%, #7E5BEE 55%, #8B5CF6 100%)',

  // Glow colors derived from the accents
  glowPrimary: 'rgba(79,107,255,0.55)',
  glowSecondary: 'rgba(139,92,246,0.42)',
  glowCyan: 'rgba(34,211,238,0.40)',
} as const;

/** The brand wordmark colors: "ASAP" (light) + "NUMBERS" (blue). */
export const wordmark = {
  first: '#F4F7FB', // ASAP
  second: '#4F7DFF', // NUMBERS  — TODO(brand): confirm exact blue
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY  (loaded in src/lib/fonts.ts)
// Display = Sora (rounded geometric, matches the product headings).
// UI/body = Inter (matches the dashboard body text).
// TODO(brand): swap if AsapNumbers ships a specific typeface.
// ─────────────────────────────────────────────────────────────────────────────
export const type = {
  // Sizes tuned for a 1080-wide VERTICAL canvas.
  hero: 120,
  title: 84,
  headline: 60,
  subtitle: 40,
  cardTitle: 34,
  body: 30,
  ui: 27, // in-UI label size (nav items, buttons)
  caption: 23,
  micro: 19,

  trackingTight: '-0.03em',
  trackingNormal: '-0.01em',
  trackingWide: '0.04em',

  weightBlack: 800,
  weightBold: 700,
  weightSemi: 600,
  weightMedium: 500,
  weightRegular: 400,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SPACING / RADIUS  (px)
// ─────────────────────────────────────────────────────────────────────────────
export const spacing = {
  xs: 8,
  sm: 14,
  md: 22,
  lg: 36,
  xl: 60,
  xxl: 110,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 26,
  xl: 34,
  pill: 999,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO / FORMAT  — VERTICAL, 60fps
// ─────────────────────────────────────────────────────────────────────────────
export const video = {
  width: 1080,
  height: 1920,
  fps: 60,
} as const;

// Currency helper — the product prices in Naira.
export const naira = (n: number) =>
  '₦' + n.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2});
