/**
 * VirtualNumbers.tsx — Scene 7 (flagship). The Get Virtual Number screen rebuilt
 * as live UI: server selection grid, country + service selectors, live cost, and
 * a "Get Number" button the cursor clicks — followed by an OTP notification
 * popping in. Demonstrates the core product flow end to end.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {AppShell} from '../components/ui/AppShell';
import {Card, Button} from '../components/ui/primitives';
import {Captions} from '../components/ui/Captions';
import {Cursor} from '../components/ui/Cursor';
import {Toast} from '../components/ui/Toast';
import {Sfx} from '../components/SoundDesign';
import {Icon} from '../components/Icon';
import {colors, radius, spacing, type, naira} from '../theme';
import {fontDisplay, fontUI} from '../lib/fonts';
import {virtualNumbers as vn, SCRIPT} from '../content';
import {useEnter, usePop, stagger, useButtonPress} from '../lib/ui-motion';

const script = SCRIPT.find((s) => s.id === 'numbers')!;
const GET_CLICK = 300; // cursor clicks "Get Number"

const ServerCard: React.FC<{label: string; region: string; flag: string; active?: boolean; delay: number}> = ({label, region, flag, active, delay}) => {
  const {scale, opacity} = usePop(delay);
  return (
    <div style={{opacity, transform: `scale(${scale})`, background: active ? 'rgba(79,107,255,0.12)' : colors.surface2, border: `1.5px solid ${active ? colors.accent : colors.surfaceBorder}`, borderRadius: radius.md, padding: '16px 18px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: fontUI, fontWeight: type.weightSemi, fontSize: type.caption, color: active ? colors.accentSoft : colors.textPrimary}}>
        <span style={{fontSize: 22}}>{flag}</span> {label}
      </div>
      <div style={{fontFamily: fontUI, fontSize: type.micro, color: colors.textMuted, marginTop: 4, paddingLeft: 30}}>{region}</div>
    </div>
  );
};

const Field: React.FC<{placeholder: string; value?: string; flag?: string; delay: number; dropdown?: boolean}> = ({placeholder, value, flag, delay, dropdown}) => (
  <div style={{...useEnter(delay, {y: 12})}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, background: colors.surface2, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.md, padding: '16px 18px'}}>
      {flag ? <span style={{fontSize: 22}}>{flag}</span> : <Icon name="search" size={20} color={colors.textMuted} />}
      <span style={{flex: 1, fontFamily: fontUI, fontSize: type.body, color: value ? colors.textPrimary : colors.textMuted, fontWeight: value ? type.weightSemi : type.weightRegular}}>
        {value ?? placeholder}
      </span>
      {dropdown ? <Icon name="chevron" size={20} color={colors.textMuted} /> : null}
    </div>
  </div>
);

const SectionLabel: React.FC<{children: React.ReactNode; delay: number}> = ({children, delay}) => (
  <div style={{...useEnter(delay, {y: 8}), fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, color: colors.textSecondary, marginBottom: 10, marginTop: spacing.sm}}>{children}</div>
);

export const VirtualNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const press = useButtonPress(GET_CLICK);

  // The purchased number "appears" in Recent Numbers after the click.
  const purchased = interpolate(frame, [GET_CLICK + 10, GET_CLICK + 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <AppShell activeId="numbers" title="Asap Numbers" sidebarAnimateFrom={4} topBarDelay={2}>
        <div style={{display: 'flex', flexDirection: 'column', gap: spacing.md}}>
          {/* Get Virtual Number */}
          <Card pad={28} style={{...useEnter(10, {y: 24})}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm}}>
              <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: type.cardTitle, color: colors.textPrimary}}>Get Virtual Number</div>
              <div style={{fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, background: '#fff', color: '#0B0F1A', padding: '8px 16px', borderRadius: radius.sm}}>History</div>
            </div>

            <SectionLabel delay={16}>Server</SectionLabel>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm}}>
              {vn.servers.map((s, i) => (
                <ServerCard key={s.id} label={s.label} region={s.region} flag={s.flag} active={s.id === 1} delay={stagger(i, 4, 20)} />
              ))}
            </div>

            <SectionLabel delay={40}>Country</SectionLabel>
            <div style={{display: 'flex', flexDirection: 'column', gap: spacing.sm}}>
              <Field placeholder="Search country..." delay={42} />
              <Field placeholder="" value={vn.country.label} flag={vn.country.flag} dropdown delay={48} />
            </div>

            <SectionLabel delay={56}>Service</SectionLabel>
            <div style={{display: 'flex', flexDirection: 'column', gap: spacing.sm}}>
              <Field placeholder="Search service..." delay={58} />
              <Field placeholder="" value={vn.service} flag="📱" dropdown delay={64} />
            </div>

            {/* Cost row */}
            <div style={{...useEnter(72, {y: 12}), display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: colors.surface2, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.md, padding: '18px 20px', marginTop: spacing.md}}>
              <span style={{fontFamily: fontUI, fontSize: type.body, color: colors.textSecondary}}>Cost per number</span>
              <span style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: type.cardTitle, color: colors.accentSoft}}>{naira(vn.cost)}</span>
            </div>

            <div style={{...useEnter(80, {y: 12}), marginTop: spacing.md, transform: `scale(${press})`}}>
              <Button variant="primary" full style={{padding: '20px'}}>Get Number →</Button>
            </div>
          </Card>

          {/* Recent numbers */}
          <Card pad={28} style={{...useEnter(90, {y: 24})}}>
            <div style={{fontFamily: fontDisplay, fontWeight: type.weightSemi, fontSize: type.cardTitle, color: colors.textPrimary, marginBottom: spacing.md}}>Recent Numbers</div>
            {purchased > 0 ? (
              <div style={{opacity: purchased, transform: `translateY(${(1 - purchased) * 16}px)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: colors.surface2, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.md, padding: '18px 20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <span style={{fontSize: 24}}>🇺🇸</span>
                  <div>
                    <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: type.body, color: colors.textPrimary}}>+1 (415) 555‑0198</div>
                    <div style={{fontFamily: fontUI, fontSize: type.micro, color: colors.textMuted}}>{vn.service} • active</div>
                  </div>
                </div>
                <span style={{color: colors.success, fontFamily: fontUI, fontSize: type.micro, fontWeight: type.weightBold}}>● Live</span>
              </div>
            ) : (
              <div style={{textAlign: 'center', color: colors.textMuted, fontFamily: fontUI, fontSize: type.caption, padding: `${spacing.lg}px 0`}}>No numbers purchased yet.</div>
            )}
          </Card>
        </div>
      </AppShell>

      {/* Cursor selects Server 1, then clicks Get Number. Coords = element centers. */}
      <Cursor
        waypoints={[
          {frame: 120, x: 760, y: 1600},
          {frame: 176, x: 525, y: 335},
          {frame: 184, x: 525, y: 335, click: true},
          {frame: GET_CLICK - 12, x: 690, y: 1128},
          {frame: GET_CLICK, x: 690, y: 1128, click: true},
          {frame: 470, x: 690, y: 1128},
        ]}
      />

      {/* OTP arrives. */}
      <Toast at={GET_CLICK + 46} hold={110} icon="phone" title={`${vn.otp.code} ${vn.otp.message}`} sub={`From ${vn.otp.sender} • just now`} tone="accent" />

      <Captions tokens={script.caption} startAt={26} span={280} bottom={120} />

      <Sfx name="click" at={184} />
      <Sfx name="click" at={GET_CLICK} />
      <Sfx name="success" at={GET_CLICK + 12} />
      <Sfx name="notify" at={GET_CLICK + 46} />
    </AbsoluteFill>
  );
};
