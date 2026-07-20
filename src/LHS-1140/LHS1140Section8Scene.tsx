import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { Section8Sequence } from "./section8/Section8Sequence";

const fps = 60;
const durationInFrames = 45 * fps; // 45 seconds

export const LHS1140Section8Schema = z.object({});

export const LHS1140Section8Scene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Section8Sequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Section8",
  component: LHS1140Section8Scene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140Section8Schema,
};
