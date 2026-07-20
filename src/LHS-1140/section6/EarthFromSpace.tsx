import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const EarthFromSpace: React.FC = () => {
  const frame = useCurrentFrame();

  // Earth rotation (surface texture shifts)
  const rotation = interpolate(frame, [0, 1500], [0, 60], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Phase 1: Earth full view (0-10s)
  // Phase 2: Zoom into forest (10-14s)
  // Phase 3: Zoom into coastline (14-18s)
  // Phase 4: Zoom into city at night (18-22s)
  // Phase 5: Pull back to tiny dot (22-25s)

  const zoomPhase = interpolate(frame, [0, 300, 600, 900, 1200, 1500], [1, 1.1, 3, 3, 3, 0.05], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const panX = interpolate(frame, [300, 600, 900, 1200], [0, -200, 200, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const panY = interpolate(frame, [300, 600, 900, 1200], [0, 100, -100, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Ecosystem labels
  const forestLabelOpacity = interpolate(frame, [400, 500, 550, 600], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const coastLabelOpacity = interpolate(frame, [700, 800, 850, 900], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const cityLabelOpacity = interpolate(frame, [1000, 1100, 1150, 1200], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Atmosphere glow
  const atmospherePulse = interpolate(Math.sin(frame * 0.015), [-1, 1], [0.8, 1]);

  // Pull-back fade
  const pullbackFade = interpolate(frame, [1300, 1500], [1, 0.3], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Stars (visible during pullback) */}
      {React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 200; i++) {
          const seed = (n: number) => {
            const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
            return x - Math.floor(x);
          };
          result.push({
            x: seed(1) * 100,
            y: seed(2) * 100,
            size: seed(3) * 3 + 0.5,
            brightness: seed(4) * 0.5 + 0.3,
            offset: seed(5) * 300,
          });
        }
        return result;
      }, []).map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: `rgba(255, 255, 255, ${star.brightness * pullbackFade})`,
          }}
        />
      ))}

      {/* Earth container with zoom/pan */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${panX}px, ${panY}px) scale(${zoomPhase})`,
          opacity: pullbackFade,
        }}
      >
        {/* Atmosphere glow - outer */}
        <div
          style={{
            position: "absolute",
            left: -60,
            top: -60,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, transparent 45%, rgba(70, 140, 240, 0.08) 60%, rgba(70, 140, 240, 0.2) 75%, rgba(70, 140, 240, 0.1) 90%, transparent 100%)",
            opacity: atmospherePulse,
            filter: "blur(12px)",
          }}
        />

        {/* Atmosphere rim light */}
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -20,
            width: 440,
            height: 440,
            borderRadius: "50%",
            border: "3px solid rgba(100, 170, 255, 0.15)",
            boxShadow: "0 0 25px rgba(70, 140, 240, 0.15)",
            opacity: atmospherePulse,
          }}
        />

        {/* Earth body */}
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 35%, #4a90d9, #2d6bb5, #1a4a8a, #0d2d5a)",
            boxShadow:
              "inset -40px -25px 70px rgba(0, 0, 0, 0.45), inset 12px 12px 35px rgba(100, 180, 255, 0.15)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Rotating surface features */}
          <div
            style={{
              position: "absolute",
              left: `${15 + rotation * 0.3}%`,
              top: "25%",
              width: "35%",
              height: "30%",
              borderRadius: "40%",
              background:
                "radial-gradient(ellipse, rgba(40, 130, 55, 0.65), rgba(30, 100, 40, 0.3), transparent)",
              filter: "blur(5px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${50 + rotation * 0.2}%`,
              top: "40%",
              width: "25%",
              height: "25%",
              borderRadius: "40%",
              background:
                "radial-gradient(ellipse, rgba(50, 140, 60, 0.55), transparent)",
              filter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${-5 + rotation * 0.25}%`,
              top: "55%",
              width: "20%",
              height: "18%",
              borderRadius: "40%",
              background:
                "radial-gradient(ellipse, rgba(45, 125, 50, 0.5), transparent)",
              filter: "blur(4px)",
            }}
          />

          {/* Clouds */}
          <div
            style={{
              position: "absolute",
              left: `${10 + rotation * 0.4}%`,
              top: "18%",
              width: "45%",
              height: "12%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(255, 255, 255, 0.35), transparent)",
              filter: "blur(6px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${40 + rotation * 0.35}%`,
              top: "60%",
              width: "35%",
              height: "10%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(255, 255, 255, 0.3), transparent)",
              filter: "blur(5px)",
            }}
          />

          {/* Ice caps */}
          <div
            style={{
              position: "absolute",
              left: "20%",
              top: "-5%",
              width: "60%",
              height: "15%",
              borderRadius: "0 0 50% 50%",
              background:
                "radial-gradient(ellipse, rgba(230, 240, 255, 0.5), transparent)",
              filter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "25%",
              bottom: "-3%",
              width: "50%",
              height: "12%",
              borderRadius: "50% 50% 0 0",
              background:
                "radial-gradient(ellipse, rgba(230, 240, 255, 0.4), transparent)",
              filter: "blur(3px)",
            }}
          />

          {/* City lights (visible during night side) */}
          <div
            style={{
              position: "absolute",
              right: "15%",
              top: "35%",
              width: "15%",
              height: "20%",
              opacity: interpolate(frame, [900, 1100], [0, 0.6], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
            }}
          >
            {[
              { x: 20, y: 10 },
              { x: 50, y: 30 },
              { x: 30, y: 60 },
              { x: 70, y: 45 },
              { x: 40, y: 80 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255, 220, 100, 0.8)",
                  boxShadow: "0 0 8px rgba(255, 200, 80, 0.5)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ecosystem labels */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: forestLabelOpacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 64,
            fontWeight: 300,
            color: "rgba(80, 200, 100, 0.85)",
            letterSpacing: 8,
            textShadow: "0 0 20px rgba(40, 160, 60, 0.4)",
          }}
        >
          Forests
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: coastLabelOpacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 64,
            fontWeight: 300,
            color: "rgba(80, 180, 240, 0.85)",
            letterSpacing: 8,
            textShadow: "0 0 20px rgba(60, 140, 220, 0.4)",
          }}
        >
          Coastlines
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: cityLabelOpacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 64,
            fontWeight: 300,
            color: "rgba(255, 220, 100, 0.85)",
            letterSpacing: 8,
            textShadow: "0 0 20px rgba(255, 200, 80, 0.4)",
          }}
        >
          Cities at Night
        </span>
      </div>
    </AbsoluteFill>
  );
};
