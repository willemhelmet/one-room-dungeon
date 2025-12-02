import { useMemo, useEffect, Suspense } from "react";
import { useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

import { SparkRenderer } from "./SparkRenderer.ts";
import { Splat } from "./Splat.tsx";
import { Colliders } from "./Colliders.tsx";
import { Player } from "./Player.tsx";

export const Scene = () => {
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
      <Suspense>
        <Player />
        <SparkRenderer args={[sparkRendererArgs]}>
          <Splat url="one-page-dungeon.sog" />
        </SparkRenderer>
      </Suspense>
    </>
  );
};
