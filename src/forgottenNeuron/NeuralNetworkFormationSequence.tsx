import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  random,
} from "remotion";
import { lerp } from "../common/utils";
import { C } from "../common/colors";

// Neural network node positions (3 layers)
const NODES = {
  input: [
    { x: 300, y: 250 },
    { x: 300, y: 450 },
    { x: 300, y: 650 },
    { x: 300, y: 850 },
  ],
  hidden: [
    { x: 700, y: 300 },
    { x: 700, y: 500 },
    { x: 700, y: 700 },
  ],
  output: [
    { x: 1100, y: 400 },
    { x: 1100, y: 600 },
  ],
};

// All connections between layers
const CONNECTIONS: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];

// Input to hidden
NODES.input.forEach((from) => {
  NODES.hidden.forEach((to) => {
    CONNECTIONS.push({ from, to });
  });
});

// Hidden to output
NODES.hidden.forEach((from) => {
  NODES.output.forEach((to) => {
    CONNECTIONS.push({ from, to });
  });
});

// Drift offsets for scattered phase
const DRIFT_OFFSETS = NODES.input
  .concat(NODES.hidden)
  .concat(NODES.output)
  .map((_, i) => ({
    x: (random(`drift-x-${i}`) - 0.5) * 400,
    y: (random(`drift-y-${i}`) - 0.5) * 400,
    speedX: (random(`speed-x-${i}`) - 0.5) * 2,
    speedY: (random(`speed-y-${i}`) - 0.5) * 2,
  }));

const NeuralNetworkFormationSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timing (spread across 20 seconds)
  const driftPhaseEnd = 6 * fps;
  const sparkPhaseEnd = 12 * fps;
  const alivePhaseStart = 12 * fps;

  // 2. Formation - nodes move to positions
  const formationProgress = spring({
    frame: Math.max(0, frame - driftPhaseEnd),
    fps,
    config: { damping: 15, stiffness: 50 },
  });

  // 3. Connections forming
  const connectionProgress = lerp(
    frame,
    [driftPhaseEnd, sparkPhaseEnd],
    [0, 1],
  );

  // 4. Network alive - pulse animation
  const pulsePhase = Math.max(0, frame - alivePhaseStart) / fps;
  const pulse = Math.sin(pulsePhase * 3) * 0.5 + 0.5;

  // Node glow intensity
  // const glowIntensity = lerp(frame, [sparkPhaseEnd, sparkPhaseEnd + fps], [0, 1]);

  const allNodes = [
    ...NODES.input.map((n, i) => ({ ...n, layer: "input", index: i })),
    ...NODES.hidden.map((n, i) => ({ ...n, layer: "hidden", index: i + NODES.input.length })),
    ...NODES.output.map((n, i) => ({ ...n, layer: "output", index: i + NODES.input.length + NODES.hidden.length })),
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${C.gray[950]} 0%, ${C.black} 100%)`,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 36,
          fontFamily: "monospace",
          color: C.accent,
          letterSpacing: 4,
          opacity: lerp(frame, [0, 0.5 * fps], [0, 1]),
          textShadow: `0 0 20px ${C.accent}80`,
        }}
      >
        NEURAL NETWORK FORMATION
      </div>

      {/* Connection lines */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {CONNECTIONS.map((conn, i) => {
          const lineAppear = Math.max(
            0,
            Math.min(1, connectionProgress * CONNECTIONS.length - i * 0.5),
          );

          // Calculate node positions with drift/forming animation
          const fromDrift = DRIFT_OFFSETS[i % DRIFT_OFFSETS.length];
          const toDrift = DRIFT_OFFSETS[(i + 1) % DRIFT_OFFSETS.length];

          const fromX = conn.from.x + fromDrift.x * (1 - formationProgress);
          const fromY = conn.from.y + fromDrift.y * (1 - formationProgress);
          const toX = conn.to.x + toDrift.x * (1 - formationProgress);
          const toY = conn.to.y + toDrift.y * (1 - formationProgress);

          // Pulse traveling along the connection
          const pulsePosition = (pulsePhase * 0.5 + i * 0.1) % 1;
          const pulseX = fromX + (toX - fromX) * pulsePosition;
          const pulseY = fromY + (toY - fromY) * pulsePosition;

          return (
            <g key={i}>
              {/* Connection line */}
              <line
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke={C.accent}
                strokeWidth={1.5}
                opacity={lineAppear * 0.6}
              />

              {/* Data pulse traveling along line */}
              {frame > alivePhaseStart && (
                <circle
                  cx={pulseX}
                  cy={pulseY}
                  r={3}
                  fill={C.accent}
                  opacity={pulse * lineAppear}
                >
                </circle>
              )}

              {/* Lightning spark effect during formation */}
              {lineAppear > 0 && lineAppear < 1 && (
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={C.cyan}
                  strokeWidth={3}
                  opacity={(1 - lineAppear) * 0.8}
                  filter="url(#glow)"
                />
              )}
            </g>
          );
        })}

        {/* SVG filter for glow effect */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Neural network nodes */}
      {allNodes.map((node, i) => {
        const drift = DRIFT_OFFSETS[i];
        const nodeX = node.x + drift.x * (1 - formationProgress);
        const nodeY = node.y + drift.y * (1 - formationProgress);

        // Node appearance with spring
        const nodeAppear = spring({
          frame: Math.max(0, frame - i * 3),
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        // Glow pulse when network is alive
        const nodeGlow =
          frame > alivePhaseStart
            ? Math.sin(pulsePhase * 4 + i * 0.5) * 0.3 + 0.7
            : 0.3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: nodeX - 25,
              top: nodeY - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.accent} 0%, ${C.gray[800]} 100%)`,
              border: `2px solid ${C.accent}`,
              opacity: nodeAppear,
              transform: `scale(${nodeAppear})`,
              boxShadow:
                frame > sparkPhaseEnd
                  ? `0 0 ${20 * nodeGlow}px ${C.accent}, 0 0 ${40 * nodeGlow}px ${C.accent}80`
                  : `0 0 5px ${C.accent}40`,
            }}
          />
        );
      })}

      {/* Layer labels */}
      <div
        style={{
          position: "absolute",
          left: 300,
          bottom: 150,
          transform: "translateX(-50%)",
          fontSize: 18,
          fontFamily: "monospace",
          color: C.gray[500],
          opacity: formationProgress,
        }}
      >
        INPUT
      </div>
      <div
        style={{
          position: "absolute",
          left: 700,
          bottom: 150,
          transform: "translateX(-50%)",
          fontSize: 18,
          fontFamily: "monospace",
          color: C.gray[500],
          opacity: formationProgress,
        }}
      >
        HIDDEN
      </div>
      <div
        style={{
          position: "absolute",
          left: 1100,
          bottom: 150,
          transform: "translateX(-50%)",
          fontSize: 18,
          fontFamily: "monospace",
          color: C.gray[500],
          opacity: formationProgress,
        }}
      >
        OUTPUT
      </div>

      {/* Status text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 24,
          fontFamily: "monospace",
          color: C.secondary,
          letterSpacing: 2,
          opacity: lerp(frame, [0, 0.5 * fps], [0, 1]),
        }}
      >
        {frame < driftPhaseEnd
          ? "SCATTERED KNOWLEDGE..."
          : frame < sparkPhaseEnd
            ? "FORMING CONNECTIONS..."
            : "NETWORK ACTIVATED"}
      </div>
    </AbsoluteFill>
  );
};

export default NeuralNetworkFormationSequence;
