import React from "react";
import { Composition } from "remotion";
import { Section8Sequence } from "./section8/Section8Sequence";

export const LHS1140Section8Scene: React.FC = () => {
  return (
    <Composition
      id="lhs1140Section8"
      component={Section8Sequence}
      durationInFrames={2700}
      fps={60}
      width={3840}
      height={2160}
    />
  );
};
