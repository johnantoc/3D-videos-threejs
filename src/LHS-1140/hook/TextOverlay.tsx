import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const TextOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  const text1Opacity = interpolate(frame, [900, 1080, 1800, 2040], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text1Y = interpolate(frame, [900, 1080], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text2Opacity = interpolate(
    frame,
    [2400, 2640, 3600, 3840],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const text2Y = interpolate(frame, [2400, 2640], [60, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text3Opacity = interpolate(frame, [3900, 4140], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text3Scale = interpolate(frame, [3900, 4140], [0.9, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      {/* "48 light-years away" */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
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
            fontSize: 84,
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: 16,
            textTransform: "uppercase",
            textShadow: "0 0 60px rgba(100, 160, 255, 0.4)",
          }}
        >
          48 light-years away
        </span>
      </div>

      {/* "They found an atmosphere." */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: text2Opacity,
          translate: `0 ${text2Y}px`,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 112,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 1)",
            letterSpacing: 8,
            textShadow:
              "0 0 80px rgba(100, 160, 255, 0.6), 0 0 160px rgba(80, 120, 200, 0.3)",
          }}
        >
          They found an atmosphere.
        </span>
      </div>

      {/* Title card */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: text3Opacity,
          scale: `${text3Scale}`,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 56,
            fontWeight: 300,
            color: "rgba(200, 200, 220, 0.7)",
            letterSpacing: 24,
            textTransform: "uppercase",
          }}
        >
          A Breath Beyond Earth
        </span>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 40,
            fontWeight: 300,
            color: "rgba(160, 170, 200, 0.5)",
            letterSpacing: 12,
          }}
        >
          The Discovery of LHS 1140b
        </span>
      </div>
    </AbsoluteFill>
  );
};
