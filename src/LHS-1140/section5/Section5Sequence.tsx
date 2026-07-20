import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { FuturisticTelescope } from "./FuturisticTelescope";
import { DualObservatory } from "./DualObservatory";
import { QuestionToPossible } from "./QuestionToPossible";
import { Section5Text } from "./Section5Text";

const fps = 60;

export const Section5Sequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Futuristic telescope: 0-27s, fades out 23-27s
  const telescopeOpacity = interpolate(frame, [23 * fps, 27 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Dual observatory: fades in 23-27s, fades out 50-54s
  const dualOpacity = interpolate(
    frame,
    [23 * fps, 27 * fps, 50 * fps, 54 * fps],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Question to possible: fades in 50-54s
  const possibleOpacity = interpolate(frame, [50 * fps, 54 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Phase 1: Futuristic telescope launch + deployment */}
      <AbsoluteFill style={{ opacity: telescopeOpacity }}>
        <FuturisticTelescope />
      </AbsoluteFill>

      {/* Phase 2: JWST + HWO dual observatory */}
      <AbsoluteFill style={{ opacity: dualOpacity }}>
        <DualObservatory />
      </AbsoluteFill>

      {/* Phase 3: Question mark → Possible */}
      <AbsoluteFill style={{ opacity: possibleOpacity }}>
        <QuestionToPossible />
      </AbsoluteFill>

      {/* Text overlay */}
      <Section5Text />
    </AbsoluteFill>
  );
};
