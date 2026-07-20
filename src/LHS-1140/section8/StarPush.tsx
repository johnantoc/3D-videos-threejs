import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill, random } from "remotion";

export const StarPush: React.FC = () => {
  const frame = useCurrentFrame();

  const stars = React.useMemo(() => {
    return Array.from({ length: 300 }, (_, i) => ({
      x: random(`star-x-${i}`) * 3840,
      y: random(`star-y-${i}`) * 2160,
      size: random(`star-size-${i}`) * 3 + 1,
      brightness: random(`star-bright-${i}`) * 0.5 + 0.5,
      depth: random(`star-depth-${i}`) * 0.8 + 0.2,
    }));
  }, []);

  const pushProgress = interpolate(frame, [0, 2700], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050510" }}>
      {stars.map((star, i) => {
        const depthScale = 1 + star.depth * pushProgress * 2;
        const centerX = 1920;
        const centerY = 1080;
        const dx = (star.x - centerX) * (depthScale - 1);
        const dy = (star.y - centerY) * (depthScale - 1);
        const x = star.x - dx;
        const y = star.y - dy;
        const size = star.size * depthScale;
        const opacity = interpolate(
          pushProgress,
          [0, 0.3, 0.7, 1],
          [star.brightness, star.brightness, star.brightness * 0.6, star.brightness * 0.3],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: `rgba(255, 255, 255, ${opacity})`,
              boxShadow: size > 2 ? `0 0 ${size * 2}px rgba(255, 255, 255, ${opacity * 0.5})` : "none",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
