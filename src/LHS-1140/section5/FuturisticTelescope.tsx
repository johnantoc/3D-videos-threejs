import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";

export const FuturisticTelescope: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Rocket launch (0-8s)
  const rocketY = interpolate(frame, [0, 240, 480], [900, 200, -400], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const rocketOpacity = interpolate(frame, [0, 120, 420, 540], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Exhaust flame flicker
  const flameFlicker = interpolate(
    Math.sin(frame * 0.8),
    [-1, 1],
    [0.7, 1]
  );

  // Phase 2: Telescope in orbit (8-18s)
  const telescopeOpacity = interpolate(frame, [480, 720], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase 3: Unfolding (12-22s)
  const unfoldProgress = interpolate(frame, [720, 1320], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Gentle float
  const floatY = interpolate(Math.sin(frame * 0.012), [-1, 1], [-10, 10]);

  // Stars
  const stars = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 120; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        x: seed(1) * 100,
        y: seed(2) * 100,
        size: seed(3) * 3 + 1,
        brightness: seed(4) * 0.4 + 0.2,
        offset: seed(5) * 300,
      });
    }
    return result;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Stars */}
      {stars.map((star, i) => {
        const twinkle = interpolate(
          Math.sin(frame * 0.04 + star.offset),
          [-1, 1],
          [0.3, 1]
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
              backgroundColor: `rgba(255, 255, 255, ${star.brightness * twinkle})`,
            }}
          />
        );
      })}

      {/* Earth horizon glow at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 4000,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(60, 120, 200, 0.15) 0%, transparent 70%)",
          opacity: interpolate(frame, [0, 300], [0.8, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      />

      {/* Rocket */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: rocketY,
          transform: "translateX(-50%)",
          opacity: rocketOpacity,
        }}
      >
        {/* Exhaust flame */}
        <div
          style={{
            position: "absolute",
            left: -25,
            top: 180,
            width: 50,
            height: interpolate(frame, [0, 480], [60, 200], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
            borderRadius: "0 0 50% 50%",
            background:
              "linear-gradient(180deg, rgba(255, 200, 60, 0.9), rgba(255, 120, 20, 0.7), rgba(255, 60, 10, 0.3), transparent)",
            opacity: flameFlicker,
            filter: "blur(4px)",
          }}
        />
        {/* Rocket body */}
        <div
          style={{
            width: 50,
            height: 180,
            background:
              "linear-gradient(180deg, rgba(220, 220, 230, 0.95), rgba(180, 185, 195, 0.9), rgba(140, 145, 155, 0.85))",
            borderRadius: "25px 25px 6px 6px",
            position: "relative",
          }}
        >
          {/* Nose cone */}
          <div
            style={{
              position: "absolute",
              left: 5,
              top: -30,
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: "35px solid rgba(200, 200, 210, 0.95)",
            }}
          />
          {/* Window */}
          <div
            style={{
              position: "absolute",
              left: 15,
              top: 40,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(100, 180, 255, 0.8), rgba(60, 120, 200, 0.6))",
              border: "2px solid rgba(160, 165, 175, 0.8)",
            }}
          />
          {/* Fins */}
          <div
            style={{
              position: "absolute",
              left: -15,
              bottom: 0,
              width: 0,
              height: 0,
              borderTop: "40px solid transparent",
              borderRight: "20px solid rgba(170, 175, 185, 0.9)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -15,
              bottom: 0,
              width: 0,
              height: 0,
              borderTop: "40px solid transparent",
              borderLeft: "20px solid rgba(170, 175, 185, 0.9)",
            }}
          />
        </div>
      </div>

      {/* Futuristic telescope in orbit */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: `translate(-50%, -50%) translateY(${floatY}px)`,
          opacity: telescopeOpacity,
        }}
      >
        {/* Solar panels */}
        <div
          style={{
            position: "absolute",
            left: interpolate(unfoldProgress, [0, 1], [0, -350]),
            top: -20,
            width: interpolate(unfoldProgress, [0, 1], [10, 300]),
            height: 40,
            background:
              "linear-gradient(180deg, rgba(40, 80, 160, 0.9), rgba(30, 60, 130, 0.85))",
            borderRadius: 4,
            boxShadow: "0 0 15px rgba(40, 80, 160, 0.3)",
            opacity: unfoldProgress,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: interpolate(unfoldProgress, [0, 1], [0, -350]),
            top: -20,
            width: interpolate(unfoldProgress, [0, 1], [10, 300]),
            height: 40,
            background:
              "linear-gradient(180deg, rgba(40, 80, 160, 0.9), rgba(30, 60, 130, 0.85))",
            borderRadius: 4,
            boxShadow: "0 0 15px rgba(40, 80, 160, 0.3)",
            opacity: unfoldProgress,
          }}
        />

        {/* Telescope tube */}
        <div
          style={{
            width: 100,
            height: 200,
            background:
              "linear-gradient(180deg, rgba(200, 200, 210, 0.9), rgba(160, 165, 175, 0.85), rgba(120, 125, 135, 0.8))",
            borderRadius: "10px 10px 6px 6px",
            position: "relative",
          }}
        >
          {/* Aperture */}
          <div
            style={{
              position: "absolute",
              left: 15,
              top: -10,
              width: 70,
              height: 70,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(20, 30, 60, 0.9), rgba(40, 60, 100, 0.7))",
              border: "3px solid rgba(160, 170, 190, 0.6)",
            }}
          />
          {/*镜筒纹理 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: 80 + i * 25,
                width: "100%",
                height: 1,
                background: "rgba(100, 105, 115, 0.4)",
              }}
            />
          ))}
        </div>

        {/* Bus */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 200,
            width: 60,
            height: 40,
            background:
              "linear-gradient(180deg, rgba(140, 145, 155, 0.9), rgba(100, 105, 115, 0.85))",
            borderRadius: 4,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [1200, 1500], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 80,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.7)",
            letterSpacing: 12,
            textTransform: "uppercase",
          }}
        >
          Next Generation Space Telescopes
        </span>
      </div>
    </AbsoluteFill>
  );
};
