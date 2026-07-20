import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { Section2Sequence } from "./section2/Section2Sequence";

const fps = 60;
const durationInFrames = 90 * fps; // 90 seconds

export const LHS1140Section2Schema = z.object({});

export const LHS1140Section2Scene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Section2Sequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Section2",
  component: LHS1140Section2Scene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140Section2Schema,
};
