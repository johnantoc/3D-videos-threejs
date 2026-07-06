import { interpolate, useCurrentFrame, AbsoluteFill, Solid, spring, useVideoConfig, Sequence } from "remotion";
import { linearGradient } from '@remotion/effects/linear-gradient';
import { Line } from './Line';

export const AnimatedLine: React.FC<{ color1: string; color2: string; }> = ({ color1, color2 }) => {
    const frame = useCurrentFrame();
    const videoConfig = useVideoConfig();
    const strokeWidth = 30;

    const strokeDevelopment = spring({
        frame,
        fps: videoConfig.fps,
        config: { damping: 100, mass: 10 }
    });

    const heightProgress = spring({
        frame,
        fps: videoConfig.fps,
        config: { damping: 100, mass: 1 }
    })

    const heightDevelopment = interpolate(
        frame,
        [videoConfig.durationInFrames / 2, videoConfig.durationInFrames],
        [strokeWidth, videoConfig.height * heightProgress],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
        }
    )

    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={videoConfig.durationInFrames / 2}>
                <Line
                    progress={strokeDevelopment}
                    color1={color1}
                    color2={color2}
                    strokeWidth={strokeWidth} />
            </Sequence>
            <Sequence
                from={videoConfig.durationInFrames / 2 - 0.5}
                durationInFrames={videoConfig.durationInFrames / 2}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                <Solid
                    height={heightDevelopment}
                    width={videoConfig.width}
                    effects={[linearGradient({ start: [0.2, 0.4], end: [0.4, 0.7], startColor: color1, endColor: color2 })]}
                />
            </Sequence>
        </AbsoluteFill>
    )
}