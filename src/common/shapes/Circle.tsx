import React, { useRef } from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const CircleSchema = z.object({
  id: z.string().optional(),
  width: z.number().default(100),
  height: z.number().default(100),
  borderRadius: z.number().default(50),
  position: z.enum(["absolute", "relative", "fixed"]).default("absolute"),
  bgColor: zColor().default("#ff0000"),
  left: z.string().optional(),
  top: z.string().optional(),
  right: z.string().optional(),
  bottom: z.string().optional(),
});

export const Circle: React.FC<{
  id?: string;
  bgColor: string;
  width: number;
  height: number;
  borderRadius: number;
  position: "absolute" | "relative" | "fixed";
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
  ref?: React.Ref<HTMLDivElement>;
}> = ({
  id,
  bgColor,
  width,
  height,
  borderRadius,
  position,
  left,
  top,
  right,
  bottom,
  ref,
}) => {
  const internalRef = useRef<HTMLDivElement>(null);
  return (
    <div
      id={id}
      ref={ref || internalRef}
      style={{
        backgroundColor: bgColor,
        width,
        height,
        borderRadius,
        position,
        left,
        top,
        right,
        bottom,
      }}
    />
  );
};
