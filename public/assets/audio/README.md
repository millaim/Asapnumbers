# Audio assets

These are **silent placeholder files** so the video previews/renders without
errors. Replace them with your real sound design, then (if you change the
filenames or extensions) update the paths in **`src/lib/audio.ts`**.

| File              | Role                                            | Length      |
| ----------------- | ----------------------------------------------- | ----------- |
| `ambient-bed.wav` | Looping ambient / synth pad under the whole film | ~full video |
| `whoosh.wav`      | One-shot transition swoosh (plays each scene cut) | short (<1s) |
| `pop.wav`         | One-shot soft pop/click when elements land       | very short  |

You mentioned you'll supply `.mp3` files — just drop them in this folder and
point `src/lib/audio.ts` at them (e.g. `ambient-bed.mp3`). MP3, WAV, and M4A
all work with Remotion's `<Audio>`.
