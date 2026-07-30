/**
 * generate-vo.mjs — Generate the voice-over with ElevenLabs.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk_...  [ELEVENLABS_VOICE_ID=...]  npm run vo
 *
 * Writes one WAV per scene to public/assets/audio/vo/<sceneId>.wav — exactly the
 * paths src/lib/audio.ts expects (voPath). Requests raw PCM from ElevenLabs and
 * wraps it in a WAV header so it drops straight into Remotion with no re-encode.
 *
 * Keep VO_LINES in sync with SCRIPT in src/content.ts (kept here as plain data
 * so the script has no TypeScript/build dependency).
 */
import {writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/assets/audio/vo');

// ── VO SCRIPT (mirror of src/content.ts SCRIPT[].vo) ─────────────────────────
const VO_LINES = {
  logo: 'Welcome to AsapNumbers — your all-in-one platform for virtual numbers, digital services, and seamless online payments.',
  dashboard: 'Your dashboard gives you instant access to every feature from one central location — your wallet, virtual numbers, utilities, and quick actions.',
  fund: 'Funding your wallet is effortless. A unique virtual account is generated instantly, so you can transfer directly from your bank and get credited within seconds.',
  numbers: 'Choose your server, country, and service, then generate a virtual number within seconds — and receive your verification codes instantly.',
  // Remaining storyboard scenes (built in later passes) — VO ready to generate:
  homepage: 'Whether you need virtual numbers, airtime, data, or utility payments, AsapNumbers brings everything together in one secure platform.',
  createAccount: "Getting started is simple. Fill in your details, create your account, and you're ready to go in just a few moments.",
  login: 'Once registered, simply sign in to access your personalized dashboard.',
  utilities: 'Need everyday digital services? Buy airtime, mobile data, electricity tokens, cable subscriptions, and more — all from the same platform.',
  purchase: 'Complete your purchase in just a few taps, with fast, secure, and reliable processing.',
  outro: 'From account verification to everyday digital services, AsapNumbers makes every transaction simple, secure, and reliable.',
};

const API_KEY = process.env.ELEVENLABS_API_KEY;
// Default: "Adam" — a calm, trustworthy male VO. Swap for your chosen voice.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
const SAMPLE_RATE = 44100;

if (!API_KEY) {
  console.error('✗ Set ELEVENLABS_API_KEY (get one at https://elevenlabs.io). Optional: ELEVENLABS_VOICE_ID.');
  process.exit(1);
}

/** Wrap raw 16-bit mono PCM into a WAV container. */
function pcmToWav(pcm, rate = SAMPLE_RATE) {
  const header = Buffer.alloc(44);
  const dataLen = pcm.length;
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLen, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataLen, 40);
  return Buffer.concat([header, pcm]);
}

async function synth(id, text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=pcm_${SAMPLE_RATE}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {'xi-api-key': API_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {stability: 0.5, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true},
    }),
  });
  if (!res.ok) throw new Error(`${id}: ${res.status} ${await res.text()}`);
  const pcm = Buffer.from(await res.arrayBuffer());
  const wav = pcmToWav(pcm);
  writeFileSync(resolve(OUT, `${id}.wav`), wav);
  console.log(`✓ ${id}.wav (${(wav.length / 1024).toFixed(0)} KB)`);
}

mkdirSync(OUT, {recursive: true});
console.log(`Generating voice-over (voice ${VOICE_ID})…`);
for (const [id, text] of Object.entries(VO_LINES)) {
  try {
    await synth(id, text);
  } catch (e) {
    console.error(`✗ ${e.message}`);
  }
}
console.log('Done. Files written to public/assets/audio/vo/');
