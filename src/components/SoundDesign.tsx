/**
 * SoundDesign.tsx — The layered audio for the whole video.
 *
 * Three layers, exactly as briefed:
 *   1. Ambient bed  — a low synth pad looping under the entire film.
 *   2. Whoosh       — a one-shot on every scene transition, frame-locked to the
 *                     timeline in lib/timeline.ts (so it always matches the cut).
 *   3. Pop          — a soft click when text/UI lands; dropped into scenes at the
 *                     exact landing frame via the <Pop/> component below.
 *
 * All cue timing is data-driven off the SAME timeline the visuals use, so audio
 * stays locked to motion no matter how you retune durations.
 */
import React from 'react';
import {Audio, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {useAudioData, visualizeAudio} from '@remotion/media-utils';
import {AUDIO, MIX, SOUND_ENABLED} from '../lib/audio';
import {whooshFrames, TOTAL_FRAMES} from '../lib/timeline';

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL SOUND LAYER — mount once at the top of the composition.
// ─────────────────────────────────────────────────────────────────────────────
export const SoundDesign: React.FC = () => {
  if (!SOUND_ENABLED) return null;
  return (
    <>
      {/* 1) Ambient bed: loops for the whole film, sitting low in the mix. */}
      <Audio src={AUDIO.ambientBed} loop volume={MIX.bed} />

      {/* 2) Whoosh on every transition. Started a few frames early so the
             swell peaks ON the cut. */}
      {whooshFrames.map((f, i) => (
        <Sequence key={`whoosh-${i}`} from={Math.max(0, f - 6)} durationInFrames={40} name={`whoosh-${i}`}>
          <Audio src={AUDIO.whoosh} volume={MIX.whoosh} />
        </Sequence>
      ))}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// <Pop/> — a one-shot "element landed" click. Drop it inside a scene with the
// frame (relative to that scene) at which the element settles.
// Usage:  <Pop at={18} />   // pop 18 frames into the scene
// ─────────────────────────────────────────────────────────────────────────────
export const Pop: React.FC<{at: number; volume?: number}> = ({at, volume = MIX.pop}) => {
  if (!SOUND_ENABLED) return null;
  return (
    <Sequence from={at} durationInFrames={20} name="pop">
      <Audio src={AUDIO.pop} volume={volume} />
    </Sequence>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// useAmbientPulse — OPTIONAL audio-reactive accent.
// Reads the ambient bed's amplitude via useAudioData()/visualizeAudio() and
// returns a 0..1 value you can map onto a glow's opacity/scale so lighting
// "breathes" with the music. Returns 0 until real (non-silent) audio is added.
// ─────────────────────────────────────────────────────────────────────────────
export const useAmbientPulse = (): number => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const audioData = useAudioData(AUDIO.ambientBed);
  if (!audioData) return 0;
  const [low] = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 4, // just the low end → a slow "breathing" pulse
  });
  return low ?? 0;
};

// Guard: keep TOTAL_FRAMES referenced so the bed length assumption is documented.
export const AUDIO_BED_LENGTH = TOTAL_FRAMES;
