import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { Section5Sequence } from "./section5/Section5Sequence";

const fps = 60;
const durationInFrames = 75 * fps; // 75 seconds

export const LHS1140Section5Schema = z.object({});

export const LHS1140Section5Scene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Section5Sequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Section5",
  component: LHS1140Section5Scene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140Section5Schema,
};
