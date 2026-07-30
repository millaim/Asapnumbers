/**
 * fonts.ts — Font loading.
 *
 * Display = Sora   (rounded geometric — matches the AsapNumbers headings/logo)
 * UI/body = Inter  (matches the dashboard body/label text)
 *
 * Loaded at module scope so glyphs are ready before the first frame renders.
 * TODO(brand): if AsapNumbers uses a specific typeface, swap via @remotion/fonts.
 *
 * NOTE: @remotion/google-fonts fetches from Google's CDN at render time. Works
 * out of the box locally; on a locked-down CI box, allowlist fonts.gstatic.com
 * or switch to a bundled local font.
 */
import {loadFont as loadSora} from '@remotion/google-fonts/Sora';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';

const sora = loadSora('normal', {weights: ['500', '600', '700', '800'], subsets: ['latin']});
const inter = loadInter('normal', {weights: ['400', '500', '600', '700'], subsets: ['latin']});

export const fontDisplay = sora.fontFamily;
export const fontUI = inter.fontFamily;
