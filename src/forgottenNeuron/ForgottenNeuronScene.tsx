import React from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { AbsoluteFill } from "remotion";
import TitleSequence from "./TitleSequence";

const container: React.CSSProperties = {
  backgroundColor: "transparent",
};

//video configuration
const fps = 30;
const durationInFrames = 10 * fps; // 6 minutes at 30 fps
const width = 1920;
const height = 1080;

export const ForgottenNeuronSchema = z.object({
  textGlitch: z.object({
    text: z.string().default("FORGOTTEN NEURON"),
    startDelay: z.number().default(0),
    textAlign: z.enum(["left", "center", "right"]).default("center"),
    bgColor: zColor().default("transparent"),
  }),
  bokeh: z.object({
    startDelay: z.number().default(0),
  }),
  neuron: z.object({
    bgColor: zColor().default("#ff0000"),
    lineColor: zColor().default("#00ff00"),
    lineWidth: z.number().default(10),
    lineCap: z.enum(["butt", "round", "square"]).default("round"),
  }),
});

export const ForgottenNeuronScene: React.FC<{
  textGlitch: {
    text: string;
    startDelay: number;
    textAlign: "left" | "center" | "right";
    bgColor: string;
  };
  bokeh: {
    startDelay: number;
  };
  neuron: {
    bgColor: string;
    lineColor: string;
    lineWidth: number;
    lineCap: "butt" | "round" | "square";
  };
}> = ({
  textGlitch,
  bokeh,
  neuron: { bgColor: neuronBgColor, lineColor, lineWidth, lineCap },
}) => {
  return (
    <AbsoluteFill style={container}>
      <TitleSequence textGlitch={textGlitch} bokeh={bokeh} />
      {/* <Perceptron
        bgColor={neuronBgColor}
        lineColor={lineColor}
        lineWidth={lineWidth}
        lineCap={lineCap}
      /> */}
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
  defaultProps: {
    textGlitch: {
      text: "FORGOTTEN NEURON",
      startDelay: 0,
      textAlign: "center",
      bgColor: "transparent",
    },
    bokeh: {
      startDelay: 0,
    },
    neuron: {
      bgColor: "#ffffff",
      lineColor: "#00ff00",
      lineWidth: 10,
      lineCap: "round",
    },
  },
};
