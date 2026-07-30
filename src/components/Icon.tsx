/**
 * Icon.tsx — Minimal line icons for the feature beats.
 * TODO(brand): swap for the brand's real icon set if it has one.
 */
import React from 'react';
import {colors} from '../theme';

export type IconName = 'bolt' | 'devices' | 'spark';

export const Icon: React.FC<{name: IconName; size?: number; color?: string}> = ({
  name,
  size = 96,
  color = colors.accentSoft,
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: color,
    strokeWidth: 2.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M26 4 8 27h12l-2 17 18-23H24z" />
        </svg>
      );
    case 'devices':
      return (
        <svg {...common}>
          <rect x="4" y="10" width="28" height="20" rx="3" />
          <rect x="34" y="18" width="10" height="22" rx="2" />
          <path d="M12 38h12" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path d="M24 6v10M24 32v10M6 24h10M32 24h10M12 12l7 7M29 29l7 7M36 12l-7 7M19 29l-7 7" />
        </svg>
      );
  }
};
