import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleOffset: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const Starfield: React.FC = () => {
  const frame = useCurrentFrame();

  const stars = useMemo<Star[]>(() => {
    const result: Star[] = [];
    for (let i = 0; i < 300; i++) {
      result.push({
        x: seededRandom(i * 3 + 1) * 100,
        y: seededRandom(i * 3 + 2) * 100,
        size: seededRandom(i * 3 + 3) * 5 + 1,
        brightness: seededRandom(i * 7 + 4) * 0.6 + 0.4,
        twinkleOffset: seededRandom(i * 7 + 5) * 400,
      });
    }
    return result;
  }, []);

  const driftX = interpolate(frame, [0, 4500], [0, -15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const driftY = interpolate(frame, [0, 4500], [0, -8], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill>
      {stars.map((star, i) => {
        const twinkle = interpolate(
          Math.sin((frame + star.twinkleOffset) * 0.025),
          [-1, 1],
          [0.3, 1]
        );

        const opacity = star.brightness * twinkle;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x + driftX}%`,
              top: `${star.y + driftY}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: `rgba(255, 255, 255, ${opacity})`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${opacity * 0.5})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
