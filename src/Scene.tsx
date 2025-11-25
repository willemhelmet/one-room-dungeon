import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

import { SparkRenderer } from "./SparkRenderer.ts";
import { Splat } from "./Splat.tsx";
import { Colliders } from "./Colliders.tsx";
import { Player } from "./Player.tsx";

export const Scene = () => {
  const renderer = useThree((state) => state.gl);
  const sparkRendererArgs = useMemo(() => {
    return { renderer, maxStdDev: Math.sqrt(5) };
  }, [renderer]);
  return (
    <>
      <axesHelper />

      <Player />
      <PointerLockControls />

      <Colliders />

      <directionalLight />
      <ambientLight />
      {/* <Mesh /> */}

      <SparkRenderer args={[sparkRendererArgs]}>
        <Splat url="/one-page-dungeon.sog" />
      </SparkRenderer>
    </>
  );
};
