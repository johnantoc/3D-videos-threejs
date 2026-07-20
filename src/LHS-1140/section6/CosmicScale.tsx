import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const CosmicScale: React.FC = () => {
  const frame = useCurrentFrame();

  // Dense starfield
  const stars = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 400; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        x: seed(1) * 100,
        y: seed(2) * 100,
        size: seed(3) * 3 + 0.5,
        brightness: seed(4) * 0.6 + 0.2,
        offset: seed(5) * 400,
        hue: seed(6) * 40 + 200,
      });
    }
    return result;
  }, []);

  // Tiny Earth dot
  const earthOpacity = interpolate(frame, [0, 450], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const earthScale = interpolate(frame, [0, 450], [3, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Sample size of one" text
  const text1Opacity = interpolate(frame, [450, 750], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Orders of magnitude" text
  const text2Opacity = interpolate(frame, [1200, 1500], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Removes one of the strongest arguments" text
  const text3Opacity = interpolate(frame, [1800, 2100], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000208" }}>
      {/* Dense starfield */}
      {stars.map((star, i) => {
        const twinkle = interpolate(
          Math.sin(frame * 0.03 + star.offset),
          [-1, 1],
          [0.4, 1]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: `hsla(${star.hue}, 20%, 90%, ${star.brightness * twinkle})`,
            }}
          />
        );
      })}

      {/* Tiny Earth dot at center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: `translate(-50%, -50%) scale(${earthScale})`,
          opacity: earthOpacity,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100, 170, 240, 0.9), rgba(60, 120, 200, 0.7))",
            boxShadow:
              "0 0 8px rgba(80, 150, 230, 0.5), 0 0 20px rgba(60, 120, 200, 0.2)",
          }}
        />
      </div>

      {/* "Sample size of one" */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: text1Opacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 72,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: 8,
            textShadow: "0 0 30px rgba(100, 160, 255, 0.3)",
          }}
        >
          A sample size of one
        </span>
      </div>

      {/* "Orders of magnitude" */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
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
            fontWeight: 400,
            color: "rgba(200, 220, 255, 0.85)",
            letterSpacing: 6,
          }}
        >
          Potentially habitable worlds — by orders of magnitude
        </span>
      </div>

      {/* "Removes one of the strongest arguments" */}
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
            color: "rgba(180, 200, 230, 0.75)",
            letterSpacing: 6,
            fontStyle: "italic",
          }}
        >
          It removes one of the strongest arguments against it.
        </span>
      </div>
    </AbsoluteFill>
  );
};
