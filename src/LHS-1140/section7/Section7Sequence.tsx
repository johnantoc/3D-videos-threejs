import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { ScientistPanel } from "./ScientistPanel";
import { StellarFlare } from "./StellarFlare";
import { MagneticShield } from "./MagneticShield";
import { Section7Text } from "./Section7Text";

const fps = 60;

export const Section7Sequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Scientist panel: 0-27s, fades out 23-27s
  const panelOpacity = interpolate(frame, [23 * fps, 27 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Stellar flare: fades in 23-27s, fades out 50-54s
  const flareOpacity = interpolate(
    frame,
    [23 * fps, 27 * fps, 50 * fps, 54 * fps],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Magnetic shield: fades in 50-54s
  const shieldOpacity = interpolate(frame, [50 * fps, 54 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a18" }}>
      {/* Phase 1: Scientist panel debate */}
      <AbsoluteFill style={{ opacity: panelOpacity }}>
        <ScientistPanel />
      </AbsoluteFill>

      {/* Phase 2: Stellar flare */}
      <AbsoluteFill style={{ opacity: flareOpacity }}>
        <StellarFlare />
      </AbsoluteFill>

      {/* Phase 3: Magnetic shield */}
      <AbsoluteFill style={{ opacity: shieldOpacity }}>
        <MagneticShield />
      </AbsoluteFill>

      {/* Text overlay */}
      <Section7Text />
    </AbsoluteFill>
  );
};
