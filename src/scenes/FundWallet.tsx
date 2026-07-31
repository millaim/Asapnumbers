/**
 * FundWallet.tsx — Scene 6 (flagship). The Add Funds screen rebuilt as live UI:
 * a gradient balance hero, funding-method tabs, the generated virtual bank
 * account (with a cursor that moves to Copy and clicks → "Copied" toast), and
 * the how-to-fund steps. Highlights the account number as narrated.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {AppShell} from '../components/ui/AppShell';
import {Card, Badge, Button} from '../components/ui/primitives';
import {Captions} from '../components/ui/Captions';
import {Cursor} from '../components/ui/Cursor';
import {Toast} from '../components/ui/Toast';
import {Sfx} from '../components/SoundDesign';
import {colors, radius, spacing, type} from '../theme';
import {fontDisplay, fontUI} from '../lib/fonts';
import {fundWallet, SCRIPT} from '../content';
import {useEnter, usePop, stagger, useButtonPress} from '../lib/ui-motion';

const script = SCRIPT.find((s) => s.id === 'fund')!;
const COPY_CLICK = 150; // frame the cursor clicks "Copy"

const BalanceHero: React.FC<{delay: number}> = ({delay}) => (
  <div style={{...useEnter(delay, {y: 26, scaleFrom: 0.95}), background: colors.gradWallet, borderRadius: radius.xl, padding: `${spacing.lg}px`, textAlign: 'center', boxShadow: '0 30px 70px rgba(94,84,240,0.30)'}}>
    <div style={{fontFamily: fontUI, fontSize: type.micro, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.8)'}}>CURRENT BALANCE</div>
    <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: 76, color: '#fff', marginTop: 6}}>₦0.00</div>
    <div style={{fontFamily: fontUI, fontSize: type.caption, color: 'rgba(255,255,255,0.75)'}}>Available for purchases</div>
  </div>
);

const MethodTabs: React.FC<{delay: number}> = ({delay}) => (
  <div style={{...useEnter(delay, {y: 14}), display: 'flex', gap: spacing.sm}}>
    {fundWallet.methods.map((m, i) => (
      <div key={m} style={{flex: 1, textAlign: 'center', padding: '14px 0', borderRadius: radius.pill, fontFamily: fontUI, fontWeight: type.weightSemi, fontSize: type.caption, color: i === 0 ? '#fff' : colors.textSecondary, background: i === 0 ? colors.accent : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 0 ? 'transparent' : colors.surfaceBorder}`}}>
        {m}
      </div>
    ))}
  </div>
);

export const FundWallet: React.FC = () => {
  const frame = useCurrentFrame();
  const press = useButtonPress(COPY_CLICK);

  // Highlight ring pulses around the account number when narrated.
  const highlight = interpolate(frame, [96, 116, 150, 170], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <AppShell
        activeId="fund"
        title="Add Funds"
        sidebarAnimateFrom={4}
        topBarDelay={2}
        topRight={<div style={{...usePop(10), transform: 'none', background: colors.success, color: '#05270f', fontFamily: fontUI, fontWeight: type.weightBold, fontSize: type.caption, padding: '14px 20px', borderRadius: radius.md}}>Virtual account ready</div>}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: spacing.md}}>
          <div style={{...useEnter(8, {y: 10}), textAlign: 'center'}}>
            <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: type.headline, color: colors.textPrimary}}>Add Funds</div>
            <div style={{fontFamily: fontUI, fontSize: type.body, color: colors.textSecondary, marginTop: 4}}>{fundWallet.subtitle}</div>
          </div>

          <BalanceHero delay={16} />
          <MethodTabs delay={30} />

          {/* Virtual account card */}
          <Card pad={28} style={{...useEnter(40, {y: 26}), position: 'relative'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, color: colors.success, fontFamily: fontUI, fontWeight: type.weightSemi, fontSize: type.caption}}>
                <span style={{width: 10, height: 10, borderRadius: 999, background: colors.success}} /> Active
              </div>
              <Badge tone="neutral">Min ₦100</Badge>
            </div>

            <div style={{fontFamily: fontUI, fontSize: type.micro, letterSpacing: '0.1em', color: colors.textMuted, marginTop: spacing.md}}>ACCOUNT NUMBER</div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6}}>
              <div style={{position: 'relative', fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: 56, color: colors.textPrimary, letterSpacing: '0.02em'}}>
                {fundWallet.accountNumber}
                {/* highlight ring */}
                <div style={{position: 'absolute', inset: '-10px -16px', borderRadius: radius.md, border: `2px solid ${colors.accentSoft}`, opacity: highlight, boxShadow: `0 0 30px ${colors.glowPrimary}`}} />
              </div>
              <div style={{transform: `scale(${press})`}}>
                <Button variant="primary" style={{padding: '14px 24px', fontSize: type.caption}}>Copy</Button>
              </div>
            </div>

            <div style={{height: 1, background: colors.surfaceBorder, margin: `${spacing.md}px 0`}} />
            <Row label="Bank Name" value={fundWallet.bankName} />
            <Row label="Account Name" value={fundWallet.accountName} />
          </Card>

          {/* How to fund */}
          <Card pad={28} style={{...useEnter(58, {y: 24})}}>
            <div style={{fontFamily: fontUI, fontSize: type.micro, letterSpacing: '0.12em', color: colors.textMuted, marginBottom: spacing.md}}>HOW TO FUND</div>
            {fundWallet.steps.map((s, i) => (
              <StepRow key={i} n={i + 1} text={s} delay={stagger(i, 5, 66)} />
            ))}
          </Card>
        </div>
      </AppShell>

      {/* Cursor glides to the Copy button and clicks it. Coords = button center. */}
      <Cursor
        waypoints={[
          {frame: 96, x: 760, y: 1500},
          {frame: COPY_CLICK - 10, x: 958, y: 865},
          {frame: COPY_CLICK, x: 958, y: 865, click: true},
          {frame: 260, x: 958, y: 865},
        ]}
      />

      {/* Copied confirmation. */}
      <Toast at={COPY_CLICK + 4} hold={90} icon="check" title="Account number copied" sub="Paste it in your bank app to transfer" tone="success" />

      <Captions tokens={script.caption} startAt={22} span={330} bottom={120} />

      <Sfx name="click" at={COPY_CLICK} />
      <Sfx name="notify" at={COPY_CLICK + 4} />
    </AbsoluteFill>
  );
};

const Row: React.FC<{label: string; value: string}> = ({label, value}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', gap: 20}}>
    <span style={{fontFamily: fontUI, fontSize: type.caption, color: colors.textMuted}}>{label}</span>
    <span style={{fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, color: colors.textPrimary, textAlign: 'right'}}>{value}</span>
  </div>
);

const StepRow: React.FC<{n: number; text: string; delay: number}> = ({n, text, delay}) => (
  <div style={{...useEnter(delay, {y: 10}), display: 'flex', alignItems: 'center', gap: 16, padding: '9px 0'}}>
    <div style={{width: 34, height: 34, borderRadius: 999, background: 'rgba(79,107,255,0.16)', color: colors.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontUI, fontWeight: type.weightBold, fontSize: type.caption, flexShrink: 0}}>{n}</div>
    <span style={{fontFamily: fontUI, fontSize: type.caption, color: colors.textSecondary}}>{text}</span>
  </div>
);
