import { ThreeCanvas } from "@remotion/three";
import { zColor } from "@remotion/zod-types";
import React, { useMemo } from "react";
import { AbsoluteFill, useVideoConfig, staticFile, CalculateMetadataFunction } from "remotion";
import { z } from "zod";
import { MediabunnyMetadata, getMediaMetadata } from "./helpers/get-media-metadata";
import { getPhoneLayout } from "./helpers/layout";
import { Phone } from "./components/Phone";

const container: React.CSSProperties = {
  backgroundColor: "white",
};

export const myCompSchema = z.object({
  phoneColor: zColor(),
  deviceType: z.enum(["phone", "tablet"]),
});

type MyCompSchemaType = z.infer<typeof myCompSchema>;

export const Phone3DRotateScene: React.FC<
  {
    readonly baseScale: number;
    mediaMetadata: MediabunnyMetadata | null;
    videoSrc: string | null;
  } & MyCompSchemaType
> = ({ baseScale, phoneColor, mediaMetadata, videoSrc }) => {
  const { width, height } = useVideoConfig();

  if (!mediaMetadata) {
    throw new Error("Media metadata is not available");
  }
  if (!videoSrc) {
    throw new Error("Video source is not available");
  }

  const aspectRatio = useMemo(
    () => mediaMetadata.dimensions.width / mediaMetadata.dimensions.height,
    [mediaMetadata.dimensions.width, mediaMetadata.dimensions.height],
  );

  const layout = useMemo(
    () => getPhoneLayout(aspectRatio, baseScale),
    [aspectRatio, baseScale],
  );

  return (
    <AbsoluteFill style={container}>
      <ThreeCanvas linear width={width} height={height}>
        <ambientLight intensity={1.5} color={0xffffff} />
        <pointLight position={[10, 10, 0]} />
        <Phone
          phoneColor={phoneColor}
          phoneLayout={layout}
          mediaMetadata={mediaMetadata}
          videoSrc={videoSrc}
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

type Props = React.ComponentProps<typeof Phone3DRotateScene>;

const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  const videoSrc =
    props.deviceType === "phone"
      ? staticFile("phone.mp4")
      : staticFile("tablet.mp4");

  const mediaMetadata = await getMediaMetadata(videoSrc);

  return {
    props: {
      ...props,
      mediaMetadata,
      videoSrc,
    },
  };
};

export const composition = {
  id: "phone3DRotateScene",
  component: Phone3DRotateScene,
  fps: 30,
  durationInFrames: 300,
  width: 1280,
  height: 720,
  schema: myCompSchema,
  defaultProps: {
    deviceType: "tablet" as const,
    phoneColor: "rgba(110, 152, 191, 0.00)",
    baseScale: 1,
    mediaMetadata: null,
    videoSrc: null,
  },
  calculateMetadata,
};
