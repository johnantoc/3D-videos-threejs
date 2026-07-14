import React from "react";
import { z } from "zod";
import { AbsoluteFill } from "remotion";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import TitleSequence from "./TitleSequence";
import SubTitleSequence from "./SubTitleSequence";
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
  const defaultDuration = 5 * fps;

  return (
    <AbsoluteFill style={container}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={defaultDuration}>
          {/** Title */}
          <TitleSequence />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: fps / 2,
          })}
        />
        <TransitionSeries.Sequence durationInFrames={defaultDuration}>
          {/** Sub Tilte */}
          <SubTitleSequence />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: fps / 2,
          })}
        />
        <TransitionSeries.Sequence durationInFrames={defaultDuration}>
          {/** Hook */}
          <HookSequence />
        </TransitionSeries.Sequence>
      </TransitionSeries>
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
