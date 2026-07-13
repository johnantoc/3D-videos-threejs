import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import TitleSequence from "./TitleSequence";
import HookSequence from "./HookSequence";

const container: React.CSSProperties = {
  backgroundColor: "transparent",
};

//video configuration
const fps = 30;
const durationInFrames = 20 * fps; // 6 minutes at 30 fps
const width = 1920;
const height = 1080;

export const ForgottenNeuronSchema = z.object({});

export const ForgottenNeuronScene: React.FC<{}> = ({}) => {
  const titleDuration = 5 * fps * 2;

  return (
    <AbsoluteFill style={container}>
      {/** Title */}
      <TitleSequence />
      {/** Hook */}
      <HookSequence startDelay={titleDuration} />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "forgottenNeuron",
  component: ForgottenNeuronScene,
  fps: fps,
  durationInFrames: durationInFrames,
  width: width,
  height: height,
  schema: ForgottenNeuronSchema,
  defaultProps: {},
};
