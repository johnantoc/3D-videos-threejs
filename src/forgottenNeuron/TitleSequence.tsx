import { Series, useVideoConfig } from "remotion";
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
  const glitchDuration = 5 * fps; // 5 seconds duration for the glitch effect

  return (
    <Series>
      <Series.Sequence durationInFrames={glitchDuration}>
        <Bokeh startDelay={startDelay} />
        <TextGlitch
          text={textGlitch.text}
          startDelay={textGlitch.startDelay}
          textAlign={textGlitch.textAlign}
          bgColor={textGlitch.bgColor}
          glitchDuration={glitchDuration}
        />
      </Series.Sequence>
      <Series.Sequence durationInFrames={glitchDuration}>
        <EffectVHS
          startDuration={glitchDuration}
          text="A journey through the depths of memory and cognition."
        />
      </Series.Sequence>
    </Series>
  );
};

export default TitleSequence;
