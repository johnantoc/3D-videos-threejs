import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { Section3Sequence } from "./section3/Section3Sequence";

const fps = 60;
const durationInFrames = 105 * fps; // 105 seconds

export const LHS1140Section3Schema = z.object({});

export const LHS1140Section3Scene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Section3Sequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Section3",
  component: LHS1140Section3Scene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140Section3Schema,
};
