/**
 * fonts.ts — Font loading.
 *
 * Inter is used as a stand-in for Apple's SF Pro (the closest freely-available
 * match for the keynote look). It loads a wide weight range so we can use
 * heavy display weights and lighter body weights.
 *
 * TODO(brand): If NumberAsap ships its own typeface, replace this with
 * @remotion/fonts loadFont() pointing at the brand's .woff2 files, and update
 * `fonts.display` / `fonts.body` in theme.ts to the returned family name.
 */
import {loadFont} from '@remotion/google-fonts/Inter';

// Loading at module scope ensures the font is registered before any frame
// renders (Remotion delays rendering until the returned promise resolves).
const {fontFamily} = loadFont('normal', {
  weights: ['400', '500', '700', '800'],
  subsets: ['latin'],
});

export const fontFamily_display = fontFamily;
export const fontFamily_body = fontFamily;
