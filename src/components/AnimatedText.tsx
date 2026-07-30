/**
 * AnimatedText.tsx — The video's ONE text-entrance component.
 *
 * Every headline, title and caption enters through here, which is what gives
 * the whole piece a single consistent motion identity (scale + fade +
 * blur-to-focus, spring-driven). Use `delay` to stagger lines.
 */
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {textEntrance, SPRING_ENTRANCE, SPRING_GENTLE} from '../lib/motion';
import {fontFamily_display} from '../lib/fonts';

export const AnimatedText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  /** 'entrance' = signature pop; 'gentle' = softer, for very large type. */
  feel?: 'entrance' | 'gentle';
  style?: React.CSSProperties;
}> = ({children, delay = 0, feel = 'entrance', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const anim = textEntrance({
    frame,
    fps,
    delay,
    config: feel === 'gentle' ? SPRING_GENTLE : SPRING_ENTRANCE,
    // Bigger type gets a gentler rise/scale so it reads as premium, not bouncy.
    startScale: feel === 'gentle' ? 0.9 : 0.86,
    yFrom: feel === 'gentle' ? 18 : 26,
  });

  return (
    <div
      style={{
        fontFamily: fontFamily_display,
        color: '#fff',
        margin: 0,
        willChange: 'transform, filter, opacity',
        ...anim,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
