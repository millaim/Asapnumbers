/**
 * Root.tsx — Composition registry.
 *
 * • "PromoVideo" is the full film (four flagship scenes this pass).
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
import {Dashboard} from './scenes/Dashboard';
import {FundWallet} from './scenes/FundWallet';
import {VirtualNumbers} from './scenes/VirtualNumbers';

const {width, height, fps} = video;

export const RemotionRoot: React.FC = () => {
  const scene = (id: string, component: React.FC) => (
    <Composition id={id} component={component} durationInFrames={durationOf(idFor(id))} fps={fps} width={width} height={height} />
  );
  return (
    <>
      <Composition id="PromoVideo" component={PromoVideo} durationInFrames={TOTAL_FRAMES} fps={fps} width={width} height={height} />
      {scene('LogoReveal', LogoReveal)}
      {scene('Dashboard', Dashboard)}
      {scene('FundWallet', FundWallet)}
      {scene('VirtualNumbers', VirtualNumbers)}
    </>
  );
};

// Map composition id → timeline scene id.
function idFor(compId: string) {
  return {LogoReveal: 'logo', Dashboard: 'dashboard', FundWallet: 'fund', VirtualNumbers: 'numbers'}[compId] ?? 'logo';
}
