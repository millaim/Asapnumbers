/**
 * Logo.tsx — PLACEHOLDER logo mark.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  SWAP-IN: replace the <PlaceholderMark/> below with the real logo.    │
 * │  Easiest path: drop your SVG/PNG in public/assets/ and render it via   │
 * │  <Img src={staticFile('assets/logo.svg')} /> here. Keep the same       │
 * │  wrapper so the reveal animation in ProductReveal.tsx still applies.    │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * The placeholder is a rounded-square "phone bubble" mark using the brand
 * accent — intentionally simple and on-theme so the reveal reads well before
 * the real asset exists.
 */
import React from 'react';
import {colors} from '../theme';

export const Logo: React.FC<{size?: number}> = ({size = 200}) => {
  return (
    <div style={{width: size, height: size, position: 'relative'}}>
      {/* TODO(brand): replace this whole SVG with the real logo file. */}
      <PlaceholderMark size={size} />
    </div>
  );
};

const PlaceholderMark: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="200" y2="200">
        <stop offset="0%" stopColor={colors.accentSoft} />
        <stop offset="100%" stopColor={colors.accent} />
      </linearGradient>
    </defs>
    {/* Rounded-square app-tile shape */}
    <rect x="12" y="12" width="176" height="176" rx="44" fill="url(#logoGrad)" />
    {/* Phone glyph */}
    <path
      d="M74 66c0-4 3-7 7-7h13c3 0 6 2 7 5l6 20c1 3 0 6-2 8l-9 8c6 12 15 21 27 27l8-9c2-2 5-3 8-2l20 6c3 1 5 4 5 7v13c0 4-3 7-7 7-49 0-89-40-89-89z"
      fill="#fff"
      transform="translate(-8 -8)"
    />
  </svg>
);
