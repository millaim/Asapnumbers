/**
 * Background.tsx — The deep, cinematic backdrop shared by every scene.
 *
 * • Rich near-black base with two soft radial "stage light" glows.
 * • The glows drift slowly (camera-like parallax) using a GLIDE spring so the
 *   frame never feels static — but never distractingly either.
 * • A vignette darkens the edges to focus the eye on centered compositions.
 *
 * TODO(brand): the glow colors come from theme.colors.glowPrimary/Secondary,
 * which derive from the accent colors — swap the accents in theme.ts.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import {springValue, SPRING_GLIDE} from '../lib/motion';

export const Background: React.FC<{
  /** Nudge the glow focus per-scene for variety (0..1 across width/height). */
  glowX?: number;
  glowY?: number;
  /** Slow drift intensity in px. */
  drift?: number;
}> = ({glowX = 0.5, glowY = 0.42, drift = 60}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Camera-like drift: eases in over the scene, no constant velocity.
  const dx = springValue({
    frame,
    fps,
    from: -drift,
    to: drift,
    config: SPRING_GLIDE,
    durationInFrames: 240,
  });
  const dy = springValue({
    frame,
    fps,
    from: drift * 0.4,
    to: -drift * 0.4,
    config: SPRING_GLIDE,
    durationInFrames: 240,
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg}}>
      {/* Primary accent glow */}
      <AbsoluteFill
        style={{
          transform: `translate(${dx}px, ${dy}px)`,
          background: `radial-gradient(circle at ${glowX * 100}% ${
            glowY * 100
          }%, ${colors.glowPrimary} 0%, transparent 42%)`,
          filter: 'blur(40px)',
        }}
      />
      {/* Secondary accent glow (opposite corner, offset drift = parallax) */}
      <AbsoluteFill
        style={{
          transform: `translate(${-dx * 0.6}px, ${-dy * 0.6}px)`,
          background: `radial-gradient(circle at ${(1 - glowX) * 100}% ${
            (glowY + 0.25) * 100
          }%, ${colors.glowSecondary} 0%, transparent 40%)`,
          filter: 'blur(60px)',
        }}
      />
      {/* Vignette — pulls focus to center, deepens the mood */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 45%, ${colors.bgDeep} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
