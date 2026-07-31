/**
 * Root.tsx — Composition registry.
 *
 * • "PromoVideo" is the full film (eight scenes, in narrative order).
 * • Each scene is ALSO registered standalone for isolated preview/approval.
 *
 * Format: VERTICAL 1080×1920 @ 60fps. A landscape 1920×1080 variant will be
 * added by registering the same scenes at that size with the landscape layout.
 */
import React from 'react';
import {Composition} from 'remotion';
import './index.css';

import {video} from './theme';
import {durationOf, TOTAL_FRAMES} from './lib/timeline';
import {PromoVideo} from './Video';
import {LogoReveal} from './scenes/LogoReveal';
import {Homepage} from './scenes/Homepage';
import {CreateAccount} from './scenes/CreateAccount';
import {Login} from './scenes/Login';
import {Dashboard} from './scenes/Dashboard';
import {FundWallet} from './scenes/FundWallet';
import {VirtualNumbers} from './scenes/VirtualNumbers';
import {Outro} from './scenes/Outro';

const {width, height, fps} = video;

// compositionId → timeline scene id
const MAP: Record<string, {id: string; component: React.FC}> = {
  LogoReveal: {id: 'logo', component: LogoReveal},
  Homepage: {id: 'homepage', component: Homepage},
  CreateAccount: {id: 'createAccount', component: CreateAccount},
  Login: {id: 'login', component: Login},
  Dashboard: {id: 'dashboard', component: Dashboard},
  FundWallet: {id: 'fund', component: FundWallet},
  VirtualNumbers: {id: 'numbers', component: VirtualNumbers},
  Outro: {id: 'outro', component: Outro},
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="PromoVideo" component={PromoVideo} durationInFrames={TOTAL_FRAMES} fps={fps} width={width} height={height} />
    {Object.entries(MAP).map(([compId, {id, component}]) => (
      <Composition key={compId} id={compId} component={component} durationInFrames={durationOf(id)} fps={fps} width={width} height={height} />
    ))}
  </>
);
