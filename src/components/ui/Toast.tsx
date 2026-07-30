/**
 * Toast.tsx — Notification pops (copied confirmation, OTP received, success).
 * Springs in from the top-right, holds, then eases out. Timed by `at`/`hold`.
 */
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, radius, spacing, type} from '../../theme';
import {fontUI} from '../../lib/fonts';
import {Icon, IconName} from '../Icon';
import {SPRING_ENTRANCE} from '../../lib/motion';

export const Toast: React.FC<{
  at: number;
  hold?: number;
  icon?: IconName;
  title: string;
  sub?: string;
  tone?: 'success' | 'accent';
}> = ({at, hold = 90, icon = 'check', title, sub, tone = 'success'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - at;
  if (local < 0) return null;

  const inP = spring({frame: local, fps, config: SPRING_ENTRANCE});
  const outP = spring({frame: local - hold, fps, config: {damping: 200, mass: 1, stiffness: 120}});
  const x = interpolate(inP, [0, 1], [80, 0]) + interpolate(outP, [0, 1], [0, 120]);
  const opacity = interpolate(inP, [0, 1], [0, 1]) - interpolate(outP, [0, 1], [0, 1]);

  const accent = tone === 'success' ? colors.success : colors.accent;
  return (
    <div
      style={{
        position: 'absolute',
        top: spacing.lg,
        right: spacing.lg,
        transform: `translateX(${x}px)`,
        opacity: Math.max(0, opacity),
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        background: 'rgba(20,26,42,0.92)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${colors.surfaceBorderStrong}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: radius.md,
        padding: '16px 20px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        zIndex: 60,
        maxWidth: 460,
      }}
    >
      <div style={{width: 40, height: 40, borderRadius: radius.pill, background: `${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0}}>
        <Icon name={icon} size={22} />
      </div>
      <div>
        <div style={{fontFamily: fontUI, fontWeight: type.weightBold, fontSize: type.caption, color: colors.textPrimary}}>{title}</div>
        {sub ? <div style={{fontFamily: fontUI, fontSize: type.micro, color: colors.textSecondary, marginTop: 2}}>{sub}</div> : null}
      </div>
    </div>
  );
};
