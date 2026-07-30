/**
 * timeline.ts — The master timing map for the whole video.
 *
 * Both the visual sequencing (src/Video.tsx) AND the sound design
 * (src/components/SoundDesign.tsx) read from here, so audio cues stay perfectly
 * locked to scene changes no matter how you retune durations.
 *
 * Because scenes cross-fade (TransitionSeries), each scene overlaps the next by
 * TRANSITION_FRAMES. The absolute start frame of each scene therefore shifts
 * earlier by the accumulated overlap — computed for you below.
 */
import {video} from '../theme';

const {fps} = video;

// ─────────────────────────────────────────────────────────────────────────────
// DURATIONS — tune these freely; everything else recomputes. (frames @ 30fps)
// ─────────────────────────────────────────────────────────────────────────────
export const DUR = {
  hook: 3 * fps, //  90 → 0–3s   Hook
  reveal: 5 * fps, // 150 → Product reveal
  feature: Math.round(5.33 * fps), // ~160 → each of 3 feature beats
  cta: 6 * fps, // 180 → CTA / end card
} as const;

/** Length of every cross-scene transition (the overlap). ~0.6s of butter. */
export const TRANSITION_FRAMES = 18;

// ─────────────────────────────────────────────────────────────────────────────
// SCENE ORDER — drives both the TransitionSeries and the timing math.
// ─────────────────────────────────────────────────────────────────────────────
export type SceneId = 'hook' | 'reveal' | 'feature1' | 'feature2' | 'feature3' | 'cta';

export const SCENE_ORDER: {id: SceneId; duration: number}[] = [
  {id: 'hook', duration: DUR.hook},
  {id: 'reveal', duration: DUR.reveal},
  {id: 'feature1', duration: DUR.feature},
  {id: 'feature2', duration: DUR.feature},
  {id: 'feature3', duration: DUR.feature},
  {id: 'cta', duration: DUR.cta},
];

/**
 * Absolute start frame of each scene, accounting for transition overlaps.
 * scene[i].start = sum(previous durations) - (i * TRANSITION_FRAMES)
 */
export const sceneStarts: Record<SceneId, number> = (() => {
  const out = {} as Record<SceneId, number>;
  let acc = 0;
  SCENE_ORDER.forEach((s, i) => {
    out[s.id] = acc - i * TRANSITION_FRAMES;
    acc += s.duration;
  });
  return out;
})();

/** Total composition length, minus every overlap. */
export const TOTAL_FRAMES =
  SCENE_ORDER.reduce((sum, s) => sum + s.duration, 0) -
  (SCENE_ORDER.length - 1) * TRANSITION_FRAMES;

/**
 * WHOOSH cue frames — centered on each scene transition. One per boundary.
 * (Every scene start after the first sits in the middle of a transition.)
 */
export const whooshFrames: number[] = SCENE_ORDER.slice(1).map(
  (s) => sceneStarts[s.id] + Math.round(TRANSITION_FRAMES / 2),
);

export {fps};
