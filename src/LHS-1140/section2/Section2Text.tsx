import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const Section2Text: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 text: "More than 6,000 worlds" (during exoplanet field)
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

  // Phase 2 text: "Rocky. Earth-sized. Habitable zone." (during habitable zone)
  const text2Opacity = interpolate(
    frame,
    [3000, 3300, 4800, 5100],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const text2Y = interpolate(frame, [3000, 3300], [50, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase 3 text: "An atmosphere is the difference" (end of section)
  const text3Opacity = interpolate(frame, [4500, 4800], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      {/* "More than 6,000 worlds" */}
      <div
        style={{
          position: "absolute",
          top: "8%",
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
            textShadow: "0 0 40px rgba(100, 160, 255, 0.4)",
          }}
        >
          More than 6,000 worlds discovered
        </span>
      </div>

      {/* "Rocky. Earth-sized. Habitable zone." */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: text2Opacity,
          translate: `0 ${text2Y}px`,
        }}
      >
        {["Rocky", "Earth-sized", "Habitable zone"].map((word, i) => {
          const wordOpacity = interpolate(
            frame,
            [3000 + i * 200, 3300 + i * 200],
            [0, 1],
            {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );
          return (
            <span
              key={word}
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 64,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.95)",
                letterSpacing: 4,
                opacity: wordOpacity,
                textShadow: "0 0 30px rgba(40, 200, 100, 0.4)",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* "An atmosphere is the difference" */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
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
            color: "rgba(200, 210, 230, 0.8)",
            letterSpacing: 4,
            fontStyle: "italic",
            textShadow: "0 0 20px rgba(100, 140, 200, 0.3)",
          }}
        >
          An atmosphere is the difference between a dead rock and a living world.
        </span>
      </div>
    </AbsoluteFill>
  );
};
