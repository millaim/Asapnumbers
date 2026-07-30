/**
 * Video.tsx — The full film, assembled.
 *
 * Scenes are sequenced with <TransitionSeries> (transition-aware <Series>) so
 * every scene change is a buttery, spring-timed cross-move — never a hard cut.
 * The global <SoundDesign/> layer (music + VO + whooshes) sits on top.
 *
 * Durations come from lib/timeline.ts (derived from the VO script in content.ts).
 * This pass sequences the four flagship scenes; the remaining storyboard scenes
 * slot in here as they're built.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';

import {durationOf, TRANSITION_FRAMES} from './lib/timeline';
import {colors} from './theme';
import {LogoReveal} from './scenes/LogoReveal';
import {Dashboard} from './scenes/Dashboard';
import {FundWallet} from './scenes/FundWallet';
import {VirtualNumbers} from './scenes/VirtualNumbers';
import {SoundDesign} from './components/SoundDesign';

const buttery = springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES});

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.bg}}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={durationOf('logo')}>
          <LogoReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={buttery} />

        <TransitionSeries.Sequence durationInFrames={durationOf('dashboard')}>
          <Dashboard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={buttery} />

        <TransitionSeries.Sequence durationInFrames={durationOf('fund')}>
          <FundWallet />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={buttery} />

        <TransitionSeries.Sequence durationInFrames={durationOf('numbers')}>
          <VirtualNumbers />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <SoundDesign />
    </AbsoluteFill>
  );
};
