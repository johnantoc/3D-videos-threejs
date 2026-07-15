import {
  Img,
  staticFile,
  useVideoConfig,
  interpolate,
  Series,
  useCurrentFrame,
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
  const hookDuration = 20 * fps; // 20 seconds duration
  const computerAnimationDuration = hookDuration - 19 * fps;
  const interpolateMoveXInput = [
    startDelay,
    startDelay + computerAnimationDuration - 25,
  ];
  const interpolateMoveYInput = [
    startDelay + computerAnimationDuration,
    startDelay + hookDuration - 18 * fps,
  ];
  const interpolateScaleInput = [
    startDelay + computerAnimationDuration,
    startDelay + hookDuration - 18 * fps,
  ];

  const scaleX = interpolate(frame, interpolateScaleInput, [1.2, 0.8], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const moveX = interpolate(frame, interpolateMoveXInput, [-800, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const moveY = interpolate(frame, interpolateMoveYInput, [100, -400], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const animatedStyles = {
    transform: makeTransform([
      scale(scaleX),
      translate(moveX, moveY),
      translateZ(`${scrollZ % 100}px`),
    ]),
  };

  return (
    <Series>
      <Series.Sequence durationInFrames={hookDuration}>
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
