import {
  Img,
  staticFile,
  useVideoConfig,
  interpolate,
  useCurrentFrame,
  Series,
} from "remotion";
import {
  makeTransform,
  translate,
  scale,
  translateZ,
} from "@remotion/animation-utils";
import { BackgroundPerspectiveGrid } from "../common/backgrounds/PerspectiveGrid";

const HookSequence: React.FC<{
  startDelay?: number;
}> = ({ startDelay = 0 }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const scrollZ = (frame - startDelay) * 2;
  const hookDuration = 5 * fps; // 5 seconds duration
  const numOfSeriesComponent = 3;
  const hookTotalDuration = hookDuration * numOfSeriesComponent; // no of series components
  const interpolateInput = [startDelay, startDelay + hookDuration - 4 * fps];
  const interpolateScaleInput = [
    startDelay + hookDuration - 4 * fps,
    startDelay + hookDuration - 3 * fps,
  ];

  const scaleX = interpolate(frame, interpolateScaleInput, [1.2, 0.8], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const moveX = interpolate(frame, interpolateInput, [-800, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const animatedStyles = {
    transform: makeTransform([
      scale(scaleX),
      translate(moveX, 0),
      translateZ(`${scrollZ % 100}px`),
    ]),
  };

  return (
    <Series from={startDelay}>
      <Series.Sequence durationInFrames={hookTotalDuration}>
        <BackgroundPerspectiveGrid startDelay={startDelay} />
        <Img
          src={staticFile(`/retro-computer.png`)}
          style={{
            ...animatedStyles,
            width: "35%",
            height: "35%",
            position: "absolute",
            top: "30%",
          }}
        />
      </Series.Sequence>
    </Series>
  );
};

export default HookSequence;
