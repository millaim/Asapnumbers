/**
 * Homepage.tsx — Scene 2. A branded hero on the auth surface: the value
 * proposition headline animates in line-by-line (blur-to-focus), feature cards
 * float up in a stagger, and the CTAs settle in. Camera push-in throughout.
 *
 * NOTE: No marketing-homepage screenshot existed, so this copy is placeholder in
 * the product's direction — edit in content.ts (homepage). TODO(brand).
 */
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AuthChrome} from '../components/ui/AuthChrome';
import {Button, IconTile} from '../components/ui/primitives';
import {Captions} from '../components/ui/Captions';
import {Sfx} from '../components/SoundDesign';
import {IconName} from '../components/Icon';
import {colors, radius, spacing, type} from '../theme';
import {fontDisplay, fontUI} from '../lib/fonts';
import {homepage, SCRIPT} from '../content';
import {textEntrance, springValue} from '../lib/motion';
import {usePop, stagger} from '../lib/ui-motion';

const script = SCRIPT.find((s) => s.id === 'homepage')!;

const HeadlineLine: React.FC<{text: string; delay: number; accent?: boolean}> = ({text, delay, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const anim = textEntrance({frame, fps, delay, startScale: 0.92, yFrom: 20, startBlur: 12});
  return (
    <div style={{...anim, fontFamily: fontDisplay, fontWeight: type.weightBold, fontSize: 76, lineHeight: 1.05, letterSpacing: type.trackingTight, color: accent ? colors.accent : colors.textPrimary}}>
      {text}
    </div>
  );
};

const FeatureCard: React.FC<{title: string; sub: string; icon: IconName; delay: number}> = ({title, sub, icon, delay}) => {
  const {scale, opacity} = usePop(delay);
  return (
    <div style={{opacity, transform: `scale(${scale})`, background: colors.surface, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.lg, padding: spacing.md, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.35)'}}>
      <IconTile name={icon} size={64} />
      <div>
        <div style={{fontFamily: fontUI, fontWeight: type.weightBold, fontSize: type.body, color: colors.textPrimary}}>{title}</div>
        <div style={{fontFamily: fontUI, fontSize: type.micro, color: colors.textMuted, marginTop: 2}}>{sub}</div>
      </div>
    </div>
  );
};

export const Homepage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cam = springValue({frame, fps, from: 1.05, to: 1, config: {damping: 60, mass: 1.5, stiffness: 42}, durationInFrames: 260});

  return (
    <AbsoluteFill>
      <AuthChrome showSignIn>
        <AbsoluteFill style={{transform: `scale(${cam})`, justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: 900, textAlign: 'center'}}>
            {/* Headline */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center'}}>
              <HeadlineLine text={homepage.headline[0]} delay={8} />
              <HeadlineLine text={homepage.headline[1]} delay={16} />
              <HeadlineLine text={homepage.headline[2]} delay={24} accent />
            </div>

            {/* Sub */}
            <div style={{opacity: interpolate(frame, [34, 54], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), fontFamily: fontUI, fontSize: type.body, color: colors.textSecondary, lineHeight: 1.4, margin: `${spacing.md}px auto 0`, maxWidth: 720}}>
              {homepage.sub}
            </div>

            {/* Feature cards */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm, marginTop: spacing.xl}}>
              {homepage.features.map((f, i) => (
                <FeatureCard key={f.id} title={f.title} sub={f.sub} icon={f.icon as IconName} delay={stagger(i, 5, 46)} />
              ))}
            </div>

            {/* CTAs */}
            <Ctas />
          </div>
        </AbsoluteFill>
      </AuthChrome>

      <Captions tokens={script.caption} startAt={24} span={280} bottom={130} />

      {/* Feature cards pop in (staggered), then the CTAs settle with a swipe+click. */}
      <Sfx name="pop" at={46} />
      <Sfx name="pop" at={51} />
      <Sfx name="pop" at={56} />
      <Sfx name="pop" at={61} />
      <Sfx name="swipe" at={72} />
      <Sfx name="click" at={78} />
    </AbsoluteFill>
  );
};

const Ctas: React.FC = () => {
  const a = usePop(72);
  const b = usePop(78);
  return (
    <div style={{display: 'flex', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.xl}}>
      <div style={{opacity: a.opacity, transform: `scale(${a.scale})`}}>
        <Button variant="cyan" style={{padding: '20px 40px'}}>{homepage.ctaPrimary} →</Button>
      </div>
      <div style={{opacity: b.opacity, transform: `scale(${b.scale})`}}>
        <Button variant="ghost" style={{padding: '20px 40px'}}>{homepage.ctaSecondary}</Button>
      </div>
    </div>
  );
};
