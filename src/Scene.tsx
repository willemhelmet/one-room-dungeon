import { useMemo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls, useKeyboardControls } from "@react-three/drei";

import { SparkRenderer } from "./SparkRenderer.ts";
import { Splat } from "./Splat.tsx";
import { Colliders } from "./Colliders.tsx";
import { Player } from "./Player.tsx";

interface SceneProps {
  started: boolean;
}

export const Scene = ({ started }: SceneProps) => {
  const renderer = useThree((state) => state.gl);
  const sparkRendererArgs = useMemo(() => {
    return { renderer, maxStdDev: Math.sqrt(5) };
  }, [renderer]);

  const [sub] = useKeyboardControls();

  useEffect(() => {
    return sub(
      (state) => state.transition,
      (pressed) => {
        if (pressed) {
          console.log("transition triggered");
        }
      },
    );
  }, [sub]);

  return (
    <>
      <Colliders />
      <color attach="background" args={[0, 0, 0]} />
      {started && <PointerLockControls />}
      <perspectiveCamera />
      <Player paused={!started} />
      <SparkRenderer args={[sparkRendererArgs]}>
        <Splat url="one-page-dungeon.sog" />
      </SparkRenderer>
    </>
  );
};
