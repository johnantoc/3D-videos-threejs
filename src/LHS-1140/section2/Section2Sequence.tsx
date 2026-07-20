import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { SolarSystem } from "./SolarSystem";
import { ExoplanetField } from "./ExoplanetField";
import { HabitableZone } from "./HabitableZone";
import { Section2Text } from "./Section2Text";

const fps = 60;

export const Section2Sequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Solar system: visible 0-25s, fades out 20-25s
  const solarOpacity = interpolate(frame, [20 * fps, 25 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Exoplanet field: fades in 20-25s, fades out 45-50s
  const exoplanetOpacity = interpolate(
    frame,
    [20 * fps, 25 * fps, 45 * fps, 50 * fps],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Habitable zone: fades in 45-50s
  const habitableOpacity = interpolate(frame, [45 * fps, 50 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Camera zoom for solar system phase
  const solarZoom = interpolate(frame, [0, 25 * fps], [1, 2.5], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Phase 1: Solar system */}
      <AbsoluteFill
        style={{
          opacity: solarOpacity,
          scale: `${solarZoom}`,
        }}
      >
        <SolarSystem />
      </AbsoluteFill>

      {/* Phase 2: Exoplanet field */}
      <AbsoluteFill style={{ opacity: exoplanetOpacity }}>
        <ExoplanetField />
      </AbsoluteFill>

      {/* Phase 3: Habitable zone diagram */}
      <AbsoluteFill style={{ opacity: habitableOpacity }}>
        <HabitableZone />
      </AbsoluteFill>

      {/* Text overlay spans entire section */}
      <Section2Text />
    </AbsoluteFill>
  );
};
