import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const Section7Text: React.FC = () => {
  const frame = useCurrentFrame();

  // "Not everyone is ready to celebrate" (during panel)
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

  // "Finding an atmosphere. Not proving life." (during panel)
  const text2Opacity = interpolate(
    frame,
    [2100, 2400, 3300, 3600],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // "More massive or magnetic field" (during magnetic shield)
  const text3Opacity = interpolate(frame, [4200, 4500], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      {/* "Not everyone is ready to celebrate" */}
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
            fontSize: 64,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: 6,
            textShadow: "0 0 30px rgba(100, 160, 255, 0.3)",
          }}
        >
          Not everyone is ready to celebrate
        </span>
      </div>

      {/* "Finding an atmosphere. Not proving life." */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: text2Opacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 72,
            fontWeight: 600,
            color: "rgba(40, 200, 120, 0.9)",
            letterSpacing: 4,
            textShadow: "0 0 20px rgba(40, 180, 100, 0.4)",
          }}
        >
          Finding an atmosphere.
        </span>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 72,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.7)",
            letterSpacing: 4,
          }}
        >
          Not proving life.
        </span>
      </div>

      {/* "More massive or a magnetic field" */}
      <div
        style={{
          position: "absolute",
          top: "6%",
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
            fontSize: 60,
            fontWeight: 400,
            color: "rgba(200, 220, 255, 0.85)",
            letterSpacing: 6,
          }}
        >
          A magnetic field or volcanic outgassing replenishes what the star
          takes away
        </span>
      </div>
    </AbsoluteFill>
  );
};
