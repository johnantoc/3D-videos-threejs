import { useVideoConfig } from "remotion";
import { Bokeh } from "../common/backgrounds/Bokeh";
import { TextGlitch } from "../common/textAnimations/TextGlitch";

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
    <>
      <Bokeh />
      <TextGlitch
        text={textGlitch.text}
        startDelay={textGlitch.startDelay}
        textAlign={textGlitch.textAlign}
        bgColor={textGlitch.bgColor}
        glitchDuration={titleDuration}
      />
    </>
  );
};

export default TitleSequence;
