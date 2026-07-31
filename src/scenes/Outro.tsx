/**
 * Outro.tsx — Closing scene. "Fast. Secure. Reliable." lands word by word under
 * the wordmark, then the call to action invites viewers to visit the website.
 * Cinematic glow backdrop + particles, success chime on the CTA.
 */
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Captions} from '../components/ui/Captions';
import {Sfx} from '../components/SoundDesign';
import {Icon} from '../components/Icon';
import {colors, radius, spacing, type} from '../theme';
import {fontDisplay, fontUI} from '../lib/fonts';
import {brand, outro, SCRIPT} from '../content';
import {springValue, SPRING_ENTRANCE, SPRING_GENTLE} from '../lib/motion';

const script = SCRIPT.find((s) => s.id === 'outro')!;
const WORD_DELAYS = [16, 34, 52];
const CTA_AT = 92;

const PunchWord: React.FC<{text: string; delay: number}> = ({text, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: SPRING_ENTRANCE});
  const scale = interpolate(p, [0, 1], [0.7, 1]);
  const opacity = interpolate(p, [0, 0.5], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <span style={{opacity, transform: `scale(${scale})`, display: 'inline-block', fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: 72, color: colors.textPrimary, margin: '0 14px'}}>
      {text}
    </span>
  );
};

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const wmScale = springValue({frame, fps, from: 0.8, to: 1, config: SPRING_GENTLE});
  const wmOpacity = interpolate(frame, [4, 24], [0, 1], {extrapolateRight: 'clamp'});
  const ctaP = spring({frame: frame - CTA_AT, fps, config: SPRING_ENTRANCE});
  const ctaY = interpolate(ctaP, [0, 1], [30, 0]);
  const ctaOpacity = interpolate(ctaP, [0, 0.6], [0, 1], {extrapolateRight: 'clamp'});
  // Gentle push-in.
  const cam = springValue({frame, fps, from: 1.08, to: 1, config: {damping: 60, mass: 1.6, stiffness: 40}, durationInFrames: 300});

  return (
    <AbsoluteFill>
      <Background glowX={0.5} glowY={0.4} drift={50} />

      <AbsoluteFill style={{transform: `scale(${cam})`, justifyContent: 'center', alignItems: 'center'}}>
        {/* Wordmark */}
        <div style={{transform: `scale(${wmScale})`, opacity: wmOpacity, fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: 64, marginBottom: spacing.lg}}>
          <span style={{color: colors.textPrimary}}>ASAP</span>
          <span style={{color: colors.accent}}>NUMBERS</span>
        </div>

        {/* Fast. Secure. Reliable. */}
        <div style={{marginBottom: spacing.xl}}>
          {outro.words.map((w, i) => (
            <PunchWord key={w} text={w} delay={WORD_DELAYS[i]} />
          ))}
        </div>

        {/* CTA */}
        <div style={{transform: `translateY(${ctaY}px)`, opacity: ctaOpacity, textAlign: 'center'}}>
          <div style={{fontFamily: fontUI, fontSize: type.body, color: colors.textSecondary, marginBottom: spacing.sm}}>{outro.cta}</div>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 16, background: colors.gradPrimary, borderRadius: radius.pill, padding: '22px 44px', boxShadow: `0 20px 60px ${colors.glowPrimary}`}}>
            <Icon name="globe" size={34} color="#fff" />
            <span style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: 46, color: '#fff', letterSpacing: '0.01em'}}>{brand.urlFull}</span>
          </div>
        </div>
      </AbsoluteFill>

      <Captions tokens={script.caption} startAt={70} span={140} bottom={220} />

      <Sfx name="pop" at={WORD_DELAYS[0]} />
      <Sfx name="pop" at={WORD_DELAYS[1]} />
      <Sfx name="pop" at={WORD_DELAYS[2]} />
      <Sfx name="success" at={CTA_AT} />
    </AbsoluteFill>
  );
};
