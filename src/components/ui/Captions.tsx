/**
 * Captions.tsx — Word-by-word animated subtitles synced to the narration.
 * Tokens flagged `hl` pop in the brand accent (the highlighted keywords the
 * brief calls for: "Dashboard", "Virtual Account", "Receive OTP", …).
 *
 * Reveal spans [startAt, startAt + span]; each token springs up as it lands.
 * Sits in the lower third (safe for vertical 1080×1920).
 */
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, spacing, type} from '../../theme';
import {fontDisplay} from '../../lib/fonts';
import {SPRING_ENTRANCE} from '../../lib/motion';

type Token = {t: string; hl?: boolean};

export const Captions: React.FC<{
  tokens: Token[];
  startAt?: number;
  span?: number; // frames across which all tokens appear
  bottom?: number;
}> = ({tokens, startAt = 12, span, bottom = 220}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const total = span ?? tokens.length * 14;
  const per = total / Math.max(1, tokens.length);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px 14px',
        justifyContent: 'center',
        padding: `0 ${spacing.xl}px`,
        zIndex: 40,
      }}
    >
      {tokens.map((tok, i) => {
        const appear = startAt + i * per;
        const p = spring({frame: frame - appear, fps, config: SPRING_ENTRANCE});
        const y = interpolate(p, [0, 1], [18, 0]);
        const opacity = interpolate(p, [0, 0.6], [0, 1], {extrapolateRight: 'clamp'});
        return (
          <span
            key={i}
            style={{
              fontFamily: fontDisplay,
              fontWeight: tok.hl ? type.weightBold : type.weightSemi,
              fontSize: type.cardTitle,
              letterSpacing: type.trackingNormal,
              color: tok.hl ? colors.accentSoft : colors.textPrimary,
              opacity,
              transform: `translateY(${y}px)`,
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            {tok.t}
          </span>
        );
      })}
    </div>
  );
};
