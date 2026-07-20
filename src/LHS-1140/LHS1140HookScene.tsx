import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { HookSequence } from "./hook/HookSequence";

const fps = 60;
const durationInFrames = 75 * fps; // 75 seconds = 1 minute 15 seconds

export const LHS1140HookSceneSchema = z.object({});

export const LHS1140HookScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <HookSequence />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "lhs1140Hook",
  component: LHS1140HookScene,
  durationInFrames,
  fps,
  width: 3840,
  height: 2160,
  schema: LHS1140HookSceneSchema,
};
