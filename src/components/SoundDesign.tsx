/**
 * SoundDesign.tsx — Layered audio for the whole film.
 *
 *   1. Music bed   — cinematic-electronic loop, low in the mix under narration.
 *   2. Voice-over  — one clip per scene, placed at the scene's start frame.
 *   3. Whooshes    — one per scene transition (frame-locked to lib/timeline.ts).
 *   4. <Sfx/>      — per-element cues (click, pop, type, success, notify) dropped
 *                    inside scenes at exact landing frames.
 *
 * All cue timing is data-driven off the SAME timeline the visuals use.
 */
import React from 'react';
import {Audio, Sequence} from 'remotion';
import {AUDIO, MIX, SOUND_ENABLED, SfxName, voPath} from '../lib/audio';
import {whooshFrames, SCENES} from '../lib/timeline';

// Global layer — mount once at the top of the composition.
export const SoundDesign: React.FC = () => {
  if (!SOUND_ENABLED) return null;
  return (
    <>
      {/* 1) Music bed */}
      <Audio src={AUDIO.music} loop volume={MIX.music} />

      {/* 2) Per-scene voice-over (starts a beat into each scene) */}
      {SCENES.map((s) => (
        <Sequence key={`vo-${s.id}`} from={Math.max(0, s.start + 8)} name={`vo-${s.id}`}>
          <Audio src={voPath(s.id)} volume={MIX.vo} />
        </Sequence>
      ))}

      {/* 3) Soft transition swell on every cut (full length so the reverb rings) */}
      {whooshFrames.map((f, i) => (
        <Sequence key={`whoosh-${i}`} from={Math.max(0, f - 10)} name={`whoosh-${i}`}>
          <Audio src={AUDIO.sfx.whoosh} volume={MIX.whoosh} />
        </Sequence>
      ))}
    </>
  );
};

/**
 * <Sfx/> — one-shot effect at a scene-relative frame.
 * Usage inside a scene:  <Sfx name="click" at={40} />
 */
export const Sfx: React.FC<{name: SfxName; at: number; volume?: number}> = ({name, at, volume}) => {
  if (!SOUND_ENABLED) return null;
  // No duration cap → each one-shot plays its full natural length (incl. reverb tail).
  return (
    <Sequence from={at} name={`sfx-${name}`}>
      <Audio src={AUDIO.sfx[name]} volume={volume ?? MIX[name]} />
    </Sequence>
  );
};
