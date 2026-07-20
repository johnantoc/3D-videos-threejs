import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { EarthFromSpace } from "./EarthFromSpace";
import { EarlyEarth } from "./EarlyEarth";
import { CosmicScale } from "./CosmicScale";
import { Section6Text } from "./Section6Text";

const fps = 60;

export const Section6Sequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Earth from space: 0-27s, fades out 23-27s
  const earthOpacity = interpolate(frame, [23 * fps, 27 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Early earth: fades in 23-27s, fades out 50-54s
  const earlyOpacity = interpolate(
    frame,
    [23 * fps, 27 * fps, 50 * fps, 54 * fps],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Cosmic scale: fades in 50-54s
  const cosmicOpacity = interpolate(frame, [50 * fps, 54 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Phase 1: Earth from space */}
      <AbsoluteFill style={{ opacity: earthOpacity }}>
        <EarthFromSpace />
      </AbsoluteFill>

      {/* Phase 2: Early Earth formation */}
      <AbsoluteFill style={{ opacity: earlyOpacity }}>
        <EarlyEarth />
      </AbsoluteFill>

      {/* Phase 3: Cosmic scale */}
      <AbsoluteFill style={{ opacity: cosmicOpacity }}>
        <CosmicScale />
      </AbsoluteFill>

      {/* Text overlay */}
      <Section6Text />
    </AbsoluteFill>
  );
};
