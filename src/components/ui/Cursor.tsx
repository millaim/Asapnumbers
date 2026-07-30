/**
 * Cursor.tsx — A virtual pointer that eases between waypoints and emits a click
 * ring. Drives the "dynamic cursor movement" + button clicks called for in the
 * brief. Pass canvas-space waypoints; see useCursor in lib/ui-motion.ts.
 */
import React from 'react';
import {colors} from '../../theme';
import {useCursor, Waypoint} from '../../lib/ui-motion';

export const Cursor: React.FC<{waypoints: Waypoint[]}> = ({waypoints}) => {
  const {x, y, clickPulse, visible} = useCursor(waypoints);
  if (!visible) return null;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(${x}px, ${y}px)`, zIndex: 50, pointerEvents: 'none'}}>
      {/* Click ripple */}
      {clickPulse > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: -6,
            top: -6,
            width: 12 + clickPulse * 46,
            height: 12 + clickPulse * 46,
            borderRadius: 999,
            border: `2px solid ${colors.accentSoft}`,
            opacity: clickPulse * 0.7,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : null}
      {/* Pointer */}
      <svg width="40" height="40" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'}}>
        <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="rgba(0,0,0,0.35)" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
