import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { lerp } from "../common/utils";
import { C } from "../common/colors";
import { font } from "../common/fonts";

const GRID_SIZE = 8;
const PIXEL_SIZE = 40;
const DIGIT = "4";

// Generate pixel grid data (simplified representation of digit "4")
const generatePixelGrid = () => {
  const grid: { x: number; y: number; active: boolean }[] = [];
  const pattern = [
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid.push({ x, y, active: pattern[y][x] === 1 });
    }
  }
  return grid;
};

// Perceptron node positions (compact layout)
const PERCEPTRON_NODES = [
  { x: 1100, y: 350, label: "Input" },
  { x: 1100, y: 730, label: "Weighted Sum" },
  { x: 1390, y: 540, label: "Output" },
];

const InputProcessingSequence: React.FC<{ startDelay?: number }> = ({
  startDelay = 150, // 5 seconds delay (5 * 30fps = 150 frames)
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Only start animation after delay
  const adjustedFrame = Math.max(0, frame - startDelay);

  // Phase timing (spread across remaining time after delay)
  const digitPhaseEnd = 5 * fps;
  const pixelPhaseEnd = 10 * fps;
  const connectionPhaseEnd = 15 * fps;

  // 1. Digit appearance
  const digitOpacity = lerp(adjustedFrame, [0, 0.3 * fps], [0, 1]);
  const digitScale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // 2. Digit to pixel transition
  const digitToPixelProgress = lerp(
    adjustedFrame,
    [digitPhaseEnd, pixelPhaseEnd],
    [0, 1],
  );
  const digitFadeOut = interpolate(digitToPixelProgress, [0, 0.5], [1, 0], {
    extrapolateRight: "clamp",
  });

  // 3. Pixel grid appearance
  const gridOpacity = lerp(
    adjustedFrame,
    [digitPhaseEnd, digitPhaseEnd + 0.5 * fps],
    [0, 1],
  );

  // 4. Connection lines to perceptron
  const connectionProgress = lerp(
    adjustedFrame,
    [pixelPhaseEnd, connectionPhaseEnd],
    [0, 1],
  );

  // 5. Output label
  const outputOpacity = lerp(
    adjustedFrame,
    [connectionPhaseEnd, connectionPhaseEnd + 0.5 * fps],
    [0, 1],
  );
  const outputScale = spring({
    frame: Math.max(0, adjustedFrame - connectionPhaseEnd),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pixelGrid = generatePixelGrid();
  const gridWidth = GRID_SIZE * PIXEL_SIZE;
  const gridHeight = GRID_SIZE * PIXEL_SIZE;
  const gridOffsetX = width * 0.35 - gridWidth / 2; // Moved right from 0.25 to 0.35
  const gridOffsetY = height / 2 - gridHeight / 2;

  return (
    <>
      {/* Handwritten digit */}
      <div
        style={{
          position: "absolute",
          left: width * 0.35, // Moved right from 0.25 to 0.35
          top: height / 2,
          transform: `translate(-50%, -50%) scale(${digitScale})`,
          opacity: digitOpacity * digitFadeOut,
          fontSize: 200,
          fontFamily: font,
          color: C.white,
          fontStyle: "italic",
          textShadow: `0 0 20px ${C.accent}`,
        }}
      >
        {DIGIT}
      </div>

      {/* Pixel grid */}
      <div
        style={{
          position: "absolute",
          left: gridOffsetX,
          top: gridOffsetY,
          opacity: gridOpacity,
        }}
      >
        {pixelGrid.map((pixel, i) => {
          const pixelDelay = pixel.y * 0.05 + pixel.x * 0.02;
          const pixelAppear = lerp(
            adjustedFrame,
            [
              digitPhaseEnd + pixelDelay * fps,
              digitPhaseEnd + pixelDelay * fps + 0.2 * fps,
            ],
            [0, 1],
          );

          // Scanning animation - moves left to right, top to bottom, continuous loop
          const scanStart = digitPhaseEnd + 2 * fps;
          const scanDuration = 3 * fps;
          const totalPixels = GRID_SIZE * GRID_SIZE;
          const scanFrame = Math.max(0, adjustedFrame - scanStart);
          const scanCycle = scanFrame % scanDuration;
          const scanProgress = (scanCycle / scanDuration) * totalPixels;
          const isBeingScanned = i < scanProgress && i >= scanProgress - 3;
          const wasScanned = i < scanProgress - 3;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: pixel.x * PIXEL_SIZE,
                top: pixel.y * PIXEL_SIZE,
                width: PIXEL_SIZE - 2,
                height: PIXEL_SIZE - 2,
                backgroundColor: isBeingScanned
                  ? `${C.spotify}e6` // 0.9 opacity
                  : wasScanned && pixel.active
                    ? C.accent
                    : pixel.active
                      ? C.accent
                      : C.gray[800],
                opacity: pixelAppear,
                border: `1px solid ${
                  isBeingScanned
                    ? `${C.spotify}e6`
                    : pixel.active
                      ? C.accent
                      : C.gray[700]
                }`,
              }}
            />
          );
        })}
      </div>

      {/* Connection lines to perceptron nodes */}
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
        {/* Lines from Input node TO pixel grid with traveling arrow */}
        <g>
          <path
            d={`M ${PERCEPTRON_NODES[0].x} ${PERCEPTRON_NODES[0].y} Q ${
              (gridOffsetX + gridWidth + PERCEPTRON_NODES[0].x) / 2
            } ${gridOffsetY + 30} ${gridOffsetX + gridWidth} ${gridOffsetY + 30}`}
            stroke={C.accent}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={800}
            strokeDashoffset={800 * (1 - connectionProgress)}
            opacity={connectionProgress > 0 ? 0.9 : 0}
          />
          {connectionProgress > 0 && connectionProgress < 1 && (
            <circle
              cx={
                (1 - connectionProgress) ** 2 * PERCEPTRON_NODES[0].x +
                2 *
                  (1 - connectionProgress) *
                  connectionProgress *
                  ((gridOffsetX + gridWidth + PERCEPTRON_NODES[0].x) / 2) +
                connectionProgress ** 2 * (gridOffsetX + gridWidth)
              }
              cy={
                (1 - connectionProgress) ** 2 * PERCEPTRON_NODES[0].y +
                2 *
                  (1 - connectionProgress) *
                  connectionProgress *
                  (gridOffsetY + 30) +
                connectionProgress ** 2 * (gridOffsetY + 30)
              }
              r={8}
              fill={C.orange}
              opacity={0.9}
            ></circle>
          )}
          {connectionProgress >= 1 && (
            <polygon
              points={`${gridOffsetX + gridWidth + 45},${gridOffsetY + 5} ${gridOffsetX + gridWidth + 45},${gridOffsetY + 55} ${gridOffsetX + gridWidth - 10},${gridOffsetY + 30}`}
              fill={C.accent}
              opacity={0.9}
            />
          )}
        </g>

        {/* Lines from Weighted Sum node TO pixel grid with traveling arrow */}
        <g>
          <path
            d={`M ${PERCEPTRON_NODES[1].x} ${PERCEPTRON_NODES[1].y} Q ${
              (gridOffsetX + gridWidth + PERCEPTRON_NODES[1].x) / 2
            } ${gridOffsetY + gridHeight - 30} ${gridOffsetX + gridWidth} ${gridOffsetY + gridHeight - 30}`}
            stroke={C.accent}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={800}
            strokeDashoffset={800 * (1 - connectionProgress)}
            opacity={connectionProgress > 0 ? 0.9 : 0}
          />
          {connectionProgress > 0 && connectionProgress < 1 && (
            <circle
              cx={
                (1 - connectionProgress) ** 2 * PERCEPTRON_NODES[1].x +
                2 *
                  (1 - connectionProgress) *
                  connectionProgress *
                  ((gridOffsetX + gridWidth + PERCEPTRON_NODES[1].x) / 2) +
                connectionProgress ** 2 * (gridOffsetX + gridWidth)
              }
              cy={
                (1 - connectionProgress) ** 2 * PERCEPTRON_NODES[1].y +
                2 *
                  (1 - connectionProgress) *
                  connectionProgress *
                  (gridOffsetY + gridHeight - 30) +
                connectionProgress ** 2 * (gridOffsetY + gridHeight - 30)
              }
              r={8}
              fill={C.orange}
              opacity={0.9}
            ></circle>
          )}
          {connectionProgress >= 1 && (
            <polygon
              points={`${gridOffsetX + gridWidth + 45},${gridOffsetY + gridHeight - 55} ${gridOffsetX + gridWidth + 45},${gridOffsetY + gridHeight - 5} ${gridOffsetX + gridWidth - 10},${gridOffsetY + gridHeight - 30}`}
              fill={C.accent}
              opacity={0.9}
            />
          )}
        </g>

        {/* Line from pixel grid TO output node with traveling circle */}
        {adjustedFrame > pixelPhaseEnd && (
          <g>
            <path
              d={`M ${gridOffsetX + gridWidth} ${gridOffsetY + gridHeight / 2} L ${PERCEPTRON_NODES[2].x - 25} ${PERCEPTRON_NODES[2].y}`}
              stroke={C.success}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={800}
              strokeDashoffset={800 * (1 - connectionProgress)}
              opacity={connectionProgress > 0 ? 0.9 : 0}
            />
            {connectionProgress > 0 && connectionProgress < 1 && (
              <circle
                cx={
                  gridOffsetX +
                  gridWidth +
                  (PERCEPTRON_NODES[2].x - 25 - gridOffsetX - gridWidth) *
                    connectionProgress
                }
                cy={
                  gridOffsetY +
                  gridHeight / 2 +
                  (PERCEPTRON_NODES[2].y - gridOffsetY - gridHeight / 2) *
                    connectionProgress
                }
                r={8}
                fill={C.orange}
                opacity={0.9}
              ></circle>
            )}
            {connectionProgress >= 1 && (
              <polygon
                points={`${PERCEPTRON_NODES[2].x - 65},${PERCEPTRON_NODES[2].y - 28} ${PERCEPTRON_NODES[2].x - 65},${PERCEPTRON_NODES[2].y + 28} ${PERCEPTRON_NODES[2].x - 15},${PERCEPTRON_NODES[2].y}`}
                fill={C.success}
                opacity={0.9}
              />
            )}
          </g>
        )}

        {/* Perceptron nodes */}
        {PERCEPTRON_NODES.map((node, i) => {
          const lineProgress = Math.max(
            0,
            Math.min(1, connectionProgress * PERCEPTRON_NODES.length - i),
          );

          return (
            <g key={i}>
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={C.gray[900]}
                stroke={C.accent}
                strokeWidth={2}
                opacity={lineProgress}
              />
              {/* Node label */}
              <text
                x={node.x + 40}
                y={node.y + 6}
                fill={C.gray[300]}
                fontSize={40}
                fontWeight="200"
                fontFamily={font}
                opacity={lineProgress}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Output label - aligned with input digit */}
      <div
        style={{
          position: "absolute",
          left: 1650,
          top: height / 2,
          transform: `translate(-50%, -50%) scale(${outputScale})`,
          opacity: outputOpacity,
          fontSize: 100,
          fontFamily: font,
          color: C.success,
          fontWeight: "bold",
          textShadow: `0 0 30px ${C.success}`,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ color: C.gray[500], fontSize: 60 }}>=</span>
        <span>{DIGIT}</span>
      </div>

      {/* Processing text */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 32,
          fontFamily: font,
          color: C.gray[400],
          letterSpacing: 2,
          opacity: gridOpacity,
        }}
      >
        {adjustedFrame < digitPhaseEnd
          ? "HANDWRITTEN INPUT"
          : adjustedFrame < pixelPhaseEnd
            ? "PIXEL EXTRACTION..."
            : adjustedFrame < connectionPhaseEnd
              ? "NEURAL PROCESSING..."
              : "CLASSIFIED"}
      </div>
    </>
  );
};

export default InputProcessingSequence;
