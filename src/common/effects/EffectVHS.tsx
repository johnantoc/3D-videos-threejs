/**
 * Effect - VHS
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  random,
  useVideoConfig,
} from "remotion";
import { C, font } from "..";

export const EffectVHS = ({
  startDelay = 0,
  text = "VHS",
  startDuration = 0,
}: {
  startDelay?: number;
  text?: string;
  startDuration?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tracking = Math.sin((frame - startDelay) * 0.05) * 5;
  const jitter = random(`vhs-${frame}`) > 0.95;
  const jitterAmount = jitter ? random(`vhs-jitter-${frame}`) * 20 - 10 : 0;

  const seconds = (frame + startDuration) / fps;

  return (
    <AbsoluteFill style={{ background: C.black }}>
      <AbsoluteFill
        style={{
          transform: `translateX(${jitterAmount}px) skewX(${jitter ? 2 : 0}deg)`,
        }}
      >
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateX(${tracking}px)`,
            mixBlendMode: "screen",
          }}
        >
          <div
            style={{
              fontFamily: font,
              fontSize: 75,
              fontWeight: 500,
              color: "rgba(255, 0, 0, 0.7)",
              textAlign: "center",
            }}
          >
            {text}
          </div>
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateX(${-tracking}px)`,
            mixBlendMode: "screen",
          }}
        >
          <div
            style={{
              fontFamily: font,
              fontSize: 75,
              fontWeight: 500,
              textAlign: "center",
              color: "rgba(0, 255, 255, 0.7)",
            }}
          >
            {text}
          </div>
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: font,
              fontSize: 75,
              fontWeight: 500,
              color: C.white,
              textAlign: "center",
            }}
          >
            {text}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, 0.2) 1px,
            rgba(0, 0, 0, 0.2) 2px
          )`,
          pointerEvents: "none",
        }}
      />

      {jitter && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: `${random(`noise-bar-${frame}`) * 80 + 10}%`,
            width: "100%",
            height: random(`noise-bar-h-${frame}`) * 30 + 10,
            background: `linear-gradient(to bottom, transparent, ${C.white}30, transparent)`,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 40,
          fontFamily: "monospace",
          fontSize: 18,
          color: C.white,
          textShadow: "2px 2px 0 rgba(0, 0, 0, 0.8)",
        }}
      >
        PLAY ▶ {`00:0${seconds.toFixed(2)}`}
      </div>
    </AbsoluteFill>
  );
};
