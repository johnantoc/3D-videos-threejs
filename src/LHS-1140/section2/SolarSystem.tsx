import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface PlanetOrbit {
  name: string;
  radius: number;
  size: number;
  color: string;
  speed: number;
  startAngle: number;
}

const planets: PlanetOrbit[] = [
  { name: "Mercury", radius: 100, size: 14, color: "#b0a090", speed: 4.15, startAngle: 0 },
  { name: "Venus", radius: 150, size: 22, color: "#e8c87a", speed: 1.62, startAngle: 45 },
  { name: "Earth", radius: 210, size: 24, color: "#4a90d9", speed: 1.0, startAngle: 120 },
  { name: "Mars", radius: 280, size: 18, color: "#c1440e", speed: 0.53, startAngle: 200 },
  { name: "Jupiter", radius: 400, size: 60, color: "#c8a55a", speed: 0.084, startAngle: 30 },
  { name: "Saturn", radius: 520, size: 50, color: "#e8d5a0", speed: 0.034, startAngle: 160 },
  { name: "Uranus", radius: 640, size: 34, color: "#7ec8e3", speed: 0.012, startAngle: 270 },
  { name: "Neptune", radius: 760, size: 32, color: "#4a6fa5", speed: 0.006, startAngle: 90 },
];

export const SolarSystem: React.FC = () => {
  const frame = useCurrentFrame();

  const sunGlow = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Sun */}
      <div
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 220, 80, 1) 0%, rgba(255, 180, 40, 0.9) 40%, rgba(255, 120, 20, 0.6) 70%, transparent 100%)",
          boxShadow:
            "0 0 80px rgba(255, 200, 60, 0.8), 0 0 160px rgba(255, 150, 30, 0.4), 0 0 300px rgba(255, 100, 20, 0.2)",
          opacity: sunGlow,
          zIndex: 10,
        }}
      />

      {/* Orbital rings and planets */}
      {planets.map((planet) => {
        const angle =
          (planet.startAngle + frame * planet.speed * 0.5) * (Math.PI / 180);
        const x = Math.cos(angle) * planet.radius;
        const y = Math.sin(angle) * planet.radius * 0.35;

        return (
          <React.Fragment key={planet.name}>
            {/* Orbit ring */}
            <div
              style={{
                position: "absolute",
                width: planet.radius * 2,
                height: planet.radius * 2 * 0.35,
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                pointerEvents: "none",
              }}
            />
            {/* Planet */}
            <div
              style={{
                position: "absolute",
                width: planet.size,
                height: planet.size,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.color}cc)`,
                boxShadow: `0 0 ${planet.size * 0.5}px ${planet.color}44`,
                transform: `translate(${x}px, ${y}px)`,
                zIndex: y > 0 ? 5 : 1,
              }}
            />
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
