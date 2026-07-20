import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { Section4Sequence } from "./section4/Section4Sequence";

const fps = 60;
const durationInFrames = 75 * fps; // 75 seconds

export const LHS1140Section4Schema = z.object({});

export const LHS1140Section4Scene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Section4Sequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Section4",
  component: LHS1140Section4Scene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140Section4Schema,
};
