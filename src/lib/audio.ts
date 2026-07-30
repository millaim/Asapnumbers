/**
 * audio.ts — Central config for every sound in the video.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  SWAP-IN: point these at your real files (mp3/wav/m4a all work).      │
 * │  Currently they reference the SILENT PLACEHOLDERS in                  │
 * │  public/assets/audio/ so the project previews without errors.         │
 * └──────────────────────────────────────────────────────────────────────┘
 */
import {staticFile} from 'remotion';

export const AUDIO = {
  /** Looping pad/synth bed under the entire film. */
  ambientBed: staticFile('assets/audio/ambient-bed.wav'), // TODO(audio): ambient-bed.mp3
  /** One-shot whoosh on each scene transition. */
  whoosh: staticFile('assets/audio/whoosh.wav'), // TODO(audio): whoosh.mp3
  /** One-shot soft pop/click when text or UI lands into place. */
  pop: staticFile('assets/audio/pop.wav'), // TODO(audio): pop.mp3
} as const;

/** Master mix levels (0..1). Tune to taste once real audio is in. */
export const MIX = {
  bed: 0.35, // ambient bed sits low, underneath everything
  whoosh: 0.8,
  pop: 0.6,
} as const;

/**
 * Master switch. Set to false to preview pure motion with no audio
 * (useful while approving animation timing).
 */
export const SOUND_ENABLED = true;
