import { ThreeCanvas } from "@remotion/three";
import React, { Suspense } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { RotatingLogo, Particles } from "./components/RotatingLogo";

const container: React.CSSProperties = {
    background: "radial-gradient(circle at center, #0a182c 0%, #02060f 100%)",
};

export const InvoskyScene: React.FC = () => {
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={container}>
            <ThreeCanvas linear width={width} height={height}>
                <ambientLight intensity={0.5} color={0xffffff} />
                <directionalLight position={[5, 5, 4]} intensity={1.2} />
                <pointLight position={[-5, 5, 2]} intensity={0.8} />
                <pointLight position={[0, 0, -4]} color="#00f0ff" intensity={2.0} />

                <Suspense fallback={null}>
                    <Particles count={150} />
                    <RotatingLogo />
                </Suspense>
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
