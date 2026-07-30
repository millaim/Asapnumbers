/**
 * ProductReveal.tsx — Scene 2 (3–8s).
 * WIP placeholder (registered & timed) — will be polished after the Hook's
 * motion is approved. Already uses the shared motion signature so the timing
 * and feel preview correctly.
 *
 * Beat: logo scales up out of a soft glow and settles → product name → tagline.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {AnimatedText} from '../components/AnimatedText';
import {Logo} from '../components/Logo';
import {Pop} from '../components/SoundDesign';
import {springValue, SPRING_GENTLE} from '../lib/motion';
import {colors, type, spacing} from '../theme';
import {brand, reveal} from '../content';

const LOGO_LAND = 20;

export const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Logo: scale up + settle (gentle overshoot), glow blooms then eases back.
  const logoScale = springValue({frame, fps, from: 0.7, to: 1, config: SPRING_GENTLE});
  const glow = interpolate(frame, [0, 18, 45], [0, 1, 0.5], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <Background glowX={0.5} glowY={0.45} drift={50} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* Logo + its own bloom */}
        <div style={{position: 'relative', transform: `scale(${logoScale})`}}>
          <div
            style={{
              position: 'absolute',
              inset: -80,
              background: `radial-gradient(circle, ${colors.glowPrimary} 0%, transparent 65%)`,
              opacity: glow,
              filter: 'blur(30px)',
            }}
          />
          <Logo size={200} />
        </div>

        <AnimatedText
          delay={22}
          feel="entrance"
          style={{
            marginTop: spacing.lg,
            fontSize: type.title,
            fontWeight: type.weightBlack,
            letterSpacing: type.trackingTight,
            color: colors.textPrimary,
          }}
        >
          {brand.name}
        </AnimatedText>

        <AnimatedText
          delay={38}
          style={{
            marginTop: spacing.sm,
            fontSize: type.subtitle,
            fontWeight: type.weightMedium,
            letterSpacing: type.trackingNormal,
            color: colors.textSecondary,
          }}
        >
          {reveal.tagline}
        </AnimatedText>
      </AbsoluteFill>

      <Pop at={LOGO_LAND} />
    </AbsoluteFill>
  );
};
