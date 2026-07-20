import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const Section4Text: React.FC = () => {
  const frame = useCurrentFrame();

  // "First confirmed atmosphere on a rocky habitable-zone exoplanet" (during side-by-side)
  const text1Opacity = interpolate(frame, [600, 900, 2400, 2700], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text1Y = interpolate(frame, [600, 900], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "A triumph of observational astronomy" (during other exoplanets)
  const text2Opacity = interpolate(
    frame,
    [2700, 3000, 4800, 5100],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  return (
    <AbsoluteFill>
      {/* "First confirmed atmosphere..." */}
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
            color: "rgba(255, 255, 255, 0.95)",
            letterSpacing: 6,
            textShadow: "0 0 30px rgba(100, 160, 255, 0.4)",
          }}
        >
          First confirmed atmosphere on a rocky habitable-zone exoplanet
        </span>
      </div>

      {/* "A triumph of observational astronomy" */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
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
            fontSize: 60,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.75)",
            letterSpacing: 6,
            fontStyle: "italic",
          }}
        >
          A triumph of observational astronomy
        </span>
      </div>
    </AbsoluteFill>
  );
};
