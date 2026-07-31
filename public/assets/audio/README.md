# Audio assets

## Sound effects + music — DONE (synthesized)

`music-bed.wav` and everything in `sfx/` are **real, original sounds** generated
by `scripts/generate-sfx.mjs` (pure DSP — clicks, pops, whoosh, chimes, a
notification ding, and a 16s loopable ambient pad). They're already placed on the
right animation frames.

- Re-generate any time: `npm run sfx`
- Prefer your own licensed audio? Just replace the files (keep the names), or
  point `src/lib/audio.ts` at new paths. Tune loudness in `MIX` there.

```
music-bed.wav          ← ambient pad, loops under the whole film (low in the mix)
sfx/whoosh.wav         ← scene-transition swoosh (automatic, one per cut)
sfx/click.wav          ← cursor clicks a button
sfx/pop.wav            ← a card / tile lands into place
sfx/type.wav           ← form fields typing
sfx/success.wav        ← success chime (logo land, purchase, sign-in)
sfx/notify.wav         ← notification / OTP pop
sfx/swipe.wav          ← tab / selection swipe
```

## Voice-over — needs one command (ElevenLabs)

`vo/*.wav` are still silent placeholders. Real natural narration needs a TTS
service, so generate it with your ElevenLabs key:

```bash
ELEVENLABS_API_KEY=sk_...  npm run vo
```

That fills `vo/logo.wav`, `vo/homepage.wav`, `vo/createAccount.wav`, … from the
script in `src/content.ts`. (Any TTS works — just drop `vo/<sceneId>.wav` files
in and they'll play automatically.)
