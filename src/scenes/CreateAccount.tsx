/**
 * CreateAccount.tsx — Scene 3. The 3-step wizard from the screenshot, rebuilt as
 * live UI: the step tabs (Personal / Contact / Security), a progress bar, and the
 * Personal-Information fields that AUTO-TYPE one after another. When the form is
 * complete the Next button glows, the cursor clicks it, and an "Account created"
 * toast confirms.
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {AuthChrome} from '../components/ui/AuthChrome';
import {Button} from '../components/ui/primitives';
import {Captions} from '../components/ui/Captions';
import {Cursor} from '../components/ui/Cursor';
import {Toast} from '../components/ui/Toast';
import {Sfx} from '../components/SoundDesign';
import {Icon, IconName} from '../components/Icon';
import {colors, radius, spacing, type} from '../theme';
import {fontDisplay, fontUI} from '../lib/fonts';
import {createAccount as ca, SCRIPT} from '../content';
import {useEnter, usePop, useTyped, useButtonPress} from '../lib/ui-motion';

const script = SCRIPT.find((s) => s.id === 'createAccount')!;

// Field typing schedule (scene-relative frames).
const TYPE_START = [40, 88, 136];
const NEXT_CLICK = 260;

const StepTab: React.FC<{icon: IconName; label: string; active?: boolean; delay: number}> = ({icon, label, active, delay}) => {
  const {scale, opacity} = usePop(delay);
  return (
    <div style={{opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1}}>
      <div style={{width: 68, height: 68, borderRadius: radius.pill, background: active ? colors.gradCyan : 'rgba(255,255,255,0.05)', border: active ? 'none' : `1px solid ${colors.surfaceBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: active ? '#04121a' : colors.textMuted, boxShadow: active ? `0 12px 30px ${colors.glowCyan}` : 'none'}}>
        <Icon name={icon} size={30} />
      </div>
      <span style={{fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, color: active ? colors.textPrimary : colors.textMuted}}>{label}</span>
    </div>
  );
};

const TypedField: React.FC<{label: string; value: string; prefix?: string; start: number}> = ({label, value, prefix, start}) => {
  const {shown, caret, started, done} = useTyped(value, start, 3);
  const focused = started && !done;
  return (
    <div>
      <div style={{fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, color: colors.textPrimary, marginBottom: 8}}>
        {label} <span style={{color: colors.danger}}>*</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, background: colors.surface2, border: `1.5px solid ${focused ? colors.cyanBlue : colors.surfaceBorder}`, borderRadius: radius.md, padding: '16px 18px', boxShadow: focused ? `0 0 0 4px rgba(56,189,248,0.12)` : 'none'}}>
        <Icon name={prefix ? 'user' : 'user'} size={20} color={colors.textMuted} />
        <span style={{flex: 1, fontFamily: fontUI, fontSize: type.body, color: started ? colors.textPrimary : colors.textMuted, fontWeight: started ? type.weightMedium : type.weightRegular}}>
          {prefix && started ? <span style={{color: colors.textMuted}}>{prefix}</span> : null}
          {started ? shown : label === 'Username' ? 'johnsmith123' : label === 'First Name' ? 'John' : 'Smith'}
          {focused && caret ? <span style={{color: colors.cyanBlue}}>|</span> : null}
        </span>
      </div>
    </div>
  );
};

export const CreateAccount: React.FC = () => {
  const frame = useCurrentFrame();
  const press = useButtonPress(NEXT_CLICK);
  // Next button glows once all fields are filled.
  const filled = frame > TYPE_START[2] + ca.fields[2].value.length * 3 + 6;
  const glow = filled ? interpolate((frame % 60), [0, 30, 60], [0.4, 1, 0.4]) : 0;

  return (
    <AbsoluteFill>
      <AuthChrome showSignIn>
        <div style={{...useEnter(6, {y: 30, scaleFrom: 0.95}), width: 720, background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.xl, padding: spacing.xl, boxShadow: '0 40px 100px rgba(0,0,0,0.5)'}}>
          {/* Header */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: type.headline, color: colors.textPrimary}}>Create Account</div>
            <div style={{fontFamily: fontUI, fontSize: type.caption, color: colors.textMuted}}>Step 1 of 3</div>
          </div>
          {/* Progress */}
          <div style={{height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.08)', marginTop: spacing.sm, overflow: 'hidden'}}>
            <div style={{height: '100%', width: '33%', background: colors.gradCyan, borderRadius: 999}} />
          </div>

          {/* Step tabs */}
          <div style={{display: 'flex', gap: spacing.sm, margin: `${spacing.lg}px 0`}}>
            {ca.steps.map((s, i) => (
              <StepTab key={s.id} icon={s.icon as IconName} label={s.label} active={i === 0} delay={12 + i * 4} />
            ))}
          </div>

          {/* Section heading */}
          <div style={{...useEnter(24, {y: 10}), textAlign: 'center', marginBottom: spacing.md}}>
            <div style={{width: 64, height: 64, borderRadius: radius.md, background: 'rgba(255,255,255,0.05)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary, marginBottom: 10}}>
              <Icon name="user" size={30} />
            </div>
            <div style={{fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: type.cardTitle, color: colors.textPrimary}}>{ca.heading}</div>
            <div style={{fontFamily: fontUI, fontSize: type.caption, color: colors.textMuted}}>{ca.subheading}</div>
          </div>

          {/* Fields */}
          <div style={{display: 'flex', flexDirection: 'column', gap: spacing.md}}>
            {ca.fields.map((f, i) => (
              <div key={f.label} style={{...useEnter(28 + i * 4, {y: 12})}}>
                <TypedField label={f.label} value={f.value} prefix={(f as {prefix?: string}).prefix} start={TYPE_START[i]} />
              </div>
            ))}
          </div>

          {/* Next */}
          <div style={{marginTop: spacing.lg, transform: `scale(${press})`, boxShadow: `0 16px 44px rgba(56,189,248,${0.25 + glow * 0.4})`, borderRadius: radius.md}}>
            <Button variant="cyan" full style={{padding: '20px'}}>{ca.cta}</Button>
          </div>
          <div style={{textAlign: 'center', marginTop: spacing.md, fontFamily: fontUI, fontSize: type.caption, color: colors.textMuted}}>
            Already have an account? <span style={{color: colors.cyanBlue, fontWeight: type.weightSemi}}>Sign In</span>
          </div>
        </div>
      </AuthChrome>

      {/* Cursor clicks Next. */}
      <Cursor
        waypoints={[
          {frame: 220, x: 720, y: 1500},
          {frame: NEXT_CLICK - 10, x: 540, y: 1220},
          {frame: NEXT_CLICK, x: 540, y: 1220, click: true},
          {frame: 470, x: 540, y: 1220},
        ]}
      />

      <Toast at={NEXT_CLICK + 6} hold={90} icon="check" title="Account created" sub="Welcome to AsapNumbers, John!" tone="success" />

      <Captions tokens={script.caption} startAt={20} span={330} bottom={130} />

      {/* Typing SFX bursts as each field fills. */}
      <Sfx name="type" at={TYPE_START[0]} />
      <Sfx name="type" at={TYPE_START[1]} />
      <Sfx name="type" at={TYPE_START[2]} />
      <Sfx name="click" at={NEXT_CLICK} />
      <Sfx name="success" at={NEXT_CLICK + 6} />
    </AbsoluteFill>
  );
};
