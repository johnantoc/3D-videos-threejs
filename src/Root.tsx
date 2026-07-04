import React from "react";
import { Composition, CalculateMetadataFunction } from "remotion";
import { z } from "zod";

// Webpack require.context type declaration
declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (id: string): unknown;
  };
};

// Scan the current directory recursively for files ending with Scene.tsx
const context = require.context("./", true, /Scene\.tsx$/);

interface SceneModule {
  composition?: {
    id: string;
    component: React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
    schema?: z.ZodTypeAny;
    defaultProps?: Record<string, unknown>;
    calculateMetadata?: CalculateMetadataFunction<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

const scenes = context.keys()
  .map((key) => {
    const module = context(key) as SceneModule;
    return module.composition;
  })
  .filter((comp): comp is Exclude<typeof comp, undefined> => !!comp);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {scenes.map((config) => (
        <Composition
          key={config.id}
          id={config.id}
          component={config.component}
          fps={config.fps}
          durationInFrames={config.durationInFrames}
          width={config.width}
          height={config.height}
          schema={config.schema}
          defaultProps={config.defaultProps}
          calculateMetadata={config.calculateMetadata}
        />
      ))}
    </>
  );
};
