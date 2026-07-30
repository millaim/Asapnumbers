/**
 * Sidebar.tsx — Recreated AsapNumbers left nav rail (fully animated, editable).
 * Renders the wordmark, theme toggle, user block, MAIN/ACCOUNT/MORE sections
 * with badges, the Community card, and Logout — matching the screenshots.
 *
 * `activeId` highlights a nav item. `animateFrom` staggers items in when set.
 */
import React from 'react';
import {colors, radius, spacing, type} from '../../theme';
import {fontUI} from '../../lib/fonts';
import {nav, account} from '../../content';
import {Icon, IconName} from '../Icon';
import {Avatar, Badge, Wordmark} from './primitives';
import {useEnter, stagger} from '../../lib/ui-motion';

const SIDEBAR_W = 300;

const NavItem: React.FC<{
  icon: IconName;
  label: string;
  active?: boolean;
  badge?: string;
  external?: boolean;
  delay: number;
}> = ({icon, label, active, badge, external, delay}) => {
  const enter = useEnter(delay, {y: 10});
  return (
    <div
      style={{
        ...enter,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '13px 14px',
        borderRadius: radius.md,
        background: active ? 'rgba(79,107,255,0.14)' : 'transparent',
        border: active ? `1px solid rgba(79,107,255,0.35)` : '1px solid transparent',
        color: active ? colors.accentSoft : colors.textSecondary,
      }}
    >
      <Icon name={icon} size={22} />
      <span style={{fontFamily: fontUI, fontSize: type.ui, fontWeight: type.weightMedium, flex: 1}}>
        {label}
      </span>
      {badge ? <Badge tone={badge === 'NEW' ? 'success' : 'success'}>{badge}</Badge> : null}
      {external ? <Icon name="external" size={16} /> : null}
    </div>
  );
};

const SectionLabel: React.FC<{children: React.ReactNode; delay: number}> = ({children, delay}) => (
  <div
    style={{
      ...useEnter(delay, {y: 6}),
      fontFamily: fontUI,
      fontSize: type.micro,
      fontWeight: type.weightBold,
      letterSpacing: '0.14em',
      color: colors.textMuted,
      padding: '0 14px',
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    }}
  >
    {children}
  </div>
);

export const Sidebar: React.FC<{activeId?: string; animateFrom?: number}> = ({
  activeId = 'dashboard',
  animateFrom = 0,
}) => {
  let i = 0;
  const d = () => stagger(i++, 3, animateFrom);

  return (
    <div
      style={{
        width: SIDEBAR_W,
        flexShrink: 0,
        height: '100%',
        background: colors.bgPanel,
        borderRight: `1px solid ${colors.surfaceBorder}`,
        display: 'flex',
        flexDirection: 'column',
        padding: `${spacing.lg}px ${spacing.md}px`,
        boxSizing: 'border-box',
      }}
    >
      {/* Header: wordmark + theme toggle */}
      <div style={{...useEnter(d(), {y: 8}), display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg}}>
        <Wordmark size={24} />
        <div style={{width: 40, height: 40, borderRadius: radius.pill, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textSecondary}}>
          <Icon name="sun" size={20} />
        </div>
      </div>

      {/* User block */}
      <div style={{...useEnter(d(), {y: 8}), display: 'flex', alignItems: 'center', gap: 12, padding: '10px 6px', marginBottom: spacing.sm}}>
        <Avatar initials={account.initials} size={48} />
        <div style={{overflow: 'hidden'}}>
          <div style={{fontFamily: fontUI, fontWeight: type.weightBold, fontSize: type.ui, color: colors.textPrimary}}>
            {account.name}
          </div>
          <div style={{fontFamily: fontUI, fontSize: type.micro, color: colors.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {account.email}
          </div>
        </div>
      </div>

      <SectionLabel delay={d()}>MAIN</SectionLabel>
      {nav.main.map((n) => (
        <NavItem key={n.id} icon={n.icon as IconName} label={n.label} badge={(n as {badge?: string}).badge} active={activeId === n.id} delay={d()} />
      ))}

      <SectionLabel delay={d()}>ACCOUNT</SectionLabel>
      {nav.account.map((n) => (
        <NavItem key={n.id} icon={n.icon as IconName} label={n.label} badge={(n as {badge?: string}).badge} active={activeId === n.id} delay={d()} />
      ))}

      <SectionLabel delay={d()}>MORE</SectionLabel>
      {nav.more.map((n) => (
        <NavItem key={n.id} icon={n.icon as IconName} label={n.label} external={(n as {external?: boolean}).external} active={activeId === n.id} delay={d()} />
      ))}

      {/* Community card */}
      <div style={{...useEnter(d(), {y: 8}), marginTop: spacing.md, background: colors.surface2, border: `1px solid ${colors.surfaceBorder}`, borderRadius: radius.md, padding: spacing.sm}}>
        <div style={{fontFamily: fontUI, fontSize: type.micro, fontWeight: type.weightBold, letterSpacing: '0.12em', color: colors.textMuted, marginBottom: spacing.sm}}>
          COMMUNITY
        </div>
        {[
          {t: 'Telegram Channel', s: 'Updates & News'},
          {t: 'Support Chat', s: 'Contact Support'},
        ].map((c) => (
          <div key={c.t} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0'}}>
            <div style={{width: 34, height: 34, borderRadius: radius.pill, background: colors.cyanBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}>
              <Icon name="send" size={18} />
            </div>
            <div>
              <div style={{fontFamily: fontUI, fontSize: type.caption, fontWeight: type.weightSemi, color: colors.textPrimary}}>{c.t}</div>
              <div style={{fontFamily: fontUI, fontSize: type.micro, color: colors.textMuted}}>{c.s}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{flex: 1}} />
      <div style={{...useEnter(d(), {y: 6}), display: 'flex', alignItems: 'center', gap: 12, color: colors.danger, padding: '10px 14px', fontFamily: fontUI, fontSize: type.ui, fontWeight: type.weightMedium}}>
        <Icon name="logout" size={22} />
        Logout
      </div>
    </div>
  );
};

export {SIDEBAR_W};
