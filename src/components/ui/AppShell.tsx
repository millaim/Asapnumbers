/**
 * AppShell.tsx — The app viewport: Sidebar + a content column (TopBar + page).
 * Scenes render their page UI as children so every screen shares one frame.
 */
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, spacing, type} from '../../theme';
import {fontDisplay} from '../../lib/fonts';
import {Sidebar} from './Sidebar';
import {useEnter} from '../../lib/ui-motion';

export const TopBar: React.FC<{title: string; right?: React.ReactNode; delay?: number}> = ({
  title,
  right,
  delay = 0,
}) => (
  <div
    style={{
      ...useEnter(delay, {y: 8}),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${spacing.md}px ${spacing.lg}px`,
      borderBottom: `1px solid ${colors.surfaceBorder}`,
    }}
  >
    <div style={{fontFamily: fontDisplay, fontWeight: type.weightSemi, fontSize: type.subtitle, color: colors.textPrimary}}>
      {title}
    </div>
    <div style={{display: 'flex', gap: 12}}>{right}</div>
  </div>
);

export const AppShell: React.FC<{
  activeId: string;
  title: string;
  topRight?: React.ReactNode;
  sidebarAnimateFrom?: number;
  topBarDelay?: number;
  children: React.ReactNode;
}> = ({activeId, title, topRight, sidebarAnimateFrom = 0, topBarDelay = 0, children}) => (
  <AbsoluteFill style={{background: colors.bg, flexDirection: 'row'}}>
    <Sidebar activeId={activeId} animateFrom={sidebarAnimateFrom} />
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
      <TopBar title={title} right={topRight} delay={topBarDelay} />
      <div style={{flex: 1, padding: spacing.lg, minWidth: 0}}>{children}</div>
    </div>
  </AbsoluteFill>
);
