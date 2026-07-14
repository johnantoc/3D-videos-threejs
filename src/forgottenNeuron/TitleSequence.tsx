import { useVideoConfig } from "remotion";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
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

  const textGlitch: textGlitchSchema = {
    text: "THE FORGOTTEN NEURON",
    startDelay: 0,
    textAlign: "center",
    bgColor: "transparent",
  };

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={titleDuration}>
        <Bokeh />
        <TextGlitch
          text={textGlitch.text}
          startDelay={textGlitch.startDelay}
          textAlign={textGlitch.textAlign}
          bgColor={textGlitch.bgColor}
          glitchDuration={titleDuration}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: fps / 2,
        })}
      />
      <TransitionSeries.Sequence durationInFrames={titleDuration}>
        <EffectVHS
          startDuration={titleDuration}
          text="A journey through the depths of memory and cognition."
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export default TitleSequence;
