/**
 * LogoReveal.tsx — Scene 1. Cinematic wordmark reveal on black with ambient blue
 * light and drifting particles. ASAP·NUMBERS scales up out of a glow bloom, the
 * tagline fades in, captions run. Sets the premium tone for the film.
 */
import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {Captions} from '../components/ui/Captions';
import {Sfx} from '../components/SoundDesign';
import {colors, type, spacing} from '../theme';
import {fontDisplay} from '../lib/fonts';
import {brand, SCRIPT} from '../content';
import {springValue, SPRING_GENTLE, SPRING_ENTRANCE} from '../lib/motion';

const script = SCRIPT.find((s) => s.id === 'logo')!;

// Drifting ambient particles (deterministic via Remotion's random()).
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const dots = new Array(38).fill(0).map((_, i) => {
    const seed = `p${i}`;
    const x = random(seed + 'x') * width;
    const baseY = random(seed + 'y') * height;
    const speed = 0.2 + random(seed + 's') * 0.6;
    const size = 1.5 + random(seed + 'r') * 3.5;
    const y = (baseY - frame * speed + height) % height;
    const twinkle = 0.2 + 0.6 * Math.abs(Math.sin((frame + i * 30) / 40));
    return {x, y, size, opacity: twinkle * (0.3 + random(seed + 'o') * 0.5)};
  });
  return (
    <AbsoluteFill>
      {dots.map((d, i) => (
        <div key={i} style={{position: 'absolute', left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: 999, background: colors.accentSoft, opacity: d.opacity, filter: 'blur(0.5px)'}} />
      ))}
    </AbsoluteFill>
  );
};

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Wordmark: scale up + settle, glow blooms then eases.
  const scale = springValue({frame, fps, from: 0.82, to: 1, config: SPRING_GENTLE});
  const wmOpacity = interpolate(frame, [6, 30], [0, 1], {extrapolateRight: 'clamp'});
  const glow = interpolate(frame, [0, 24, 70], [0, 1, 0.45], {extrapolateRight: 'clamp'});
  const blur = interpolate(springValue({frame, fps, from: 0, to: 1, config: SPRING_ENTRANCE}), [0, 0.8], [16, 0], {extrapolateRight: 'clamp'});

  // Subtle push-in on the whole scene.
  const camScale = springValue({frame, fps, from: 1, to: 1.06, config: {damping: 60, mass: 1.5, stiffness: 40}, durationInFrames: 240});

  return (
    <AbsoluteFill>
      <Background glowX={0.5} glowY={0.42} drift={60} />
      <Particles />

      <AbsoluteFill style={{transform: `scale(${camScale})`}}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          {/* Glow bloom behind the wordmark */}
          <div style={{position: 'absolute', width: 900, height: 500, background: `radial-gradient(ellipse, ${colors.glowPrimary} 0%, transparent 62%)`, opacity: glow, filter: 'blur(40px)'}} />

          <div style={{transform: `scale(${scale})`, opacity: wmOpacity, filter: `blur(${blur}px)`, fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: 96, letterSpacing: '0.01em', textAlign: 'center'}}>
            <span style={{color: colors.textPrimary}}>ASAP</span>
            <span style={{color: colors.accent}}>NUMBERS</span>
          </div>

          {/* Tagline */}
          <div style={{marginTop: spacing.md, opacity: interpolate(frame, [34, 58], [0, 1], {extrapolateRight: 'clamp'}), transform: `translateY(${interpolate(springValue({frame: frame - 34, fps, from: 0, to: 1, config: SPRING_GENTLE}), [0, 1], [16, 0])}px)`, fontFamily: fontDisplay, fontSize: type.body, fontWeight: type.weightMedium, letterSpacing: '0.12em', color: colors.textSecondary, textTransform: 'uppercase'}}>
            {brand.tagline}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      <Captions tokens={script.caption} startAt={20} span={190} bottom={260} />

      {/* Sound: soft chime as the wordmark lands. */}
      <Sfx name="success" at={24} />
    </AbsoluteFill>
  );
};
