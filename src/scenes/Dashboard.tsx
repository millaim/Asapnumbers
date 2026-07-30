/**
 * Dashboard.tsx — Scene 5 (flagship). The real AsapNumbers dashboard rebuilt as
 * live UI: sidebar, wallet card, quick tiles, quick-action grid, recent
 * transactions — each element animates in with staggered spring motion, over a
 * slow camera push-in. Nothing is a screenshot; everything is editable.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {AppShell} from '../components/ui/AppShell';
import {Card, IconButton, IconTile, Button} from '../components/ui/primitives';
import {Captions} from '../components/ui/Captions';
import {Sfx} from '../components/SoundDesign';
import {Icon, IconName} from '../components/Icon';
import {colors, radius, spacing, type} from '../theme';
import {fontDisplay, fontUI} from '../lib/fonts';
import {dashboard, SCRIPT} from '../content';
import {useEnter, usePop, stagger} from '../lib/ui-motion';
import {springValue} from '../lib/motion';

const script = SCRIPT.find((s) => s.id === 'dashboard')!;

// ── Wallet hero card ─────────────────────────────────────────────────────────
const WalletCard: React.FC<{delay: number}> = ({delay}) => {
  const enter = useEnter(delay, {y: 30, scaleFrom: 0.94});
  return (
    <div style={{...enter, position: 'relative', background: colors.gradWallet, borderRadius: radius.xl, padding: spacing.lg, overflow: 'hidden', boxShadow: '0 30px 70px rgba(94,84,240,0.35)'}}>
      <div style={{position: 'absolute', right: -60, top: -80, width: 320, height: 320, borderRadius: 999, background: 'rgba(255,255,255,0.12)'}} />
      <div style={{display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.85)', fontFamily: fontUI, fontSize: type.body, fontWeight: type.weightMedium}}>
        {dashboard.walletLabel} <Icon name="eye" size={22} />
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 12, fontFamily: fontDisplay, fontWeight: type.weightBold, color: '#fff'}}>
        <span style={{fontSize: 40}}>₦</span>
        <span style={{fontSize: 84, letterSpacing: '-0.02em'}}>0.00</span>
      </div>
      <div style={{color: 'rgba(255,255,255,0.75)', fontFamily: fontUI, fontSize: type.caption, marginTop: 4}}>Available balance</div>
      <div style={{marginTop: spacing.md}}>
        <Button variant="ghost" style={{background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', padding: '14px 22px'}}>
          <Icon name="plus" size={20} /> Fund Wallet
        </Button>
      </div>
    </div>
  );
};

// ── Small square tile ────────────────────────────────────────────────────────
const StatTile: React.FC<{icon: IconName; label: string; delay: number}> = ({icon, label, delay}) => {
  const {scale, opacity} = usePop(delay);
  return (
    <Card pad={20} style={{opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, justifyContent: 'center'}}>
      <IconTile name={icon} size={56} />
      <div style={{fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, color: colors.textPrimary}}>{label}</div>
    </Card>
  );
};

// ── Quick-action cell ────────────────────────────────────────────────────────
const ActionCell: React.FC<{icon: IconName; label: string; sub: string; soon?: boolean; delay: number}> = ({icon, label, sub, soon, delay}) => {
  const {scale, opacity} = usePop(delay);
  return (
    <div style={{opacity: soon ? 0.6 * opacity : opacity, transform: `scale(${scale})`, background: colors.surface2, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.lg, padding: spacing.md, position: 'relative'}}>
      <div style={{position: 'absolute', top: spacing.md, right: spacing.md, color: colors.textMuted}}><Icon name="chevron" size={18} /></div>
      <IconTile name={icon} size={56} />
      <div style={{fontFamily: fontUI, fontWeight: type.weightBold, fontSize: type.body, color: colors.textPrimary, marginTop: 14}}>{label}</div>
      <div style={{fontFamily: fontUI, fontSize: type.micro, color: colors.textMuted, marginTop: 2}}>{sub}</div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Slow camera push-in across the scene.
  const cam = springValue({frame, fps, from: 1.04, to: 1, config: {damping: 60, mass: 1.5, stiffness: 42}, durationInFrames: 300});

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${cam})`}}>
        <AppShell
          activeId="dashboard"
          title="Asap Numbers"
          sidebarAnimateFrom={4}
          topBarDelay={2}
          topRight={<><IconButton name="plus" /><IconButton name="bell" dot /></>}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: spacing.md}}>
            <WalletCard delay={14} />

            {/* Quick tiles */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing.sm}}>
              {dashboard.tiles.map((t, i) => (
                <StatTile key={t.id} icon={t.icon as IconName} label={t.label} delay={stagger(i, 4, 26)} />
              ))}
            </div>

            {/* Quick actions */}
            <Card pad={24} style={{...useEnter(40, {y: 24})}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md}}>
                <div style={{fontFamily: fontDisplay, fontWeight: type.weightSemi, fontSize: type.cardTitle, color: colors.textPrimary}}>Quick Action</div>
                <div style={{fontFamily: fontUI, fontSize: type.caption, color: colors.accent}}>View all</div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm}}>
                {dashboard.quickActions.map((a, i) => (
                  <ActionCell key={a.id} icon={a.icon as IconName} label={a.label} sub={a.sub} soon={(a as {soon?: boolean}).soon} delay={stagger(i, 5, 48)} />
                ))}
              </div>
            </Card>

            {/* Recent transactions (empty state) */}
            <Card pad={24} style={{...useEnter(64, {y: 24})}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md}}>
                <div style={{fontFamily: fontDisplay, fontWeight: type.weightSemi, fontSize: type.cardTitle, color: colors.textPrimary}}>Recent Transactions</div>
                <div style={{fontFamily: fontUI, fontSize: type.caption, color: colors.accent}}>View all</div>
              </div>
              <div style={{textAlign: 'center', color: colors.textMuted, fontFamily: fontUI, fontSize: type.caption, padding: `${spacing.lg}px 0`}}>
                No transactions yet.<br />Fund your wallet to get started!
              </div>
            </Card>
          </div>
        </AppShell>
      </AbsoluteFill>

      <Captions tokens={script.caption} startAt={30} span={340} bottom={150} />

      {/* Sound: staggered pops as tiles/cards land. */}
      <Sfx name="pop" at={14} />
      <Sfx name="pop" at={30} />
      <Sfx name="pop" at={48} />
    </AbsoluteFill>
  );
};
