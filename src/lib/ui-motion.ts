/**
 * ui-motion.ts — Component-level motion helpers built on the shared signature in
 * motion.ts. These give every UI element in the recreated interface the same
 * "alive" feel: spring pop-ins, staggered reveals, and a cursor that eases
 * between waypoints and clicks.
 */
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {SPRING_ENTRANCE, SPRING_GENTLE} from './motion';

type Cfg = {damping: number; mass: number; stiffness: number};

/** Generic element entrance: fade + rise + slight scale settle. */
export const useEnter = (delay = 0, opts?: {y?: number; scaleFrom?: number; config?: Cfg}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: opts?.config ?? SPRING_GENTLE});
  const y = interpolate(p, [0, 1], [opts?.y ?? 26, 0]);
  const scale = interpolate(p, [0, 1], [opts?.scaleFrom ?? 0.96, 1]);
  const opacity = interpolate(p, [0, 0.6], [0, 1], {extrapolateRight: 'clamp'});
  return {opacity, transform: `translateY(${y}px) scale(${scale})`};
};

/** A scale-pop with overshoot — for tiles/cards/buttons landing into place. */
export const usePop = (delay = 0, config: Cfg = SPRING_ENTRANCE) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config});
  return {
    scale: interpolate(p, [0, 1], [0.9, 1]),
    opacity: interpolate(p, [0, 0.55], [0, 1], {extrapolateRight: 'clamp'}),
  };
};

/** Stagger helper: nth item's delay. */
export const stagger = (index: number, step = 5, base = 0) => base + index * step;

/**
 * useButtonPress — a quick press-in/settle used when the cursor "clicks" a
 * button at `atFrame`. Returns a scale you multiply onto the button.
 */
export const useButtonPress = (atFrame: number) => {
  const frame = useCurrentFrame();
  if (frame < atFrame) return 1;
  const t = frame - atFrame;
  // down for 5 frames, spring back
  return interpolate(t, [0, 4, 12], [1, 0.94, 1], {extrapolateRight: 'clamp'});
};

/**
 * useTyped — reveals `text` character-by-character from `startFrame`, returning
 * the shown substring, a blinking caret flag, and whether typing is active
 * (so callers can fire a typing SFX). `framesPerChar` controls speed.
 */
export const useTyped = (text: string, startFrame: number, framesPerChar = 2) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;
  const count = Math.max(0, Math.min(text.length, Math.floor(elapsed / framesPerChar)));
  const typing = elapsed >= 0 && count < text.length;
  const done = count >= text.length;
  // Caret blinks while focused (typing or just finished).
  const caret = elapsed >= 0 && Math.floor(frame / 18) % 2 === 0;
  return {shown: text.slice(0, count), typing, done, caret, started: elapsed >= 0};
};

export type Waypoint = {frame: number; x: number; y: number; click?: boolean};

/**
 * useCursor — eases a virtual cursor between waypoints (smoothstep between each
 * pair, never linear) and reports a click pulse. Coordinates are in canvas px.
 */
export const useCursor = (waypoints: Waypoint[]) => {
  const frame = useCurrentFrame();
  if (waypoints.length === 0) return {x: 0, y: 0, clickPulse: 0, visible: false};

  // Find the segment we're in.
  let a = waypoints[0];
  let b = waypoints[waypoints.length - 1];
  for (let i = 0; i < waypoints.length - 1; i++) {
    if (frame >= waypoints[i].frame && frame <= waypoints[i + 1].frame) {
      a = waypoints[i];
      b = waypoints[i + 1];
      break;
    }
  }
  if (frame <= waypoints[0].frame) {
    a = b = waypoints[0];
  } else if (frame >= waypoints[waypoints.length - 1].frame) {
    a = b = waypoints[waypoints.length - 1];
  }

  const span = Math.max(1, b.frame - a.frame);
  const raw = interpolate(frame, [a.frame, a.frame + span], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Smoothstep easing → soft accel/decel, cursor "arrives" gently.
  const e = raw * raw * (3 - 2 * raw);
  const x = a.x + (b.x - a.x) * e;
  const y = a.y + (b.y - a.y) * e;

  // Click pulse: any waypoint flagged click emits a short ring at its frame.
  let clickPulse = 0;
  for (const w of waypoints) {
    if (w.click) {
      const dt = frame - w.frame;
      if (dt >= 0 && dt <= 18) {
        clickPulse = Math.max(clickPulse, interpolate(dt, [0, 18], [1, 0]));
      }
    }
  }
  return {x, y, clickPulse, visible: true};
};
