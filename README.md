# NumberAsap — Promo Video (Remotion)

An Apple-keynote-style product promo (~28s, 1920×1080, 30fps): cinematic, dark,
generous negative space, spring-based "buttery" motion, and layered sound design.

> **Brand copy & colors are PLACEHOLDERS.** The live site (numberasap.com) was
> unreachable from the build environment, so all copy/colors are tasteful
> stand-ins. Every place to swap real brand assets is commented with a
> `TODO(brand)` or `TODO(audio)` marker.

## Preview

```bash
npm i
npm run dev        # opens Remotion Studio
```

In the Studio sidebar you'll find the full **`PromoVideo`** plus each scene
registered standalone (**`Hook`**, `ProductReveal`, `FeatureBeat`, `CTA`) so you
can preview/approve them in isolation. Start with **`Hook`** — it's the fully
built motion reference; the other scenes are working-but-WIP placeholders.

## Render

```bash
npx remotion render PromoVideo out/promo.mp4
```

## Project structure

```
src/
  theme.ts              ← colors, fonts, spacing, format   ★ swap brand colors here
  content.ts            ← ALL on-screen copy               ★ swap brand copy here
  Root.tsx              ← composition registry
  Video.tsx             ← full film: TransitionSeries + sound
  lib/
    motion.ts           ← the shared MOTION SIGNATURE (spring configs + entrances)
    timeline.ts         ← scene durations + audio-cue frames (single source of timing)
    fonts.ts            ← font loading (Inter as SF-Pro stand-in)  ★ swap font here
    audio.ts            ← audio file paths + mix levels    ★ point at real audio here
  components/
    Background.tsx      ← deep gradient + drifting glow + vignette
    AnimatedText.tsx    ← the one text-entrance component (shared feel)
    Logo.tsx            ← ★ placeholder logo — replace with real asset
    Icon.tsx            ← feature icons
    SoundDesign.tsx     ← ambient bed + whooshes + <Pop/> + audio-reactive hook
  scenes/
    Hook.tsx            ← ★ FULLY BUILT (approve this first)
    ProductReveal.tsx   ← WIP placeholder (registered & timed)
    FeatureBeat.tsx     ← reusable / data-driven (used ×3)
    CTA.tsx             ← WIP placeholder (registered & timed)
public/assets/
  audio/                ← ★ silent placeholder sounds — drop real files here
```

## Where to swap real assets

| What            | File                                        |
| --------------- | ------------------------------------------- |
| Brand colors    | `src/theme.ts` (`TODO(brand)`)              |
| Copy / script   | `src/content.ts`                            |
| Logo            | `src/components/Logo.tsx`                    |
| Fonts           | `src/lib/fonts.ts` + `src/theme.ts`         |
| Audio files     | `public/assets/audio/` + `src/lib/audio.ts` |
| Screenshots     | `src/scenes/FeatureBeat.tsx` (`MockupCard`) |

## Motion & sound design notes

- **Motion signature** lives entirely in `src/lib/motion.ts`. Every entrance is
  `spring()`-driven (scale + fade + blur-to-focus, slight overshoot/settle).
  Linear `interpolate()` is used only for opacity fades. Retune the whole film's
  feel by editing the spring configs there.
- **Transitions** between scenes use `@remotion/transitions` `TransitionSeries`
  with a high-damping `springTiming` (buttery cross-fades / slides, no hard cuts).
- **Sound** is data-driven off `src/lib/timeline.ts`: ambient bed (full length),
  a whoosh centered on every scene cut, and per-element `<Pop/>` clicks placed at
  each landing frame. `useAmbientPulse()` (via `useAudioData`) is available for
  audio-reactive glow once real audio is added.

## Note on headless rendering (CI / servers)

`@remotion/google-fonts` fetches Inter from Google's CDN at render time. On a
locked-down machine that can't reach `fonts.gstatic.com` (or where the CDN cert
isn't trusted), either allowlist that host, or switch `src/lib/fonts.ts` to a
local font via `@remotion/fonts`. On your own machine, `npm run dev` and normal
renders work out of the box.
