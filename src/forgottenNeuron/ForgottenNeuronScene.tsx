import React from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { AbsoluteFill } from "remotion";
import { TextGlitch } from "../common/textAnimations/TextGlitch";
import { Bokeh } from "../common/backgrounds/Bokeh";
import { Perceptron } from "./components/Perceptron";

const container: React.CSSProperties = {
  backgroundColor: "transparent",
};

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
  textGlitch: { text, startDelay: textGlitchStartDelay, textAlign, bgColor },
  bokeh: { startDelay: bokehStartDelay },
  neuron: { bgColor: neuronBgColor, lineColor, lineWidth, lineCap },
}) => {
  return (
    <AbsoluteFill style={container}>
      <Bokeh startDelay={bokehStartDelay} />
      <TextGlitch
        text={text}
        startDelay={textGlitchStartDelay}
        textAlign={textAlign}
        bgColor={bgColor}
      />
      <Perceptron
        bgColor={neuronBgColor}
        lineColor={lineColor}
        lineWidth={lineWidth}
        lineCap={lineCap}
      />
    </AbsoluteFill>
  );
};

export const composition = {
  id: "forgottenNeuron",
  component: ForgottenNeuronScene,
  fps: 30,
  durationInFrames: 150,
  width: 1920,
  height: 1080,
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
