/**
 * content.ts — ALL on-screen copy in one place. Edit here to re-script the film.
 *
 * ⚠️  PLACEHOLDER COPY. The live site (numberasap.com) was unreachable from the
 * build environment, so this is Apple-keynote-style placeholder copy written in
 * the product's apparent direction ("get a business phone number, fast").
 * TODO(brand): replace every string below with the real tagline / value prop /
 * feature names & descriptions pulled from numberasap.com.
 */

export const brand = {
  name: 'NumberAsap', // TODO(brand): confirm exact casing/spelling
  url: 'numberasap.com', // shown on the end card
} as const;

/** 1) HOOK — one bold line about the problem the product solves. */
export const hook = {
  line: 'Your business needs a number.', // TODO(brand)
  emphasis: 'Today.', // the punch word, revealed second
} as const;

/** 2) PRODUCT REVEAL — name + tagline after the logo lands. */
export const reveal = {
  tagline: 'A real business line. In minutes.', // TODO(brand): the hero tagline
} as const;

/** 3) FEATURE BEATS — exactly three. headline = 3–5 words; sub = one line. */
export const features = [
  {
    id: 'instant',
    headline: 'Live in minutes', // TODO(brand)
    sub: 'Pick a number and start taking calls — no store visit, no SIM.', // TODO(brand)
    icon: 'bolt' as const,
  },
  {
    id: 'anywhere',
    headline: 'Call from any device', // TODO(brand)
    sub: 'One line across phone, laptop and web. It rings wherever you are.', // TODO(brand)
    icon: 'devices' as const,
  },
  {
    id: 'smart',
    headline: 'Never miss a lead', // TODO(brand)
    sub: 'Smart routing, voicemail-to-text and after-hours auto-reply.', // TODO(brand)
    icon: 'spark' as const,
  },
] as const;

/** 4) CTA / end card. */
export const cta = {
  tagline: 'Get your number, ASAP.', // TODO(brand)
  action: 'Start free', // TODO(brand): button/label copy
} as const;
