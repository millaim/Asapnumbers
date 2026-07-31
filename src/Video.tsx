/**
 * Video.tsx — The full film, assembled in narrative order.
 *
 * Scenes are sequenced with <TransitionSeries> (transition-aware <Series>) so
 * every scene change is a buttery, spring-timed cross-move — never a hard cut.
 * The global <SoundDesign/> layer (music + VO + whooshes) sits on top.
 *
 * Order & durations come from content.ts (BUILT_SCRIPT) via lib/timeline.ts.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';

import {durationOf, TRANSITION_FRAMES} from './lib/timeline';
import {colors} from './theme';
import {LogoReveal} from './scenes/LogoReveal';
import {Homepage} from './scenes/Homepage';
import {CreateAccount} from './scenes/CreateAccount';
import {Login} from './scenes/Login';
import {Dashboard} from './scenes/Dashboard';
import {FundWallet} from './scenes/FundWallet';
import {VirtualNumbers} from './scenes/VirtualNumbers';
import {Outro} from './scenes/Outro';
import {SoundDesign} from './components/SoundDesign';

const buttery = springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES});
const slideR = () => slide({direction: 'from-right'});

// Scene sequence: [timelineId, component, transition-into-next]
const FLOW: [string, React.FC, 'fade' | 'slide' | null][] = [
  ['logo', LogoReveal, 'fade'],
  ['homepage', Homepage, 'slide'],
  ['createAccount', CreateAccount, 'slide'],
  ['login', Login, 'fade'],
  ['dashboard', Dashboard, 'slide'],
  ['fund', FundWallet, 'slide'],
  ['numbers', VirtualNumbers, 'fade'],
  ['outro', Outro, null],
];

export const PromoVideo: React.FC = () => {
  // Flatten into direct Sequence/Transition children (TransitionSeries requires it).
  const items: React.ReactNode[] = [];
  FLOW.forEach(([id, Comp, trans]) => {
    items.push(
      <TransitionSeries.Sequence key={`seq-${id}`} durationInFrames={durationOf(id)}>
        <Comp />
      </TransitionSeries.Sequence>,
    );
    if (trans) {
      items.push(
        <TransitionSeries.Transition
          key={`trans-${id}`}
          presentation={trans === 'slide' ? slideR() : fade()}
          timing={buttery}
        />,
      );
    }
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg}}>
      <TransitionSeries>{items}</TransitionSeries>
      <SoundDesign />
    </AbsoluteFill>
  );
};
