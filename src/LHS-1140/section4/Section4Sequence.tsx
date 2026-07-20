import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { SideBySide } from "./SideBySide";
import { OtherExoplanets } from "./OtherExoplanets";
import { CertaintyConclusion } from "./CertaintyConclusion";
import { Section4Text } from "./Section4Text";

const fps = 60;

export const Section4Sequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Side-by-side: 0-32s, fades out 28-32s
  const sideBySideOpacity = interpolate(frame, [28 * fps, 32 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Other exoplanets: fades in 28-32s, fades out 58-62s
  const otherOpacity = interpolate(
    frame,
    [28 * fps, 32 * fps, 58 * fps, 62 * fps],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Certainty: fades in 58-62s
  const certaintyOpacity = interpolate(frame, [58 * fps, 62 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Phase 1: Side-by-side comparison */}
      <AbsoluteFill style={{ opacity: sideBySideOpacity }}>
        <SideBySide />
      </AbsoluteFill>

      {/* Phase 2: Other exoplanets */}
      <AbsoluteFill style={{ opacity: otherOpacity }}>
        <OtherExoplanets />
      </AbsoluteFill>

      {/* Phase 3: Certainty conclusion */}
      <AbsoluteFill style={{ opacity: certaintyOpacity }}>
        <CertaintyConclusion />
      </AbsoluteFill>

      {/* Text overlay */}
      <Section4Text />
    </AbsoluteFill>
  );
};
