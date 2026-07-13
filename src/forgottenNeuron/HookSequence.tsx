import { Img, staticFile, useVideoConfig, Series } from "remotion";

const HookSequence: React.FC<{
  startDelay: number;
}> = ({ startDelay = 0 }) => {
  const { fps } = useVideoConfig();
  const hookDuration = 5 * fps; // 5 seconds duration
  const numOfSeriesComponent = 1;
  const hookTotalDuration = hookDuration * numOfSeriesComponent; // no of series components

  return (
    <Series from={startDelay} durationInFrames={hookTotalDuration}>
      <Series.Sequence durationInFrames={hookDuration}>
        <Img src={staticFile(`/retro-computer.png`)} />
      </Series.Sequence>
    </Series>
  );
};

export default HookSequence;
