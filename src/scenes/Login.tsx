/**
 * Login.tsx — Scene 4. Sign-in on the auth surface: the email types in, the
 * password fills, the cursor clicks Sign In, a loading spinner runs, then a
 * success toast confirms — handing off to the dashboard in the next scene.
 *
 * NOTE: no login screenshot existed; styled to match the auth (cyan) surface.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AuthChrome} from '../components/ui/AuthChrome';
import {Button} from '../components/ui/primitives';
import {Captions} from '../components/ui/Captions';
import {Cursor} from '../components/ui/Cursor';
import {Toast} from '../components/ui/Toast';
import {Sfx} from '../components/SoundDesign';
import {Icon} from '../components/Icon';
import {colors, radius, spacing, type} from '../theme';
import {fontDisplay, fontUI} from '../lib/fonts';
import {login as lg, SCRIPT} from '../content';
import {useEnter, useTyped, useButtonPress} from '../lib/ui-motion';

const script = SCRIPT.find((s) => s.id === 'login')!;
const EMAIL_START = 24;
const PW_START = 84;
const SIGNIN_CLICK = 170;
const LOADING_END = SIGNIN_CLICK + 42;

const Spinner: React.FC<{color?: string}> = ({color = '#04121a'}) => {
  const frame = useCurrentFrame();
  const rot = (frame * 16) % 360;
  return (
    <div style={{width: 26, height: 26, borderRadius: 999, border: `3px solid rgba(4,18,26,0.25)`, borderTopColor: color, transform: `rotate(${rot}deg)`}} />
  );
};

export const Login: React.FC = () => {
  const frame = useCurrentFrame();
  const press = useButtonPress(SIGNIN_CLICK);
  const email = useTyped(lg.email, EMAIL_START, 2);

  // Password dots fill in over time.
  const pwCount = Math.max(0, Math.min(lg.password.length, Math.floor((frame - PW_START) / 3)));
  const loading = frame >= SIGNIN_CLICK && frame < LOADING_END;

  return (
    <AbsoluteFill>
      <AuthChrome showSignIn={false}>
        <div style={{...useEnter(6, {y: 30, scaleFrom: 0.95}), width: 640, background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.xl, padding: spacing.xl, boxShadow: '0 40px 100px rgba(0,0,0,0.5)'}}>
          <div style={{textAlign: 'center', marginBottom: spacing.lg}}>
            <div style={{width: 72, height: 72, borderRadius: radius.pill, background: colors.gradCyan, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#04121a', marginBottom: 14}}>
              <Icon name="lock" size={32} />
            </div>
            <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: type.headline, color: colors.textPrimary}}>{lg.heading}</div>
            <div style={{fontFamily: fontUI, fontSize: type.caption, color: colors.textMuted}}>{lg.subheading}</div>
          </div>

          {/* Email */}
          <FieldShell label="Email" icon="mail" focused={email.started && !email.done}>
            <span>{email.started ? email.shown : 'you@example.com'}{email.started && !email.done && email.caret ? <span style={{color: colors.cyanBlue}}>|</span> : null}</span>
          </FieldShell>

          {/* Password */}
          <div style={{marginTop: spacing.md}}>
            <FieldShell label="Password" icon="lock" focused={frame >= PW_START && pwCount < lg.password.length}>
              <span style={{letterSpacing: '3px'}}>{pwCount > 0 ? '•'.repeat(pwCount) : '••••••••'}</span>
            </FieldShell>
          </div>

          {/* Sign in */}
          <div style={{marginTop: spacing.lg, transform: `scale(${press})`}}>
            <Button variant="cyan" full style={{padding: '20px'}}>
              {loading ? <Spinner /> : lg.cta}
            </Button>
          </div>
        </div>
      </AuthChrome>

      <Cursor
        waypoints={[
          {frame: 130, x: 640, y: 1400},
          {frame: SIGNIN_CLICK - 10, x: 540, y: 1080},
          {frame: SIGNIN_CLICK, x: 540, y: 1080, click: true},
          {frame: 300, x: 540, y: 1080},
        ]}
      />

      <Toast at={LOADING_END} hold={70} icon="check" title="Signed in" sub="Loading your dashboard…" tone="success" />

      <Captions tokens={script.caption} startAt={18} span={200} bottom={130} />

      <Sfx name="type" at={EMAIL_START} />
      <Sfx name="type" at={PW_START} />
      <Sfx name="click" at={SIGNIN_CLICK} />
      <Sfx name="success" at={LOADING_END} />
    </AbsoluteFill>
  );
};

const FieldShell: React.FC<{label: string; icon: 'mail' | 'lock'; focused: boolean; children: React.ReactNode}> = ({label, icon, focused, children}) => (
  <div>
    <div style={{fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, color: colors.textPrimary, marginBottom: 8}}>{label}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 12, background: colors.surface2, border: `1.5px solid ${focused ? colors.cyanBlue : colors.surfaceBorder}`, borderRadius: radius.md, padding: '16px 18px', boxShadow: focused ? `0 0 0 4px rgba(56,189,248,0.12)` : 'none', fontFamily: fontUI, fontSize: type.body, color: colors.textPrimary}}>
      <Icon name={icon} size={20} color={colors.textMuted} />
      {children}
    </div>
  </div>
);
