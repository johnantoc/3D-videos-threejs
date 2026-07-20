import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { Section6Sequence } from "./section6/Section6Sequence";

const fps = 60;
const durationInFrames = 75 * fps; // 75 seconds

export const LHS1140Section6Schema = z.object({});

export const LHS1140Section6Scene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Section6Sequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Section6",
  component: LHS1140Section6Scene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140Section6Schema,
};
