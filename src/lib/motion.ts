/**
 * motion.ts — The shared MOTION SIGNATURE.
 *
 * Every scene imports its easing from here so the whole video feels like one
 * consistent, "buttery" system. There is deliberately NO raw linear motion for
 * position/scale — only spring()-driven values. Linear interpolate() is used
 * ONLY for pure opacity fades (where constant velocity reads as natural light,
 * not mechanical movement).
 *
 * If you want to retune the overall "feel" of the whole video, tune the spring
 * configs below — nothing else needs to change.
 */
import {interpolate, spring} from 'remotion';

// ─────────────────────────────────────────────────────────────────────────────
// SPRING CONFIGS — the motion "signature". Tune these to change the whole feel.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ENTRANCE — the primary curve for text & hero elements landing into place.
 * Slight overshoot then settle → the confident "pop into focus" Apple feel.
 */
export const SPRING_ENTRANCE = {
  damping: 16,
  mass: 1,
  stiffness: 130,
} as const;

/**
 * GENTLE — softer, minimal overshoot. For larger surfaces (cards, the logo)
 * where a big overshoot would feel bouncy rather than premium.
 */
export const SPRING_GENTLE = {
  damping: 22,
  mass: 1.1,
  stiffness: 110,
} as const;

/**
 * GLIDE — slow, heavy, almost no overshoot. For camera-like moves: parallax,
 * slow zooms, pans. Long settle = cinematic drift.
 */
export const SPRING_GLIDE = {
  damping: 40,
  mass: 1.4,
  stiffness: 60,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

type SpringConfig = {damping: number; mass: number; stiffness: number};

/**
 * springValue — a spring 0→1 progress, remapped into [from, to].
 * This is the single primitive most animations are built from.
 */
export const springValue = ({
  frame,
  fps,
  from,
  to,
  delay = 0,
  config = SPRING_ENTRANCE,
  durationInFrames,
}: {
  frame: number;
  fps: number;
  from: number;
  to: number;
  delay?: number;
  config?: SpringConfig;
  durationInFrames?: number;
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config,
    durationInFrames,
  });
  return interpolate(progress, [0, 1], [from, to]);
};

/**
 * The signature TEXT ENTRANCE: scale + fade + blur-to-focus, all driven by the
 * SAME spring so every headline in the video shares one motion identity.
 *
 * Returns a style object you can spread straight onto a text element.
 */
export const textEntrance = ({
  frame,
  fps,
  delay = 0,
  config = SPRING_ENTRANCE,
  startScale = 0.86,
  startBlur = 14, // px — the "focus pulls in" amount
  yFrom = 24, // px — subtle rise
}: {
  frame: number;
  fps: number;
  delay?: number;
  config?: SpringConfig;
  startScale?: number;
  startBlur?: number;
  yFrom?: number;
}) => {
  const p = spring({frame: frame - delay, fps, config});

  const scale = interpolate(p, [0, 1], [startScale, 1]);
  const y = interpolate(p, [0, 1], [yFrom, 0]);
  // Opacity leads the spring slightly and is linear — fades read as light.
  const opacity = interpolate(p, [0, 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Blur resolves a touch before the scale settles → "snaps into focus".
  const blur = interpolate(p, [0, 0.75], [startBlur, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return {
    opacity,
    filter: `blur(${blur}px)`,
    transform: `translateY(${y}px) scale(${scale})`,
  };
};

/**
 * exitFade — a clean linear opacity fade for scene/element exits.
 * Position exits are handled by the TransitionSeries transitions (spring-timed),
 * so this is purely for opacity, where linear is the correct choice.
 */
export const exitFade = ({
  frame,
  startAt,
  durationInFrames,
}: {
  frame: number;
  startAt: number;
  durationInFrames: number;
}) =>
  interpolate(frame, [startAt, startAt + durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
