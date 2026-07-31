/**
 * generate-sfx.mjs — Synthesize the UI sound effects + ambient music bed.
 *
 *   node scripts/generate-sfx.mjs        (or: npm run sfx)
 *
 * Pure DSP — no network, no dependencies. Writes 16-bit WAVs into
 * public/assets/audio/ (and sfx/). Original, tasteful sounds designed to match
 * the animation; swap for licensed audio any time by replacing the files.
 *
 * v2 — warmer/softer palette:
 *   • transition = airy brown-noise swell + gentle tonal glide + reverb (no hiss)
 *   • chimes/notify/impact/shimmer run through a light Schroeder reverb
 *   • music bed = warm 4-chord progression (Cadd9–G–Am7–Fmaj7) with pad, sub
 *     bass and a soft arpeggio, seamlessly loopable.
 */
import {writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AUDIO = resolve(__dirname, '../public/assets/audio');
const SR = 44100;

// ── WAV writer (mono, 16-bit) ────────────────────────────────────────────────
function writeWav(path, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE((s * 32767) | 0, 44 + i * 2);
  }
  writeFileSync(path, buf);
}

// ── primitives ───────────────────────────────────────────────────────────────
const sec = (s) => Math.floor(s * SR);
const sine = (f, t) => Math.sin(2 * Math.PI * f * t);
const tri = (f, t) => (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * f * t));
const expDecay = (t, tau) => Math.exp(-t / tau);
const smooth = (x) => x * x * (3 - 2 * x); // smoothstep

// brown noise = integrated white noise (soft, round — no harsh hiss)
function brownNoise(n) {
  const out = new Float32Array(n);
  let last = 0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02;
    out[i] = last * 12;
  }
  return out;
}

function deClick(buf, ms = 4) {
  const f = sec(ms / 1000);
  for (let i = 0; i < f && i < buf.length; i++) {
    const g = i / f;
    buf[i] *= g;
    buf[buf.length - 1 - i] *= g;
  }
  return buf;
}
function normalize(buf, peak = 0.8) {
  let m = 0;
  for (const s of buf) m = Math.max(m, Math.abs(s));
  if (m > 0) for (let i = 0; i < buf.length; i++) buf[i] = (buf[i] / m) * peak;
  return buf;
}

// ── Schroeder reverb (4 damped combs + 2 allpass) — for polish/tails ─────────
function reverb(dry, {mix = 0.25, feedback = 0.8, damp = 0.35, tail = 1.4} = {}) {
  const combLen = [1557, 1617, 1491, 1422];
  const apLen = [556, 441];
  const combs = combLen.map((d) => ({buf: new Float32Array(d), i: 0, store: 0}));
  const aps = apLen.map((d) => ({buf: new Float32Array(d), i: 0}));
  const out = new Float32Array(dry.length + sec(tail));
  for (let n = 0; n < out.length; n++) {
    const x = n < dry.length ? dry[n] : 0;
    let y = 0;
    for (const c of combs) {
      const o = c.buf[c.i];
      c.store = o * (1 - damp) + c.store * damp;
      c.buf[c.i] = x + c.store * feedback;
      c.i = (c.i + 1) % c.buf.length;
      y += o;
    }
    y /= combs.length;
    for (const a of aps) {
      const bufOut = a.buf[a.i];
      const o = -y + bufOut;
      a.buf[a.i] = y + bufOut * 0.5;
      a.i = (a.i + 1) % a.buf.length;
      y = o;
    }
    out[n] = x * (1 - mix) + y * mix;
  }
  return out;
}

// ═══════════════════════════════ EFFECTS ════════════════════════════════════

// transition — soft, pleasing "swell": airy brown noise opening through a
// low-pass, plus a gentle tonal glide up, with a light reverb tail. No hiss.
function transition() {
  const len = sec(0.6);
  const bn = brownNoise(len);
  let lp = 0;
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    const tt = i / SR;
    // low-pass whose cutoff opens then closes → "air moving past"
    const cut = 0.02 + 0.10 * Math.sin(Math.PI * t);
    lp += cut * (bn[i] - lp);
    const env = Math.sin(Math.PI * t) ** 1.5;
    // warm tonal glide (soft sine up a fifth) for musicality
    const glideF = 220 + 160 * smooth(t);
    const tone = (sine(glideF, tt) * 0.5 + sine(glideF * 1.5, tt) * 0.2) * env * 0.35;
    b[i] = lp * env * 0.9 + tone;
  }
  return deClick(normalize(reverb(b, {mix: 0.22, feedback: 0.75, tail: 1.0}), 0.62), 8);
}

// swipe — quick soft airy motion for tab/selection.
function swipe() {
  const len = sec(0.16);
  const bn = brownNoise(len);
  let lp = 0;
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    lp += (0.05 + 0.12 * t) * (bn[i] - lp);
    b[i] = lp * Math.sin(Math.PI * t);
  }
  return deClick(normalize(b, 0.5), 4);
}

// click — clean, tuned UI tick (soft, not harsh).
function click() {
  const len = sec(0.05);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const body = (sine(1200, t) * 0.7 + sine(2400, t) * 0.25) * expDecay(t, 0.008);
    const tick = i < sec(0.0015) ? (Math.random() * 2 - 1) * 0.25 : 0;
    b[i] = body + tick;
  }
  return deClick(normalize(b, 0.5), 1);
}

// pop — round UI bubble.
function pop() {
  const len = sec(0.1);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = 700 - 380 * (i / len);
    b[i] = (sine(f, t) + 0.25 * sine(2 * f, t)) * expDecay(t, 0.05);
  }
  return deClick(normalize(b, 0.55), 2);
}

// type — soft mechanical key tick.
function type() {
  const len = sec(0.04);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const tick = (i < sec(0.003) ? Math.random() * 2 - 1 : 0) * 0.4;
    const thock = sine(240, t) * expDecay(t, 0.009) * 0.4;
    b[i] = tick + thock;
  }
  return deClick(normalize(b, 0.4), 1);
}

// bell timbre: fundamental + inharmonic-ish partials with faster-decaying highs.
function bell(freq, t) {
  return (
    sine(freq, t) * expDecay(t, 0.34) +
    0.5 * sine(freq * 2.0, t) * expDecay(t, 0.18) +
    0.25 * sine(freq * 3.0, t) * expDecay(t, 0.1)
  );
}

// success — warm resolving chime (major arpeggio) with reverb.
function success() {
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  const len = sec(0.9);
  const b = new Float32Array(len);
  notes.forEach((f, k) => {
    const s0 = sec(k * 0.07);
    for (let i = s0; i < len; i++) b[i] += bell(f, (i - s0) / SR) * 0.8;
  });
  return deClick(normalize(reverb(b, {mix: 0.26, tail: 1.4}), 0.6), 3);
}

// notify — pleasant ascending two-note bell (OTP / toast).
function notify() {
  const seq = [[659.25, 0.0], [987.77, 0.1]]; // E5 → B5
  const len = sec(0.5);
  const b = new Float32Array(len);
  seq.forEach(([f, off]) => {
    const s0 = sec(off);
    for (let i = s0; i < len; i++) b[i] += bell(f, (i - s0) / SR) * 0.85;
  });
  return deClick(normalize(reverb(b, {mix: 0.24, tail: 1.2}), 0.58), 2);
}

// impact — soft weighted thud for the logo/large element landing.
function impact() {
  const len = sec(0.5);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = 120 - 60 * smooth(Math.min(1, t / 0.12)); // quick pitch drop
    const body = sine(f, t) * expDecay(t, 0.16);
    const knock = i < sec(0.004) ? (Math.random() * 2 - 1) * 0.3 : 0;
    b[i] = body + knock;
  }
  return deClick(normalize(reverb(b, {mix: 0.18, tail: 0.8}), 0.7), 3);
}

// shimmer — high sparkle for the outro CTA.
function shimmer() {
  const parts = [1568, 2093, 2637, 3136];
  const len = sec(1.0);
  const b = new Float32Array(len);
  parts.forEach((f, k) => {
    const s0 = sec(k * 0.05);
    for (let i = s0; i < len; i++) {
      const t = (i - s0) / SR;
      b[i] += sine(f, t) * expDecay(t, 0.4) * (0.5 - k * 0.08);
    }
  });
  return deClick(normalize(reverb(b, {mix: 0.3, tail: 1.4}), 0.42), 3);
}

// ── music bed — warm progression, seamlessly loopable (16s = 4 bars) ─────────
function musicBed() {
  const L = 16, BAR = 4, len = sec(L);
  const snap = (f) => Math.round(f * L) / L; // whole cycles per loop → click-free
  // Cadd9 – G – Am7 – Fmaj7 (I–V–vi–IV, lush)
  const chords = [
    [130.81, 196.0, 261.63, 329.63, 587.33], // C add9 (+D shimmer up top)
    [196.0, 246.94, 392.0, 587.33, 0],        // G
    [220.0, 261.63, 329.63, 392.0, 0],        // Am7
    [174.61, 261.63, 349.23, 440.0, 0],       // Fmaj7
  ].map((c) => c.filter(Boolean).map(snap));
  const roots = [65.41, 98.0, 110.0, 87.31].map(snap); // sub bass per bar

  const b = new Float32Array(len);
  const barSamp = sec(BAR);
  const fade = sec(0.5);

  // pad + bass with circular crossfades at bar boundaries
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const bar = Math.floor(i / barSamp) % 4;
    const local = i - bar * barSamp;
    const gCur = local < fade ? smooth(local / fade) : 1;
    const prev = (bar + 3) % 4;
    const gPrev = local < fade ? 1 - smooth(local / fade) : 0;

    const padOf = (ci, g) => {
      if (g <= 0) return 0;
      let s = 0;
      for (const f of chords[ci]) s += (sine(f, t) * 0.6 + tri(f * 1.003, t) * 0.2);
      return (s / chords[ci].length) * g;
    };
    let s = padOf(bar, gCur) + padOf(prev, gPrev);
    // sub bass
    s += (sine(roots[bar], t) * gCur + sine(roots[prev], t) * gPrev) * 0.5;
    // slow breathing
    s *= 0.85 + 0.15 * Math.sin(2 * Math.PI * (1 / L) * t);
    // warm low-pass
    lp += 0.08 * (s - lp);
    b[i] = lp * 0.8;
  }

  // gentle arpeggio (soft plucks, up pattern, 8 per bar)
  const step = sec(BAR / 8);
  for (let bar = 0; bar < 4; bar++) {
    const tones = chords[bar].filter((f) => f >= 196 && f <= 700);
    for (let k = 0; k < 8; k++) {
      const start = bar * barSamp + k * step;
      const f = tones[k % tones.length];
      const end = Math.min(len, start + sec(0.5));
      for (let i = start; i < end; i++) {
        const tt = (i - start) / SR;
        b[i] += (sine(f, tt) + 0.3 * sine(2 * f, tt)) * expDecay(tt, 0.16) * 0.16;
      }
    }
  }
  return normalize(b, 0.5); // continuous by construction → no de-click
}

// ── WRITE ────────────────────────────────────────────────────────────────────
mkdirSync(resolve(AUDIO, 'sfx'), {recursive: true});
const jobs = {
  'sfx/whoosh.wav': transition(), // filename kept; content is now the soft swell
  'sfx/swipe.wav': swipe(),
  'sfx/click.wav': click(),
  'sfx/pop.wav': pop(),
  'sfx/type.wav': type(),
  'sfx/success.wav': success(),
  'sfx/notify.wav': notify(),
  'sfx/impact.wav': impact(),
  'sfx/shimmer.wav': shimmer(),
  'music-bed.wav': musicBed(),
};
for (const [name, buf] of Object.entries(jobs)) {
  writeWav(resolve(AUDIO, name), buf);
  console.log(`✓ ${name}  (${(buf.length / SR).toFixed(2)}s)`);
}
console.log('Done. Synthesized SFX + music bed → public/assets/audio/');
