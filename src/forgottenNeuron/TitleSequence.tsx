import { Series, useVideoConfig } from "remotion";

import { Bokeh } from "../common/backgrounds/Bokeh";
import { TextGlitch } from "../common/textAnimations/TextGlitch";
import { EffectVHS } from "../common/effects/EffectVHS";

type textGlitchSchema = {
  text: string;
  startDelay: number;
  textAlign: "left" | "center" | "right";
  bgColor: string;
};

const TitleSequence = () => {
  const { fps } = useVideoConfig();
  const titleDuration = 5 * fps; // 5 seconds duration for the glitch effect
  const numOfSeriesComponent = 2;
  const seriesTotalDuration = titleDuration * numOfSeriesComponent; // no of series components

  const textGlitch: textGlitchSchema = {
    text: "THE FORGOTTEN NEURON",
    startDelay: 0,
    textAlign: "center",
    bgColor: "transparent",
  };

  return (
    <Series durationInFrames={seriesTotalDuration}>
      <Series.Sequence durationInFrames={titleDuration}>
        <Bokeh />
        <TextGlitch
          text={textGlitch.text}
          startDelay={textGlitch.startDelay}
          textAlign={textGlitch.textAlign}
          bgColor={textGlitch.bgColor}
          glitchDuration={titleDuration}
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={titleDuration}>
        <EffectVHS
          startDuration={titleDuration}
          text="A journey through the depths of memory and cognition."
        />
      </Series.Sequence>
    </Series>
  );
};

export default TitleSequence;
