import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { StarPush } from "./StarPush";
import { PlanetReveal } from "./PlanetReveal";
import { ConclusionText } from "./ConclusionText";

export const Section8Sequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Overall fade to black at end
  const masterFade = interpolate(frame, [2650, 2700], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <div style={{ opacity: masterFade }}>
        <StarPush />
        <PlanetReveal />
      </div>
      <ConclusionText />
    </AbsoluteFill>
  );
};
