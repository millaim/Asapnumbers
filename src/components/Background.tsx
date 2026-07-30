/**
 * Background.tsx — Deep cinematic backdrop for the title/logo/outro scenes.
 * Rich near-black navy + two drifting brand glows + vignette. Camera-like drift
 * uses a GLIDE spring so the frame is never static.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import {springValue, SPRING_GLIDE} from '../lib/motion';

export const Background: React.FC<{
  glowX?: number;
  glowY?: number;
  drift?: number;
  cyan?: boolean;
}> = ({glowX = 0.5, glowY = 0.42, drift = 70, cyan = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const dx = springValue({frame, fps, from: -drift, to: drift, config: SPRING_GLIDE, durationInFrames: 300});
  const dy = springValue({frame, fps, from: drift * 0.4, to: -drift * 0.4, config: SPRING_GLIDE, durationInFrames: 300});

  const primary = cyan ? colors.glowCyan : colors.glowPrimary;

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg}}>
      <AbsoluteFill
        style={{
          transform: `translate(${dx}px, ${dy}px)`,
          background: `radial-gradient(circle at ${glowX * 100}% ${glowY * 100}%, ${primary} 0%, transparent 45%)`,
          filter: 'blur(50px)',
        }}
      />
      <AbsoluteFill
        style={{
          transform: `translate(${-dx * 0.6}px, ${-dy * 0.6}px)`,
          background: `radial-gradient(circle at ${(1 - glowX) * 100}% ${(glowY + 0.28) * 100}%, ${colors.glowSecondary} 0%, transparent 42%)`,
          filter: 'blur(70px)',
        }}
      />
      <AbsoluteFill
        style={{background: `radial-gradient(circle at 50% 45%, transparent 40%, #02030A 100%)`}}
      />
    </AbsoluteFill>
  );
};
