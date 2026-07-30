/**
 * Root.tsx — Composition registry.
 *
 * • "PromoVideo" is the full ~28s film.
 * • Each scene is ALSO registered standalone so you can preview/approve them in
 *   isolation in the Remotion Studio sidebar. Start with "Hook" to sign off on
 *   the motion style before the rest is polished.
 *
 * All timing/format constants come from theme.ts and lib/timeline.ts.
 */
import React from 'react';
import {Composition} from 'remotion';
import './index.css';

import {video} from './theme';
import {DUR, TOTAL_FRAMES} from './lib/timeline';
import {PromoVideo} from './Video';
import {Hook} from './scenes/Hook';
import {ProductReveal} from './scenes/ProductReveal';
import {FeatureBeat} from './scenes/FeatureBeat';
import {CTA} from './scenes/CTA';
import {features} from './content';

const {width, height, fps} = video;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── THE FULL FILM ─────────────────────────────────────────────── */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={fps}
        width={width}
        height={height}
      />

      {/* ── STANDALONE SCENES (for isolated preview/approval) ──────────── */}
      <Composition
        id="Hook"
        component={Hook}
        durationInFrames={DUR.hook}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="ProductReveal"
        component={ProductReveal}
        durationInFrames={DUR.reveal}
        fps={fps}
        width={width}
        height={height}
      />
      {/* FeatureBeat needs props → give the preview a default via defaultProps. */}
      <Composition
        id="FeatureBeat"
        component={FeatureBeat}
        durationInFrames={DUR.feature}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{...features[0], index: 0}}
      />
      <Composition
        id="CTA"
        component={CTA}
        durationInFrames={DUR.cta}
        fps={fps}
        width={width}
        height={height}
      />
    </>
  );
};
