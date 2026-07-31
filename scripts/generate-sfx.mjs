/**
 * generate-sfx.mjs — Synthesize the UI sound effects + ambient music bed.
 *
 *   node scripts/generate-sfx.mjs        (or: npm run sfx)
 *
 * Pure DSP — no network, no dependencies. Writes 16-bit WAVs into
 * public/assets/audio/ (and sfx/). These are original, tasteful placeholder
 * sounds designed to match the animation; swap for licensed audio any time by
 * replacing the files (same names) — everything is already timed.
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
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE((s * 32767) | 0, 44 + i * 2);
  }
  writeFileSync(path, buf);
}

const sec = (s) => Math.floor(s * SR);
const sine = (f, t) => Math.sin(2 * Math.PI * f * t);
const tri = (f, t) => (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * f * t));
const noise = () => Math.random() * 2 - 1;
const expDecay = (t, tau) => Math.exp(-t / tau);

// Fade the very start/end to avoid clicks.
function deClick(buf, ms = 4) {
  const f = sec(ms / 1000);
  for (let i = 0; i < f && i < buf.length; i++) {
    const g = i / f;
    buf[i] *= g;
    buf[buf.length - 1 - i] *= g;
  }
  return buf;
}

// Peak-normalize to a target ceiling.
function normalize(buf, peak = 0.8) {
  let m = 0;
  for (const s of buf) m = Math.max(m, Math.abs(s));
  if (m > 0) for (let i = 0; i < buf.length; i++) buf[i] = (buf[i] / m) * peak;
  return buf;
}

// Chamberlin state-variable band-pass (for whoosh/swipe air).
function bandpassNoise(len, fcAt, q = 3, seedGain = 1) {
  const out = new Float32Array(len);
  let low = 0, band = 0;
  for (let i = 0; i < len; i++) {
    const t = i / len;
    const fc = fcAt(t);
    const f = 2 * Math.sin((Math.PI * fc) / SR);
    const input = noise() * seedGain;
    const high = input - low - (1 / q) * band;
    band += f * high;
    low += f * band;
    out[i] = band;
  }
  return out;
}

// ── EFFECTS ──────────────────────────────────────────────────────────────────

// click — crisp UI tick: tiny transient + short high sine.
function click() {
  const len = sec(0.07);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const transient = i < sec(0.003) ? noise() * 0.6 : 0;
    const body = sine(1850, t) * expDecay(t, 0.012);
    b[i] = transient + body * 0.7;
  }
  return deClick(normalize(b, 0.6), 1);
}

// pop — soft bubble: downward pitch sweep.
function pop() {
  const len = sec(0.11);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const f = 880 - 560 * (t / (len / SR)); // 880 → 320 Hz
    b[i] = sine(f, t) * expDecay(t, 0.045);
  }
  return deClick(normalize(b, 0.6), 2);
}

// type — dry mechanical key tick.
function type() {
  const len = sec(0.045);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const tick = (i < sec(0.004) ? noise() : 0) * 0.5;
    const thock = sine(220, t) * expDecay(t, 0.01) * 0.5;
    b[i] = tick + thock;
  }
  return deClick(normalize(b, 0.45), 1);
}

// whoosh — transition air: band-passed noise sweeping up then down, swelling.
function whoosh() {
  const len = sec(0.5);
  const bp = bandpassNoise(len, (t) => 350 + 2200 * Math.sin(Math.PI * t), 2.5);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    const env = Math.sin(Math.PI * t) ** 1.4; // swell in/out
    b[i] = bp[i] * env;
  }
  return deClick(normalize(b, 0.7), 6);
}

// swipe — shorter, softer whoosh for tab/selection.
function swipe() {
  const len = sec(0.18);
  const bp = bandpassNoise(len, (t) => 500 + 1500 * t, 2);
  const b = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    b[i] = bp[i] * Math.sin(Math.PI * t);
  }
  return deClick(normalize(b, 0.5), 4);
}

// success — warm confirming chime: major arpeggio with bell decay.
function success() {
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  const len = sec(0.8);
  const b = new Float32Array(len);
  notes.forEach((f, k) => {
    const start = sec(k * 0.06);
    for (let i = start; i < len; i++) {
      const t = (i - start) / SR;
      const tone = (sine(f, t) * 0.8 + tri(f * 2, t) * 0.15) * expDecay(t, 0.32);
      b[i] += tone;
    }
  });
  return deClick(normalize(b, 0.62), 3);
}

// notify — bright two-note ding (ascending), marimba-ish.
function notify() {
  const len = sec(0.36);
  const b = new Float32Array(len);
  const seq = [[783.99, 0.0], [1046.5, 0.11]]; // G5 → C6
  seq.forEach(([f, off]) => {
    const start = sec(off);
    for (let i = start; i < len; i++) {
      const t = (i - start) / SR;
      b[i] += (sine(f, t) + 0.2 * sine(f * 2, t)) * expDecay(t, 0.11);
    }
  });
  return deClick(normalize(b, 0.6), 2);
}

// music bed — lush evolving ambient pad, seamlessly loopable (16s).
// Frequencies are snapped to multiples of 1/length so every oscillator completes
// a whole number of cycles → the loop join is click-free.
function musicBed() {
  const L = 16; // seconds
  const len = sec(L);
  const snap = (f) => Math.round(f * L) / L;
  // Two chords crossfaded over the loop (periodic): Fmaj9-ish → Cmaj9-ish.
  const chordA = [174.61, 261.63, 329.63, 392.0, 587.33].map(snap); // F A C E (low) + shimmer
  const chordB = [130.81, 196.0, 261.63, 329.63, 493.88].map(snap); // C G C E B
  const b = new Float32Array(len);
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const x = i / len; // 0..1 over the loop
    const gA = 0.5 + 0.5 * Math.cos(2 * Math.PI * x); // A dominant at ends
    const gB = 0.5 - 0.5 * Math.cos(2 * Math.PI * x); // B dominant mid
    let s = 0;
    const lfo = 0.85 + 0.15 * Math.sin(2 * Math.PI * (1 / L) * 2 * t); // slow breathing
    chordA.forEach((f, k) => {
      s += (sine(f, t) * 0.6 + tri(f, t) * 0.25) * gA * (k === 4 ? 0.25 : 1);
    });
    chordB.forEach((f, k) => {
      s += (sine(f, t) * 0.6 + tri(f, t) * 0.25) * gB * (k === 4 ? 0.25 : 1);
    });
    s *= lfo / chordA.length;
    // one-pole low-pass for warmth
    const a = 0.06;
    lp += a * (s - lp);
    b[i] = lp;
  }
  return normalize(b, 0.5); // no de-click: loop is continuous by construction
}

// ── WRITE ────────────────────────────────────────────────────────────────────
mkdirSync(resolve(AUDIO, 'sfx'), {recursive: true});
const jobs = {
  'sfx/click.wav': click(),
  'sfx/pop.wav': pop(),
  'sfx/type.wav': type(),
  'sfx/whoosh.wav': whoosh(),
  'sfx/swipe.wav': swipe(),
  'sfx/success.wav': success(),
  'sfx/notify.wav': notify(),
  'music-bed.wav': musicBed(),
};
for (const [name, buf] of Object.entries(jobs)) {
  writeWav(resolve(AUDIO, name), buf);
  console.log(`✓ ${name}  (${(buf.length / SR).toFixed(2)}s)`);
}
console.log('Done. Synthesized SFX + music bed → public/assets/audio/');
