/**
 * Icon.tsx — Line-icon set matching the AsapNumbers UI (nav, tiles, actions).
 * All icons share one stroke style so the interface reads as a single system.
 * TODO(brand): swap for the product's real icon set if it has one.
 */
import React from 'react';

export type IconName =
  | 'home'
  | 'phone'
  | 'bolt'
  | 'list'
  | 'doc'
  | 'sim'
  | 'globe'
  | 'user'
  | 'card'
  | 'users'
  | 'shield'
  | 'bell'
  | 'plus'
  | 'copy'
  | 'eye'
  | 'search'
  | 'chevron'
  | 'check'
  | 'sun'
  | 'logout'
  | 'send'
  | 'external';

export const Icon: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({name, size = 24, color = 'currentColor', strokeWidth = 2}) => {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'home':
      return (<svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>);
    case 'phone':
      return (<svg {...p}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>);
    case 'bolt':
      return (<svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>);
    case 'list':
      return (<svg {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>);
    case 'doc':
      return (<svg {...p}><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4M9 13h6M9 17h6" /></svg>);
    case 'sim':
      return (<svg {...p}><path d="M6 2h8l4 4v16H6z" /><rect x="9" y="12" width="6" height="6" rx="1" /></svg>);
    case 'globe':
      return (<svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></svg>);
    case 'user':
      return (<svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>);
    case 'card':
      return (<svg {...p}><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M2 10h20M6 15h4" /></svg>);
    case 'users':
      return (<svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5" /><path d="M16 5.5a3.5 3.5 0 0 1 0 6.5M22 20c0-2.6-1.4-4.3-3.5-5" /></svg>);
    case 'shield':
      return (<svg {...p}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z" /></svg>);
    case 'bell':
      return (<svg {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>);
    case 'plus':
      return (<svg {...p}><path d="M12 5v14M5 12h14" /></svg>);
    case 'copy':
      return (<svg {...p}><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" /></svg>);
    case 'eye':
      return (<svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>);
    case 'search':
      return (<svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>);
    case 'chevron':
      return (<svg {...p}><path d="m6 9 6 6 6-6" /></svg>);
    case 'check':
      return (<svg {...p}><path d="M4 12l5 5L20 6" /></svg>);
    case 'sun':
      return (<svg {...p}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" /></svg>);
    case 'logout':
      return (<svg {...p}><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>);
    case 'send':
      return (<svg {...p}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>);
    case 'external':
      return (<svg {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>);
  }
};
