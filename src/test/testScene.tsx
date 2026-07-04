import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { SquareSphere } from "./components/squareSphere";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import withAnimation from "./animations/withAnimation";

const container: React.CSSProperties = {
  backgroundColor: "white",
};

// Add animation to the component using the HOC
const SquareSphereWithAnimations = withAnimation(SquareSphere);

export function TestScene(props: {
  backlight: boolean;
  backlightColor: string;
  baseScale: number;
}) {
  const { width, height } = useVideoConfig();


  return (
    <AbsoluteFill style={container}>
      <ThreeCanvas linear width={width} height={height}>
        <ambientLight intensity={0.5} color={0xffffff} />
        <SquareSphereWithAnimations {...props} />
      </ThreeCanvas>
    </AbsoluteFill>
  )
}

export const TestSceneSchema = z.object({
  backlightColor: zColor(),
  backlight: z.boolean(),
  baseScale: z.number(),
});

export const composition = {
  id: "testScene",
  component: TestScene,
  fps: 30,
  durationInFrames: 300,
  width: 1920,
  height: 1080,
  defaultProps: {
    backlight: true,
    backlightColor: "#00ffff",
    baseScale: 1,
  }
};