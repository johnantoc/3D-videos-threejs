import { AbsoluteFill } from "remotion";
import { z } from 'zod';
import { zColor } from "@remotion/zod-types";
import { AnimatedLine } from "./components/AnimatedLine";

export const LinesSceneSchema = z.object({
    lineColor1: zColor(),
    lineColor2: zColor(),
})

export const LinesScene: React.FC<{ lineColor1: string; lineColor2: string; }> = ({ lineColor1, lineColor2 }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "white" }}>
            <AnimatedLine color1={lineColor1} color2={lineColor2} />
        </AbsoluteFill>
    )
}

export const composition = {
    id: "linesScenes",
    component: LinesScene,
    durationInFrames: 60,
    fps: 30,
    width: 1920,
    height: 1080,
    schema: LinesSceneSchema,
    defaultProps: {
        lineColor1: "#91EAE4",
        lineColor2: "#86A8E7",
    }
}
