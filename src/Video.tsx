/**
 * Video.tsx — The full film, assembled.
 *
 * Scenes are sequenced with <TransitionSeries> (the transition-aware evolution
 * of <Series>) so every scene change is a BUTTERY spring-timed cross-move —
 * never a hard cut. The global <SoundDesign/> layer (ambient bed + whooshes)
 * sits on top; per-element "pops" live inside each scene.
 *
 * All durations come from lib/timeline.ts. Change timing there, not here.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  TransitionSeries,
  springTiming,
} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';

import {DUR, TRANSITION_FRAMES} from './lib/timeline';
import {Hook} from './scenes/Hook';
import {ProductReveal} from './scenes/ProductReveal';
import {FeatureBeat} from './scenes/FeatureBeat';
import {CTA} from './scenes/CTA';
import {SoundDesign} from './components/SoundDesign';
import {features} from './content';
import {colors} from './theme';

// One shared, buttery transition timing — high damping = smooth ease, no
// mechanical linearity, no overshoot past the cut. This is the transition
// half of the video's motion signature.
const buttery = springTiming({
  config: {damping: 200},
  durationInFrames: TRANSITION_FRAMES,
});

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.bg}}>
      <TransitionSeries>
        {/* 1) HOOK */}
        <TransitionSeries.Sequence durationInFrames={DUR.hook}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={buttery} />

        {/* 2) PRODUCT REVEAL */}
        <TransitionSeries.Sequence durationInFrames={DUR.reveal}>
          <ProductReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={buttery} />

        {/* 3) FEATURE BEAT 1 */}
        <TransitionSeries.Sequence durationInFrames={DUR.feature}>
          <FeatureBeat {...features[0]} index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({direction: 'from-right'})}
          timing={buttery}
        />

        {/* 4) FEATURE BEAT 2 */}
        <TransitionSeries.Sequence durationInFrames={DUR.feature}>
          <FeatureBeat {...features[1]} index={1} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({direction: 'from-right'})}
          timing={buttery}
        />

        {/* 5) FEATURE BEAT 3 */}
        <TransitionSeries.Sequence durationInFrames={DUR.feature}>
          <FeatureBeat {...features[2]} index={2} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={buttery} />

        {/* 6) CTA / END CARD */}
        <TransitionSeries.Sequence durationInFrames={DUR.cta}>
          <CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Layered sound design spanning the whole film. */}
      <SoundDesign />
    </AbsoluteFill>
  );
};
