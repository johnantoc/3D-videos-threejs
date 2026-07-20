import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const JWSTUnfold: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Telescope folded, floating in space (0-10s)
  const telescopeOpacity = interpolate(frame, [0, 120], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase 2: Primary mirror unfolds (10-20s)
  const mirrorUnfold = interpolate(frame, [600, 1200], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase 3: Sunshield deploys (15-25s)
  const sunshieldDeploy = interpolate(frame, [900, 1500], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Phase 4: Secondary mirror extends (20-28s)
  const secondaryExtend = interpolate(frame, [1200, 1680], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Gentle float
  const floatY = interpolate(Math.sin(frame * 0.015), [-1, 1], [-8, 8]);

  // Star field twinkle
  const stars = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 150; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        x: seed(1) * 100,
        y: seed(2) * 100,
        size: seed(3) * 4 + 1,
        brightness: seed(4) * 0.5 + 0.5,
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

      {/* JWST Telescope */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translateY(${floatY}px)`,
          opacity: telescopeOpacity,
        }}
      >
        {/* Sunshield - 4 layers deploying */}
        {[0, 1, 2, 3].map((layer) => {
          const layerDelay = layer * 0.15;
          const layerProgress = interpolate(
            sunshieldDeploy,
            [layerDelay, layerDelay + 0.6],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const layerWidth = interpolate(layerProgress, [0, 1], [80, 600]);
          const layerHeight = interpolate(layerProgress, [0, 1], [10, 30]);
          const layerY = interpolate(layerProgress, [0, 1], [0, 120 + layer * 25]);

          return (
            <div
              key={layer}
              style={{
                position: "absolute",
                left: -layerWidth / 2,
                top: layerY,
                width: layerWidth,
                height: layerHeight,
                background: `linear-gradient(180deg, rgba(180, 190, 210, ${0.9 - layer * 0.15}), rgba(140, 150, 170, ${0.7 - layer * 0.1}))`,
                borderRadius: 4,
                boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
              }}
            />
          );
        })}

        {/* Primary mirror - hexagonal segments */}
        <div
          style={{
            position: "absolute",
            left: -140,
            top: -160,
            width: 280,
            height: 280,
            opacity: mirrorUnfold,
          }}
        >
          {/* Central segment */}
          <div
            style={{
              position: "absolute",
              left: 100,
              top: 100,
              width: 80,
              height: 80,
              background:
                "linear-gradient(135deg, rgba(210, 190, 140, 0.95), rgba(180, 160, 110, 0.85))",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              boxShadow: "inset 0 0 15px rgba(255,220,150,0.3)",
            }}
          />
          {/* Surrounding segments */}
          {[0, 1, 2, 3, 4, 5].map((seg) => {
            const angle = seg * 60 - 90;
            const rad = (angle * Math.PI) / 180;
            const segProgress = interpolate(
              mirrorUnfold,
              [seg * 0.1, seg * 0.1 + 0.5],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            const cx = 140 + Math.cos(rad) * 80;
            const cy = 140 + Math.sin(rad) * 80;

            return (
              <div
                key={seg}
                style={{
                  position: "absolute",
                  left: cx - 38,
                  top: cy - 38,
                  width: 76,
                  height: 76,
                  background:
                    "linear-gradient(135deg, rgba(210, 190, 140, 0.9), rgba(170, 150, 100, 0.8))",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  opacity: segProgress,
                  transform: `scale(${segProgress})`,
                }}
              />
            );
          })}
        </div>

        {/* Secondary mirror support struts */}
        <div
          style={{
            position: "absolute",
            left: -3,
            top: -200,
            width: 6,
            height: 80,
            background: "rgba(160, 170, 190, 0.8)",
            opacity: secondaryExtend,
            transformOrigin: "bottom center",
            transform: `scaleY(${secondaryExtend})`,
          }}
        />
        {/* Secondary mirror */}
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -220,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200, 180, 130, 0.9), rgba(160, 140, 90, 0.7))",
            opacity: secondaryExtend,
            boxShadow: "0 0 20px rgba(200, 180, 130, 0.3)",
          }}
        />

        {/* Bus / spacecraft body */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: 50,
            width: 60,
            height: 50,
            background:
              "linear-gradient(180deg, rgba(100, 110, 130, 0.9), rgba(70, 80, 100, 0.8))",
            borderRadius: 4,
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [1800, 2100], [0, 1], {
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
            fontSize: 88,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.7)",
            letterSpacing: 12,
            textTransform: "uppercase",
          }}
        >
          James Webb Space Telescope
        </span>
      </div>
    </AbsoluteFill>
  );
};
