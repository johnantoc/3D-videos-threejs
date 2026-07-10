import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { Circle } from "../../common/shapes/Circle";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const PerceptronSchema = z.object({
  bgColor: zColor().default("#ff0000"),
  lineColor: zColor().default("#00ff00"),
  lineWidth: z.number().default(10),
  lineCap: z.enum(["butt", "round", "square"]).default("round"),
});

export const Perceptron: React.FC<{
  bgColor: string;
  lineColor: string;
  lineWidth: number;
  lineCap: "butt" | "round" | "square";
}> = ({ bgColor, lineColor, lineWidth, lineCap }) => {
  const noOfNodes = 3;
  const strokeWidth = lineWidth;
  const strokeColor = lineColor;
  const strokeLineCap = lineCap;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define how the box progresses (0 to 1)
  const progress = spring({
    frame,
    fps,
    config: { damping: 50, stiffness: 100 },
  });

  //Store the measured centre points of every circle
  const [positions, setPositions] = useState<
    { centerX: number; centerY: number }[]
  >([]);
  // Refs object keyed by the Circle `id` prop
  const circleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // -------------------------------------------------------------------------
  // After the DOM has been painted, read the positions of all circles
  // -------------------------------------------------------------------------
  useEffect(() => {
    const inputNodes = Object.values(circleRefs.current).filter(
      (el): el is HTMLDivElement => !!el,
    );
    const weightedSumEl = circleRefs.current[
      "weighted-sum"
    ] as HTMLDivElement | null;
    const activationEl = circleRefs.current[
      "activation-function"
    ] as HTMLDivElement | null;

    const nodes: (HTMLElement | null)[] = [
      ...inputNodes,
      weightedSumEl,
      activationEl,
    ].filter(Boolean);

    const pos: { centerX: number; centerY: number }[] = [];

    nodes.forEach((el, idx) => {
      if (!el) return;
      const centerX = el.offsetLeft + el.offsetWidth / 2;
      const centerY = el.offsetTop + el.offsetHeight / 2;
      pos[idx] = { centerX, centerY };
    });

    setPositions(pos);
  }, []);

  // Map progress (0 to 1) to exact pixel coordinates
  const x = interpolate(
    progress,
    [0, 1],
    [
      positions.length ? positions[0].centerX : 0,
      positions.length ? positions[3].centerX : 0,
    ],
  );
  const y = interpolate(
    progress,
    [0, 1],
    [
      positions.length ? positions[0].centerY : 0,
      positions.length ? positions[3].centerY : 0,
    ],
  );

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* --------------------------------------------------------------- */}
      {/* Render the three input circles – attach a ref keyed by its id   */}
      {/* --------------------------------------------------------------- */}
      {Array(noOfNodes)
        .fill(0)
        .map((_, i) => (
          <Circle
            key={`node-${i}`}
            id={`node-${i}`}
            bgColor={bgColor}
            width={100}
            height={100}
            borderRadius={50}
            position="absolute"
            left={"30%"}
            top={`${i * 120}px`}
            ref={(el: HTMLDivElement | null) => {
              circleRefs.current[`node-${i}`] = el;
            }}
          />
        ))}

      {/* --------------------------------------------------------------- */}
      {/* Render the weighted‑sum circle – also attach a ref               */}
      {/* --------------------------------------------------------------- */}
      <Circle
        id="weighted-sum"
        bgColor={bgColor}
        width={100}
        height={100}
        borderRadius={50}
        position="absolute"
        left={"40%"}
        top={`${((noOfNodes - 1) * 120) / 2}px`}
        ref={(el: HTMLDivElement | null) => {
          circleRefs.current["weighted-sum"] = el;
        }}
      />

      {/* --------------------------------------------------------------- */}
      {/* Render the activation‑function circle – also attach a ref        */}
      {/* --------------------------------------------------------------- */}
      <Circle
        id="activation-function"
        bgColor={bgColor}
        width={100}
        height={100}
        borderRadius={50}
        position="absolute"
        left={"50%"}
        top={`${((noOfNodes - 1) * 120) / 2}px`}
        ref={(el: HTMLDivElement | null) => {
          circleRefs.current["activation-function"] = el;
        }}
      />

      {/* --------------------------------------------------------------- */}
      {/* SVG overlay that draws the connector lines                    */}
      {/* --------------------------------------------------------------- */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {positions[0] && positions[3] && (
          <line
            x1={positions[0].centerX}
            y1={positions[0].centerY}
            x2={positions[3].centerX}
            y2={positions[3].centerY}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            stroke-dasharray="0 122 0"
            stroke-dashoffset="70"
            stroke-linecap={strokeLineCap}
          />
        )}
        {positions[1] && positions[3] && (
          <line
            x1={positions[1].centerX}
            y1={positions[1].centerY}
            x2={positions[3].centerX}
            y2={positions[3].centerY}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            stroke-dasharray="0 90 0"
            stroke-dashoffset="40"
            stroke-linecap={strokeLineCap}
          />
        )}
        {positions[2] && positions[3] && (
          <line
            x1={positions[2].centerX}
            y1={positions[2].centerY}
            x2={positions[3].centerX}
            y2={positions[3].centerY}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            stroke-dasharray="0 122 0"
            stroke-dashoffset="70"
            stroke-linecap={strokeLineCap}
          />
        )}
        {positions[3] && positions[4] && (
          <line
            x1={positions[3].centerX}
            y1={positions[3].centerY}
            x2={positions[4].centerX}
            y2={positions[4].centerY}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            stroke-dasharray="0 90 0"
            stroke-dashoffset="40"
            stroke-linecap={strokeLineCap}
          />
        )}

        {positions[4] && (
          <line
            x1={positions[4].centerX}
            y1={positions[4].centerY}
            x2={positions[4].centerX + 200}
            y2={positions[4].centerY}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            stroke-dasharray="0 90 0"
            stroke-dashoffset="40"
            stroke-linecap={strokeLineCap}
          />
        )}
      </svg>
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#FF5E62",
          borderRadius: "8px",
          position: "absolute",
          // Center the box exactly on the line's center anchor
          left: x - 20,
          top: y - 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
};
