import React from "react";
import { AbsoluteFill } from "remotion";
import { StarPush } from "./StarPush";
import { PlanetReveal } from "./PlanetReveal";
import { ConclusionText } from "./ConclusionText";

export const Section8Sequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050510" }}>
      <StarPush />
      <PlanetReveal />
      <ConclusionText />
    </AbsoluteFill>
  );
};
