import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { Section7Sequence } from "./section7/Section7Sequence";

const fps = 60;
const durationInFrames = 75 * fps; // 75 seconds

export const LHS1140Section7Schema = z.object({});

export const LHS1140Section7Scene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Section7Sequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Section7",
  component: LHS1140Section7Scene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140Section7Schema,
};
