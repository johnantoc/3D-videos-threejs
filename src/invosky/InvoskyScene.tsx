import { ThreeCanvas } from "@remotion/three";
import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";

const container: React.CSSProperties = {
    backgroundColor: "white",
};

export const InvoskyScene: React.FC = () => {
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={container}>
            <ThreeCanvas linear width={width} height={height}>
                <ambientLight intensity={1.5} color={0xffffff} />
                <pointLight position={[10, 10, 0]} />

            </ThreeCanvas>
        </AbsoluteFill>
    );
};

export const composition = {
  id: "invoskyScene",
  component: InvoskyScene,
  fps: 30,
  durationInFrames: 300,
  width: 1920,
  height: 1080,
};
