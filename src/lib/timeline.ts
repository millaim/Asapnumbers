/**
 * timeline.ts — Master timing map. Derived from the VO script so audio, captions
 * and visuals all share ONE set of frame numbers. Change durations in content.ts
 * (SCRIPT[].seconds) and everything downstream recomputes.
 */
import {video} from '../theme';
import {BUILT_SCRIPT} from '../content';

const {fps} = video;

/** Cross-scene transition length (the overlap). ~0.4s of butter @ 60fps. */
export const TRANSITION_FRAMES = 24;

export type SceneTiming = {
  id: string;
  duration: number; // frames
  start: number; // absolute start frame (accounting for transition overlaps)
};

/** Per-scene duration in frames, from the script's seconds. */
export const SCENES: SceneTiming[] = (() => {
  let acc = 0;
  return BUILT_SCRIPT.map((s, i) => {
    const duration = Math.round(s.seconds * fps);
    const start = acc - i * TRANSITION_FRAMES;
    acc += duration;
    return {id: s.id, duration, start};
  });
})();

export const durationOf = (id: string) =>
  SCENES.find((s) => s.id === id)?.duration ?? Math.round(4 * fps);

/** Total composition length, minus every overlap. */
export const TOTAL_FRAMES =
  SCENES.reduce((sum, s) => sum + s.duration, 0) - (SCENES.length - 1) * TRANSITION_FRAMES;

/** Whoosh cue frames — centered on each scene transition (one per boundary). */
export const whooshFrames: number[] = SCENES.slice(1).map(
  (s) => s.start + Math.round(TRANSITION_FRAMES / 2),
);

export {fps};
