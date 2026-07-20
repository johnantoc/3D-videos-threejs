import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const Section5Text: React.FC = () => {
  const frame = useCurrentFrame();

  // "The next step: Carbon dioxide. Methane. Water vapor. Oxygen." (during telescope)
  const text1Opacity = interpolate(frame, [600, 900, 2100, 2400], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const text1Y = interpolate(frame, [600, 900], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Atmospheric spectra for dozens of planets" (during dual observatory)
  const text2Opacity = interpolate(
    frame,
    [2700, 3000, 4200, 4500],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // "The question now is what those atmospheres contain" (during possible)
  const text3Opacity = interpolate(frame, [3600, 3900], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      {/* "The next step" gases */}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 60,
              fontWeight: 300,
              color: "rgba(200, 210, 230, 0.7)",
              letterSpacing: 6,
            }}
          >
            The next step is to look for
          </span>
          <div style={{ display: "flex", gap: 40 }}>
            {["CO₂", "CH₄", "H₂O", "O₂"].map((gas, i) => {
              const gasOpacity = interpolate(
                frame,
                [900 + i * 150, 1050 + i * 150],
                [0, 1],
                {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }
              );
              return (
                <span
                  key={gas}
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: 72,
                    fontWeight: 600,
                    color: "rgba(100, 200, 160, 0.9)",
                    letterSpacing: 4,
                    opacity: gasOpacity,
                    textShadow: "0 0 20px rgba(80, 180, 140, 0.4)",
                  }}
                >
                  {gas}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* "Atmospheric spectra for dozens of planets" */}
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
          Atmospheric spectra for dozens of rocky planets
        </span>
      </div>

      {/* "The question now is what those atmospheres contain" */}
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
            color: "rgba(200, 210, 230, 0.75)",
            letterSpacing: 6,
            fontStyle: "italic",
          }}
        >
          The question now is what those atmospheres contain.
        </span>
      </div>
    </AbsoluteFill>
  );
};
