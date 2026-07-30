/**
 * FeatureBeat.tsx — Scenes 3–5 (8–24s). ★ REUSABLE / DATA-DRIVEN ★
 *
 * One component renders all three feature beats — pass it different props
 * (headline, sub, icon, index) from Root/Video. WIP visuals (a UI-mockup card +
 * icon) — will be polished after the Hook's motion is approved, but the props
 * API and the shared motion signature are final.
 *
 *   <FeatureBeat headline="…" sub="…" icon="bolt" index={0} />
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {AnimatedText} from '../components/AnimatedText';
import {Icon, IconName} from '../components/Icon';
import {Pop} from '../components/SoundDesign';
import {springValue, SPRING_GENTLE} from '../lib/motion';
import {colors, type, spacing} from '../theme';

export type FeatureBeatProps = {
  headline: string;
  sub: string;
  icon: IconName;
  /** 0,1,2 — alternates the layout side and shifts the glow for variety. */
  index: number;
};

const CARD_LAND = 22;

export const FeatureBeat: React.FC<FeatureBeatProps> = ({headline, sub, icon, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Alternate composition L/R for rhythm across the three beats.
  const flip = index % 2 === 1;

  // Card reveal: rises + settles (same signature as text, gentle overshoot).
  const cardY = springValue({frame, fps, from: 60, to: 0, config: SPRING_GENTLE});
  const cardScale = springValue({frame, fps, from: 0.92, to: 1, config: SPRING_GENTLE});
  const cardOpacity = springValue({frame, fps, from: 0, to: 1, config: SPRING_GENTLE});

  return (
    <AbsoluteFill>
      <Background glowX={flip ? 0.68 : 0.32} glowY={0.5} drift={45} />

      <AbsoluteFill
        style={{
          flexDirection: flip ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.xxl,
          padding: `0 ${spacing.xxl}px`,
        }}
      >
        {/* TEXT COLUMN */}
        <div style={{flex: '0 0 40%', maxWidth: 640}}>
          <AnimatedText
            delay={8}
            feel="entrance"
            style={{
              fontSize: type.headline,
              fontWeight: type.weightBlack,
              letterSpacing: type.trackingTight,
              lineHeight: 1.05,
              color: colors.textPrimary,
            }}
          >
            {headline}
          </AnimatedText>
          <AnimatedText
            delay={20}
            style={{
              marginTop: spacing.md,
              fontSize: type.body,
              fontWeight: type.weightRegular,
              lineHeight: 1.4,
              color: colors.textSecondary,
            }}
          >
            {sub}
          </AnimatedText>
        </div>

        {/* VISUAL COLUMN — UI mockup card (placeholder).
            TODO(brand): drop a real product screenshot in public/assets/ and
            render it here (e.g. <Img src={staticFile('assets/feature-1.png')}/>). */}
        <div
          style={{
            flex: '0 0 40%',
            maxWidth: 620,
            transform: `translateY(${cardY}px) scale(${cardScale})`,
            opacity: cardOpacity,
          }}
        >
          <MockupCard icon={icon} label={headline} />
        </div>
      </AbsoluteFill>

      <Pop at={CARD_LAND} />
    </AbsoluteFill>
  );
};

/** Placeholder "product UI" card — a framed surface with an icon + faux rows. */
const MockupCard: React.FC<{icon: IconName; label: string}> = ({icon, label}) => (
  <div
    style={{
      borderRadius: 28,
      background: `linear-gradient(160deg, ${colors.surface} 0%, #0A0D14 100%)`,
      border: `1px solid ${colors.surfaceBorder}`,
      boxShadow: '0 40px 120px rgba(0,0,0,0.55)',
      padding: spacing.xl,
      aspectRatio: '16 / 10',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: spacing.md}}>
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 20,
          background: 'rgba(46,139,255,0.12)', // TODO(brand): accent tint
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={52} />
      </div>
      <div
        style={{
          color: colors.textPrimary,
          fontSize: type.caption,
          fontWeight: type.weightBold,
          letterSpacing: type.trackingNormal,
        }}
      >
        {label}
      </div>
    </div>
    {/* Faux content rows */}
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      {[0.9, 0.7, 0.5].map((w, i) => (
        <div
          key={i}
          style={{
            height: 18,
            width: `${w * 100}%`,
            borderRadius: 9,
            background: 'rgba(255,255,255,0.06)',
          }}
        />
      ))}
    </div>
  </div>
);
