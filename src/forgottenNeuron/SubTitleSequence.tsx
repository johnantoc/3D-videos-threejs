import { useVideoConfig } from "remotion";
import { EffectVHS } from "../common/effects/EffectVHS";

const SubTitleSequence = () => {
  const { fps } = useVideoConfig();
  const subTitleDuration = 5 * fps; // 5 seconds duration for the glitch effect

  return (
    <EffectVHS
      startDuration={subTitleDuration}
      text="A journey through the depths of memory and cognition."
    />
  );
};

export default SubTitleSequence;
