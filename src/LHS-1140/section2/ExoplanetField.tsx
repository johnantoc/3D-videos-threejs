import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

interface Exoplanet {
  x: number;
  y: number;
  orbitRadius: number;
  size: number;
  color: string;
  speed: number;
  startAngle: number;
  isRocky: boolean;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const rockyColors = ["#c1440e", "#b0a090", "#8b6f47", "#a0826d", "#9e7c5a"];
const gasColors = ["#c8a55a", "#e8d5a0", "#7ec8e3", "#d4a574", "#c4956a"];

export const ExoplanetField: React.FC = () => {
  const frame = useCurrentFrame();

  const exoplanets = useMemo<Exoplanet[]>(() => {
    const result: Exoplanet[] = [];
    for (let i = 0; i < 200; i++) {
      const isRocky = seededRandom(i * 5 + 10) > 0.6;
      const colors = isRocky ? rockyColors : gasColors;
      result.push({
        x: seededRandom(i * 4 + 1) * 3400 + 220,
        y: seededRandom(i * 4 + 2) * 1800 + 180,
        orbitRadius: seededRandom(i * 4 + 3) * 30 + 5,
        size: isRocky ? seededRandom(i * 4 + 4) * 8 + 3 : seededRandom(i * 4 + 4) * 20 + 10,
        color: colors[Math.floor(seededRandom(i * 4 + 5) * colors.length)],
        speed: seededRandom(i * 4 + 6) * 2 + 0.5,
        startAngle: seededRandom(i * 4 + 7) * 360,
        isRocky,
      });
    }
    return result;
  }, []);

  const fieldOpacity = interpolate(frame, [0, 600], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ opacity: fieldOpacity }}>
      {exoplanets.map((planet, i) => {
        const angle =
          (planet.startAngle + frame * planet.speed * 0.15) * (Math.PI / 180);
        const dx = Math.cos(angle) * planet.orbitRadius;
        const dy = Math.sin(angle) * planet.orbitRadius * 0.4;

        const twinkle = interpolate(
          Math.sin(frame * 0.03 + i * 1.7),
          [-1, 1],
          [0.5, 1]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: planet.x + dx,
              top: planet.y + dy,
              width: planet.size,
              height: planet.size,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.color}88)`,
              opacity: twinkle,
              boxShadow: `0 0 ${planet.size}px ${planet.color}44`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
