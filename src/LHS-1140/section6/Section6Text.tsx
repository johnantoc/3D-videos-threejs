import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const Section6Text: React.FC = () => {
  const frame = useCurrentFrame();

  // "It tells us something about ourselves" (during Earth from space)
  const text1Opacity = interpolate(frame, [300, 600, 1800, 2100], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text1Y = interpolate(frame, [300, 600], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Not unique to our solar system" (during early earth)
  const text2Opacity = interpolate(
    frame,
    [2400, 2700, 4200, 4500],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // "Does not guarantee life" (during cosmic scale)
  const text3Opacity = interpolate(frame, [4200, 4500], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      {/* "It tells us something about ourselves" */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: text1Opacity,
          translate: `0 ${text1Y}px`,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 72,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: 6,
            textShadow: "0 0 30px rgba(100, 160, 255, 0.3)",
          }}
        >
          It tells us something about ourselves
        </span>
      </div>

      {/* "Atmospheres are not unique to our solar system" */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: text2Opacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 64,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: 6,
            textShadow: "0 0 30px rgba(100, 160, 255, 0.3)",
          }}
        >
          Atmospheres are not unique to our solar system
        </span>
      </div>

      {/* "This does not guarantee life." */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: text3Opacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 56,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.75)",
            letterSpacing: 6,
          }}
        >
          This does not guarantee life.
        </span>
      </div>
    </AbsoluteFill>
  );
};
