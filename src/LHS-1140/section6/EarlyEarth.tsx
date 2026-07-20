import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

interface Volcano {
  x: number;
  width: number;
  height: number;
  delay: number;
}

const volcanoes: Volcano[] = [
  { x: 800, width: 300, height: 250, delay: 0 },
  { x: 1920, width: 400, height: 320, delay: 150 },
  { x: 3000, width: 280, height: 220, delay: 300 },
];

export const EarlyEarth: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Volcanic surface (0-10s)
  // Phase 2: Gas/atmosphere rising (8-18s)
  // Phase 3: Rain falling (15-22s)
  // Phase 4: Oceans forming (20-25s)

  const gasOpacity = interpolate(frame, [480, 900], [0, 0.6], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const rainOpacity = interpolate(frame, [900, 1200], [0, 0.7], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const oceanLevel = interpolate(frame, [1200, 1500], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const oceanY = interpolate(oceanLevel, [0, 1], [2160, 1400]);

  // Sky color transition (red → blue)
  const skyR = interpolate(frame, [0, 1500], [60, 20], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const skyG = interpolate(frame, [0, 1500], [15, 40], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const skyB = interpolate(frame, [0, 1500], [10, 80], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Lava glow
  const lavaPulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.7, 1]);

  // Pre-generate gas particles (always computed, rendered conditionally)
  const gasParticles = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 40; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        x: seed(1) * 3840,
        speed: seed(2) * 2 + 1,
        size: seed(3) * 30 + 10,
        offset: seed(4) * 500,
        opacity: seed(5) * 0.3 + 0.1,
      });
    }
    return result;
  }, []);

  // Pre-generate rain drops (always computed, rendered conditionally)
  const rainDrops = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 100; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        x: seed(1) * 3840,
        speed: seed(2) * 15 + 10,
        length: seed(3) * 30 + 15,
        offset: seed(4) * 2160,
        opacity: seed(5) * 0.4 + 0.2,
      });
    }
    return result;
  }, []);

  return (
    <AbsoluteFill>
      {/* Volcanic sky */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, rgb(${skyR}, ${skyG}, ${skyB}) 0%, rgb(${skyR + 40}, ${skyG + 10}, ${skyB + 5}) 50%, rgb(80, 30, 15) 100%)`,
        }}
      />

      {/* Volcanic surface */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "55%",
          background:
            "linear-gradient(180deg, rgb(60, 25, 12) 0%, rgb(40, 18, 8) 50%, rgb(25, 10, 5) 100%)",
        }}
      />

      {/* Lava rivers */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "55%",
          opacity: lavaPulse,
        }}
        viewBox="0 0 3840 1200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 Q 400 150 800 220 Q 1200 280 1600 180 Q 2000 100 2400 200 Q 2800 280 3200 160 Q 3600 80 3840 200"
          stroke="rgba(255, 80, 20, 0.6)"
          strokeWidth={8}
          fill="none"
        />
        <path
          d="M0 500 Q 500 420 1000 520 Q 1500 600 2000 480 Q 2500 380 3000 500 Q 3500 580 3840 460"
          stroke="rgba(255, 100, 30, 0.5)"
          strokeWidth={6}
          fill="none"
        />
      </svg>

      {/* Volcanoes */}
      {volcanoes.map((v, i) => {
        const eruptionProgress = interpolate(
          frame,
          [v.delay, v.delay + 300],
          [0, 1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        const plumeHeight = interpolate(
          Math.sin(frame * 0.02 + i * 2),
          [-1, 1],
          [0.7, 1]
        );

        return (
          <React.Fragment key={i}>
            {/* Volcano mountain */}
            <div
              style={{
                position: "absolute",
                left: v.x - v.width / 2,
                bottom: "45%",
                width: 0,
                height: 0,
                borderLeft: `${v.width / 2}px solid transparent`,
                borderRight: `${v.width / 2}px solid transparent`,
                borderBottom: `${v.height}px solid rgb(50, 22, 10)`,
              }}
            />

            {/* Crater glow */}
            <div
              style={{
                position: "absolute",
                left: v.x - 30,
                bottom: `calc(45% + ${v.height - 20}px)`,
                width: 60,
                height: 30,
                borderRadius: "50%",
                background: `radial-gradient(ellipse, rgba(255, 100, 20, ${0.8 * lavaPulse}), rgba(200, 60, 10, ${0.4 * lavaPulse}), transparent)`,
                filter: "blur(5px)",
              }}
            />

            {/* Eruption plume */}
            <div
              style={{
                position: "absolute",
                left: v.x - 60,
                bottom: `calc(45% + ${v.height}px)`,
                width: 120,
                height: interpolate(eruptionProgress, [0, 1], [0, 300 * plumeHeight]),
                background:
                  "linear-gradient(180deg, rgba(80, 80, 90, 0.6), rgba(120, 60, 30, 0.4), rgba(200, 80, 20, 0.2), transparent)",
                borderRadius: "50% 50% 30% 30%",
                filter: "blur(10px)",
                opacity: eruptionProgress,
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Atmospheric gas layer */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "45%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(100, 60, 20, 0.15) 50%, rgba(80, 50, 25, 0.3) 100%)",
          opacity: gasOpacity,
        }}
      />

      {/* Rising gas particles */}
      {gasOpacity > 0 &&
        gasParticles.map((particle, i) => {
          const yPos = (frame * particle.speed + particle.offset) % 1200;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: particle.x,
                bottom: `${45 + yPos * 0.3}%`,
                width: particle.size,
                height: particle.size,
                borderRadius: "50%",
                background: `rgba(120, 80, 40, ${particle.opacity})`,
                filter: "blur(8px)",
                opacity: gasOpacity,
              }}
            />
          );
        })}

      {/* Rain */}
      {rainOpacity > 0 &&
        rainDrops.map((drop, i) => {
          const yPos = (frame * drop.speed + drop.offset) % 2400 - 200;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: drop.x,
                top: yPos,
                width: 2,
                height: drop.length,
                background: `linear-gradient(180deg, transparent, rgba(150, 190, 230, ${drop.opacity}))`,
                opacity: rainOpacity,
              }}
            />
          );
        })}

      {/* Ocean rising */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: oceanY,
          width: "100%",
          height: 2160 - oceanY,
          background:
            "linear-gradient(180deg, rgba(30, 80, 140, 0.7) 0%, rgba(20, 60, 120, 0.85) 50%, rgba(15, 40, 90, 0.95) 100%)",
          opacity: oceanLevel,
        }}
      >
        {/* Wave ripples */}
        <svg
          style={{ width: "100%", height: 60 }}
          viewBox="0 0 3840 60"
          preserveAspectRatio="none"
        >
          <path
            d={`M0 30 Q ${480 + Math.sin(frame * 0.03) * 100} ${10 + Math.sin(frame * 0.02) * 10} 960 30 Q ${1440 + Math.sin(frame * 0.025) * 80} ${50 - Math.sin(frame * 0.03) * 10} 1920 30 Q ${2400 + Math.sin(frame * 0.02) * 90} ${10 + Math.sin(frame * 0.025) * 8} 2880 30 Q ${3360 + Math.sin(frame * 0.03) * 70} ${50 - Math.sin(frame * 0.02) * 8} 3840 30`}
            stroke="rgba(100, 170, 230, 0.3)"
            strokeWidth={2}
            fill="none"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
