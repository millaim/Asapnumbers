/**
 * CTA.tsx — Scene 6 (24–30s). End card.
 * WIP placeholder (registered & timed) — polished after Hook approval. Uses the
 * shared motion signature. Beat: logo → tagline → website URL, then holds.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from '../components/Background';
import {AnimatedText} from '../components/AnimatedText';
import {Logo} from '../components/Logo';
import {Pop} from '../components/SoundDesign';
import {colors, type, spacing} from '../theme';
import {brand, cta} from '../content';

export const CTA: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background glowX={0.5} glowY={0.45} drift={40} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{transform: 'scale(0.75)'}}>
          <Logo size={200} />
        </div>

        <AnimatedText
          delay={14}
          feel="entrance"
          style={{
            marginTop: spacing.md,
            fontSize: type.title,
            fontWeight: type.weightBlack,
            letterSpacing: type.trackingTight,
            color: colors.textPrimary,
            textAlign: 'center',
          }}
        >
          {cta.tagline}
        </AnimatedText>

        {/* Website URL */}
        <AnimatedText
          delay={30}
          style={{
            marginTop: spacing.lg,
            fontSize: type.subtitle,
            fontWeight: type.weightMedium,
            letterSpacing: type.trackingWide,
            color: colors.accentSoft, // TODO(brand): accent color
          }}
        >
          {brand.url}
        </AnimatedText>
      </AbsoluteFill>

      <Pop at={28} />
    </AbsoluteFill>
  );
};
