import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, staticFile, random } from 'remotion';
import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function Particles({ count = 150 }) {
  const frame = useCurrentFrame();
  
  // Generate random positions once deterministically
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random(`x-${i}`) - 0.5) * 16;     // X
      pos[i * 3 + 1] = (random(`y-${i}`) - 0.5) * 16; // Y
      pos[i * 3 + 2] = (random(`z-${i}`) - 0.5) * 16; // Z
    }
    return pos;
  }, [count]);

  const groupRotationY = frame * 0.0015;
  const groupPositionY = Math.sin(frame * 0.008) * 0.25;

  return (
    <group rotation={[0, groupRotationY, 0]} position={[0, groupPositionY, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f0ff"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function RotatingLogo() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Position the camera
  const camera = useThree((state) => state.camera);
  React.useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Load the texture from the public folder (invosky-logo.png)
  const texture = useTexture(staticFile('invosky-logo.png'));

  // Entrance scale spring animation
  const scaleVal = spring({
    frame,
    fps,
    config: {
      damping: 15,
      mass: 0.8,
      stiffness: 90,
    },
  });

  // Calculate rotation: constant spin on Y, slight sine/cosine sway on X and Z
  const rotationY = (frame / durationInFrames) * Math.PI * 4; // 2 full spins in 10s
  const rotationX = Math.sin(frame * 0.03) * 0.12 + 0.05;
  const rotationZ = Math.cos(frame * 0.025) * 0.08;

  // Float up/down slightly
  const posY = Math.sin(frame * 0.04) * 0.15;

  // Let's create:
  // 1. Front face mesh (offset Z+)
  // 2. Back face mesh (offset Z- and rotated 180 on Y)
  // 3. Middle rim box mesh (chrome metallic finish)
  // 4. Glowing outer frame (Torus geometry spinning)
  // 5. Glowing inner border wireframe
  return (
    <group scale={scaleVal} position={[0, posY, 0]} rotation={[rotationX, rotationY, rotationZ]}>
      {/* Front Face of the logo card */}
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.15}
          metalness={0.2}
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Back Face of the logo card (mirrored so it reads correctly from behind) */}
      <mesh position={[0, 0, -0.052]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.15}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card Border / Inner Core (Bright cyan chrome metal) */}
      <mesh>
        <boxGeometry args={[3.52, 3.52, 0.1]} />
        <meshStandardMaterial 
          color="#00d2ff" 
          roughness={0.05}
          metalness={0.95}
          emissive="#004466"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Glowing neon outer torus ring */}
      <mesh rotation={[0, 0, frame * 0.008]}>
        <torusGeometry args={[2.8, 0.06, 16, 80]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          roughness={0.1}
          metalness={0.9}
          emissive="#00f0ff"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Outer spinning square wireframe frame */}
      <mesh rotation={[0, 0, -frame * 0.012]}>
        <boxGeometry args={[4.4, 4.4, 0.05]} />
        <meshStandardMaterial 
          color="#005f73" 
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}
