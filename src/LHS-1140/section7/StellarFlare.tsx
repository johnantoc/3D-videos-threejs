import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const StellarFlare: React.FC = () => {
  const frame = useCurrentFrame();

  // Red dwarf star
  const starBasePulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.85, 1]);

  // Flare intensity (peaks around 5-10s)
  const flareIntensity = interpolate(
    frame,
    [0, 300, 600, 900, 1200, 1500],
    [0.3, 0.5, 1, 0.9, 0.6, 0.4],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Stellar wind particles
  const windParticles = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 60; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        y: seed(1) * 1800 + 180,
        speed: seed(2) * 8 + 4,
        size: seed(3) * 6 + 2,
        offset: seed(4) * 400,
        opacity: seed(5) * 0.5 + 0.3,
      });
    }
    return result;
  }, []);

  // Planet position
  const planetX = interpolate(frame, [0, 1500], [2800, 2600], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Atmosphere being stripped
  const stripAmount = interpolate(flareIntensity, [0.3, 1], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0508" }}>
      {/* Background stars */}
      {React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 60; i++) {
          const seed = (n: number) => {
            const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
            return x - Math.floor(x);
          };
          result.push(
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${seed(1) * 100}%`,
                top: `${seed(2) * 100}%`,
                width: seed(3) * 2 + 0.5,
                height: seed(3) * 2 + 0.5,
                borderRadius: "50%",
                backgroundColor: `rgba(255, 255, 255, ${seed(4) * 0.3 + 0.1})`,
              }}
            />
          );
        }
        return result;
      }, [])}

      {/* Red dwarf star */}
      <div
        style={{
          position: "absolute",
          left: 400,
          top: "50%",
          transform: `translate(-50%, -50%) scale(${starBasePulse})`,
        }}
      >
        {/* Flare corona */}
        <div
          style={{
            position: "absolute",
            left: -200,
            top: -200,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255, 80, 20, ${0.3 * flareIntensity}), rgba(255, 40, 10, ${0.15 * flareIntensity}), transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        {/* Flare jets */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const jetLength = interpolate(
            flareIntensity,
            [0.3, 1],
            [50, 200 + i * 15],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const rad = (angle * Math.PI) / 180;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 200 + Math.cos(rad) * 180,
                top: 200 + Math.sin(rad) * 180,
                width: jetLength,
                height: 8,
                background: `linear-gradient(90deg, rgba(255, 120, 30, ${0.8 * flareIntensity}), rgba(255, 60, 10, ${0.4 * flareIntensity}), transparent)`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0% 50%",
                filter: "blur(3px)",
              }}
            />
          );
        })}

        {/* Star body */}
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 100, 40, 1) 0%, rgba(220, 60, 20, 0.9) 30%, rgba(180, 40, 10, 0.7) 60%, rgba(120, 20, 5, 0.3) 80%, transparent 100%)",
            boxShadow: `0 0 ${60 + flareIntensity * 80}px rgba(255, 80, 30, ${0.4 + flareIntensity * 0.4}), 0 0 ${120 + flareIntensity * 120}px rgba(200, 50, 20, ${0.2 + flareIntensity * 0.3})`,
          }}
        />
      </div>

      {/* Stellar wind particles */}
      {windParticles.map((p, i) => {
        const xPos = ((frame * p.speed + p.offset) % 3200) + 400;
        const windOpacity = interpolate(xPos, [400, 1200, 2800], [0, flareIntensity * p.opacity, 0], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: xPos,
              top: p.y,
              width: p.size * 3,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(255, 140, 50, ${windOpacity})`,
              filter: "blur(1px)",
            }}
          />
        );
      })}

      {/* Planet being blasted */}
      <div
        style={{
          position: "absolute",
          left: planetX,
          top: "45%",
        }}
      >
        {/* Stripped atmosphere trail */}
        <div
          style={{
            position: "absolute",
            left: -200 * stripAmount,
            top: 30,
            width: 200 * stripAmount,
            height: 100,
            background: `linear-gradient(90deg, transparent, rgba(100, 160, 255, ${0.2 * stripAmount}))`,
            filter: "blur(10px)",
            borderRadius: "50%",
          }}
        />

        {/* Thin atmosphere (shrinking) */}
        <div
          style={{
            position: "absolute",
            left: -15 * (1 - stripAmount * 0.5),
            top: -15 * (1 - stripAmount * 0.5),
            width: 230 * (1 + stripAmount * 0.1),
            height: 230 * (1 + stripAmount * 0.1),
            borderRadius: "50%",
            border: `${2 * (1 - stripAmount * 0.5)}px solid rgba(100, 160, 255, ${0.15 * (1 - stripAmount * 0.5)})`,
            boxShadow: `0 0 ${15 * (1 - stripAmount)}px rgba(100, 160, 255, ${0.1 * (1 - stripAmount)})`,
          }}
        />

        {/* Planet body */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(140, 80, 50, 1) 0%, rgba(100, 50, 30, 1) 40%, rgba(60, 25, 15, 1) 70%, rgba(30, 12, 8, 1) 100%)",
            boxShadow:
              "inset -15px -10px 30px rgba(0, 0, 0, 0.7), inset 6px 6px 15px rgba(160, 90, 50, 0.2)",
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
          opacity: interpolate(frame, [600, 900], [0, 1], {
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
            fontSize: 64,
            fontWeight: 300,
            color: "rgba(255, 160, 80, 0.7)",
            letterSpacing: 8,
            fontStyle: "italic",
          }}
        >
          Stellar winds strip atmospheres from nearby planets
        </span>
      </div>
    </AbsoluteFill>
  );
};
