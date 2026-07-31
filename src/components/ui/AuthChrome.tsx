/**
 * AuthChrome.tsx — The pre-login surface shared by Homepage / Create Account /
 * Login, matching the screenshots: near-black background with a faint grid, the
 * AsapNumbers wordmark top-left, a "Sign In" affordance top-right, and the
 * copyright footer. A soft brand glow drifts behind for depth.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, spacing, type} from '../../theme';
import {fontUI} from '../../lib/fonts';
import {Wordmark} from './primitives';
import {useEnter} from '../../lib/ui-motion';
import {springValue, SPRING_GLIDE} from '../../lib/motion';

const GridBg: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const drift = springValue({frame, fps, from: -30, to: 30, config: SPRING_GLIDE, durationInFrames: 300});
  return (
    <AbsoluteFill style={{backgroundColor: colors.bg}}>
      {/* faint grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse at 50% 42%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 42%, black 30%, transparent 78%)',
        }}
      />
      {/* drifting glow */}
      <AbsoluteFill
        style={{
          transform: `translate(${drift}px, ${-drift * 0.5}px)`,
          background: `radial-gradient(circle at 50% 40%, ${colors.glowPrimary} 0%, transparent 40%)`,
          filter: 'blur(60px)',
          opacity: 0.7,
        }}
      />
    </AbsoluteFill>
  );
};

export const AuthChrome: React.FC<{children: React.ReactNode; showSignIn?: boolean}> = ({
  children,
  showSignIn = true,
}) => (
  <AbsoluteFill>
    <GridBg />

    {/* Top bar */}
    <div style={{...useEnter(2, {y: 8}), position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${spacing.lg}px ${spacing.xl}px`}}>
      <Wordmark size={28} />
      {showSignIn ? (
        <div style={{fontFamily: fontUI, fontSize: type.caption, color: colors.textSecondary}}>
          Already have an account? <span style={{color: colors.cyanBlue, fontWeight: type.weightSemi}}>Sign In</span>
        </div>
      ) : null}
    </div>

    {/* Centered content */}
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: spacing.xl}}>{children}</AbsoluteFill>

    {/* Footer */}
    <div style={{position: 'absolute', bottom: spacing.lg, left: 0, right: 0, textAlign: 'center', fontFamily: fontUI, fontSize: type.micro, color: colors.textMuted}}>
      © 2026 Asap Numbers. All Rights Reserved.
    </div>
  </AbsoluteFill>
);
