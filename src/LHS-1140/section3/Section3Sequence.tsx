import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { JWSTUnfold } from "./JWSTUnfold";
import { TransmissionSpectroscopy } from "./TransmissionSpectroscopy";
import { SpectrographChart } from "./SpectrographChart";
import { Section3Text } from "./Section3Text";

const fps = 60;

export const Section3Sequence: React.FC = () => {
  const frame = useCurrentFrame();

  // JWST: 0-35s, fades out 30-35s
  const jwstOpacity = interpolate(frame, [30 * fps, 35 * fps], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Transit: fades in 30-35s, fades out 65-70s
  const transitOpacity = interpolate(
    frame,
    [30 * fps, 35 * fps, 65 * fps, 70 * fps],
    [0, 1, 1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Spectrograph: fades in 65-70s
  const spectroOpacity = interpolate(frame, [65 * fps, 70 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Phase 1: JWST unfolding */}
      <AbsoluteFill style={{ opacity: jwstOpacity }}>
        <JWSTUnfold />
      </AbsoluteFill>

      {/* Phase 2: Transit + spectroscopy */}
      <AbsoluteFill style={{ opacity: transitOpacity }}>
        <TransmissionSpectroscopy />
      </AbsoluteFill>

      {/* Phase 3: Spectrograph chart */}
      <AbsoluteFill style={{ opacity: spectroOpacity }}>
        <SpectrographChart />
      </AbsoluteFill>

      {/* Text overlay */}
      <Section3Text />
    </AbsoluteFill>
  );
};
