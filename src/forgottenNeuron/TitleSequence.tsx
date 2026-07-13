import { Sequence, useVideoConfig } from "remotion";
import { Bokeh } from "../common/backgrounds/Bokeh";
import { TextGlitch } from "../common/textAnimations/TextGlitch";
import { EffectVHS } from "../common/effects/EffectVHS";

const TitleSequence = ({
  textGlitch,
  bokeh: { startDelay },
}: {
  textGlitch: any;
  bokeh: any;
}) => {
  const { fps } = useVideoConfig();
  const glitchStartFrame = textGlitch.startDelay * fps;
  const glitchDuration = 5 * fps; // 5 seconds duration for the glitch effect

  return (
    <>
      <Sequence from={glitchStartFrame} durationInFrames={glitchDuration}>
        <Bokeh startDelay={startDelay} />
        <TextGlitch
          text={textGlitch.text}
          startDelay={textGlitch.startDelay}
          textAlign={textGlitch.textAlign}
          bgColor={textGlitch.bgColor}
          glitchDuration={glitchDuration}
        />
      </Sequence>
      <Sequence from={glitchDuration} durationInFrames={glitchDuration}>
        <EffectVHS
          startDuration={glitchDuration}
          text="A journey through the depths of memory and cognition."
        />
      </Sequence>
    </>
  );
};

export default TitleSequence;
