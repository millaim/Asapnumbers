/**
 * primitives.tsx — Small reusable UI atoms that recreate the AsapNumbers look.
 * Every screen is composed from these so the interface is fully editable/animated
 * (never a screenshot).
 */
import React from 'react';
import {colors, radius, type} from '../../theme';
import {fontUI, fontDisplay} from '../../lib/fonts';
import {Icon, IconName} from '../Icon';

// ── Card ─────────────────────────────────────────────────────────────────────
export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  pad?: number;
}> = ({children, style, pad = 28}) => (
  <div
    style={{
      background: colors.surface,
      border: `1px solid ${colors.surfaceBorder}`,
      borderRadius: radius.lg,
      padding: pad,
      boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
      ...style,
    }}
  >
    {children}
  </div>
);

// ── Avatar (initials) ────────────────────────────────────────────────────────
export const Avatar: React.FC<{initials: string; size?: number}> = ({initials, size = 56}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.pill,
      background: colors.gradPrimary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: fontUI,
      fontWeight: type.weightBold,
      fontSize: size * 0.36,
      flexShrink: 0,
    }}
  >
    {initials}
  </div>
);

// ── Badge / Chip ─────────────────────────────────────────────────────────────
export const Badge: React.FC<{
  children: React.ReactNode;
  tone?: 'success' | 'accent' | 'neutral';
}> = ({children, tone = 'success'}) => {
  const map = {
    success: {bg: 'rgba(34,197,94,0.16)', fg: colors.successSoft},
    accent: {bg: 'rgba(79,107,255,0.18)', fg: colors.accentSoft},
    neutral: {bg: 'rgba(255,255,255,0.08)', fg: colors.textSecondary},
  }[tone];
  return (
    <span
      style={{
        background: map.bg,
        color: map.fg,
        fontFamily: fontUI,
        fontWeight: type.weightBold,
        fontSize: type.micro,
        letterSpacing: type.trackingWide,
        padding: '5px 12px',
        borderRadius: radius.pill,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
};

// ── Button ───────────────────────────────────────────────────────────────────
export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'cyan';
  style?: React.CSSProperties;
  full?: boolean;
}> = ({children, variant = 'primary', style, full}) => {
  const base: React.CSSProperties = {
    fontFamily: fontUI,
    fontWeight: type.weightSemi,
    fontSize: type.ui,
    borderRadius: radius.md,
    padding: '18px 26px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: full ? '100%' : undefined,
    border: 'none',
    color: '#fff',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: {background: colors.gradPrimary, boxShadow: '0 16px 40px rgba(79,107,255,0.35)'},
    cyan: {background: colors.gradCyan, boxShadow: '0 16px 40px rgba(34,211,238,0.30)'},
    ghost: {
      background: 'rgba(255,255,255,0.06)',
      border: `1px solid ${colors.surfaceBorder}`,
      color: colors.textPrimary,
    },
  };
  return <div style={{...base, ...variants[variant], ...style}}>{children}</div>;
};

// ── Icon button (top-bar + / bell) ───────────────────────────────────────────
export const IconButton: React.FC<{name: IconName; dot?: boolean; size?: number}> = ({
  name,
  dot,
  size = 48,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.md,
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${colors.surfaceBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      color: colors.textSecondary,
    }}
  >
    <Icon name={name} size={size * 0.44} />
    {dot ? (
      <span
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 9,
          height: 9,
          borderRadius: 999,
          background: colors.danger,
        }}
      />
    ) : null}
  </div>
);

// ── Icon in a rounded tinted tile (used across dashboard tiles/actions) ───────
export const IconTile: React.FC<{name: IconName; size?: number; tint?: string}> = ({
  name,
  size = 64,
  tint = 'rgba(79,107,255,0.14)',
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius.md,
      background: tint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.accentSoft,
    }}
  >
    <Icon name={name} size={size * 0.5} />
  </div>
);

// ── Brand wordmark ("ASAP" + "NUMBERS") ──────────────────────────────────────
export const Wordmark: React.FC<{size?: number}> = ({size = 30}) => (
  <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: size, letterSpacing: '0.01em'}}>
    <span style={{color: colors.textPrimary}}>ASAP</span>
    <span style={{color: colors.accent}}>NUMBERS</span>
  </div>
);
