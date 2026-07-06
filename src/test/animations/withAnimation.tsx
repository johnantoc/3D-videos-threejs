
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const CAMERA_DISTANCE = 4;

export default function withAnimation<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return function AnimatedComponent(props: P) {
        const frame = useCurrentFrame();
        const { fps, durationInFrames } = useVideoConfig();

        // Place a camera and set the distance to the object.
        // Then make it look at the object.
        const camera = useThree((state) => state.camera);
        useEffect(() => {
            camera.position.set(0, 0, CAMERA_DISTANCE);
            camera.near = 0.2;
            camera.far = Math.max(5000, CAMERA_DISTANCE * 2);
            camera.lookAt(0, 0, 0);
        }, [camera]);

        // During the whole scene, the object is rotating.
        // 2 * Math.PI is a full rotation.
        const constantRotation = interpolate(
            frame,
            [0, durationInFrames],
            [0, Math.PI * 6],
        );

        // When the composition starts, there is some extra
        // rotation and translation.
        const entranceAnimation = spring({
            frame,
            fps,
            config: {
                damping: 200,
                mass: 3,
            },
        });

        const exitAnimation = spring({
            frame: frame - durationInFrames / 2,
            fps,
            config: { damping: 12 },
        });

        const scale = entranceAnimation - exitAnimation;

        // Calculate the entrance rotation,
        // doing one full spin
        const entranceRotation = interpolate(
            entranceAnimation,
            [0, 1],
            [-Math.PI, Math.PI],
        );

        // Calculating the total rotation of the phone
        const rotateY = entranceRotation + constantRotation;

        // Calculating the translation of the phone at the beginning.
        // The start position of the phone is set to 4 "units"
        const translateYEnter = interpolate(entranceAnimation, [0, 1], [-4, 0]);
        const translateYExit = interpolate(exitAnimation, [0, 1], [0, 4]);
        const translateY = translateYEnter + translateYExit;

        return (
            <group scale={scale}
                rotation={[0, rotateY, 0]}
                position={[0, translateY, 0]}>
                <WrappedComponent {...props} />
            </group>
        )
    };
}
