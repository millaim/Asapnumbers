/**
 * Hook.tsx — Scene 1 (0–3s). ★ FULLY BUILT — this is the motion reference. ★
 *
 * The look: a single bold statement on deep black, landing in two beats with the
 * video's signature entrance (scale + fade + blur-to-focus, spring-driven), a
 * whisper of a camera push-in, and a soft "pop" when the punch word settles.
 *
 * Everything here uses the shared motion library, so approving this scene
 * approves the motion identity for the entire film.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from '../components/Background';
import {AnimatedText} from '../components/AnimatedText';
import {Pop} from '../components/SoundDesign';
import {springValue, SPRING_GLIDE} from '../lib/motion';
import {colors, type, spacing} from '../theme';
import {hook} from '../content';

// Beat timing (frames within the scene). Tweak to change the rhythm.
const LINE1_DELAY = 6;
const EMPHASIS_DELAY = 26;
// The punch word finishes settling ~14 frames after it starts → land the "pop".
const EMPHASIS_LAND = EMPHASIS_DELAY + 14;

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Slow, camera-like push-in across the whole scene (never linear).
  const camScale = springValue({
    frame,
    fps,
    from: 1,
    to: 1.05,
    config: SPRING_GLIDE,
    durationInFrames: 90,
  });

  return (
    <AbsoluteFill>
      {/* Glow biased slightly above center so the type sits in the light. */}
      <Background glowX={0.5} glowY={0.38} drift={70} />

      {/* Camera push-in wrapper */}
      <AbsoluteFill style={{transform: `scale(${camScale})`}}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing.xxl,
            textAlign: 'center',
          }}
        >
          <div style={{maxWidth: 1400}}>
            {/* Beat 1 — the setup line */}
            <AnimatedText
              delay={LINE1_DELAY}
              feel="gentle"
              style={{
                fontSize: type.headline,
                fontWeight: type.weightBold,
                letterSpacing: type.trackingTight,
                lineHeight: 1.05,
                color: colors.textPrimary,
              }}
            >
              {hook.line}
            </AnimatedText>

            {/* Beat 2 — the punch word, larger + accent-tinted */}
            <AnimatedText
              delay={EMPHASIS_DELAY}
              feel="entrance"
              style={{
                marginTop: spacing.md,
                fontSize: type.hero,
                fontWeight: type.weightBlack,
                letterSpacing: type.trackingTight,
                lineHeight: 1,
                color: colors.accent, // TODO(brand): accent color
              }}
            >
              {hook.emphasis}
            </AnimatedText>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Sound: soft pop exactly when the punch word lands into place. */}
      <Pop at={EMPHASIS_LAND} />
    </AbsoluteFill>
  );
};
