import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const Section3Text: React.FC = () => {
  const frame = useCurrentFrame();

  // "Published in the journal Science" (during JWST)
  const text1Opacity = interpolate(frame, [300, 600, 2100, 2400], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text1Y = interpolate(frame, [300, 600], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "48 light-years from Earth" (during transit)
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

  const text2Y = interpolate(frame, [2700, 3000], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "What they found was helium" (during spectrograph)
  const text3Opacity = interpolate(frame, [5400, 5700], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      {/* "Published in the journal Science" */}
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
            fontSize: 104,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.8)",
            letterSpacing: 10,
            fontStyle: "italic",
          }}
        >
          Published in the journal Science
        </span>
      </div>

      {/* "LHS 1140b — 48 light-years from Earth" */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: text2Opacity,
          translate: `0 ${text2Y}px`,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 128,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.95)",
            letterSpacing: 10,
            textShadow: "0 0 30px rgba(255, 100, 40, 0.4)",
          }}
        >
          LHS 1140b
        </span>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 80,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.7)",
            letterSpacing: 14,
          }}
        >
          48 light-years from Earth
        </span>
      </div>

      {/* "What they found was helium." */}
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
            fontSize: 112,
            fontWeight: 400,
            color: "rgba(200, 220, 240, 0.9)",
            letterSpacing: 8,
            textShadow: "0 0 20px rgba(0, 180, 220, 0.3)",
          }}
        >
          What they found was helium.
        </span>
      </div>
    </AbsoluteFill>
  );
};
