import React from "react";
import { AbsoluteFill } from "remotion";
import { Starfield } from "./Starfield";
import { RedGlow } from "./RedGlow";
import { PlanetReveal } from "./PlanetReveal";
import { TextOverlay } from "./TextOverlay";

export const HookSequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Starfield />
      <RedGlow />
      <PlanetReveal />
      <TextOverlay />
    </AbsoluteFill>
  );
};
