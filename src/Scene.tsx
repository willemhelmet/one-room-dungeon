import { useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { characterStatus } from "bvhecctrl";

import { SparkRenderer } from "./SparkRenderer.ts";
import { Splat } from "./Splat.tsx";
import { Colliders } from "./Colliders.tsx";
import { Player } from "./Player.tsx";

export const Scene = () => {
  const renderer = useThree((state) => state.gl);
  const sparkRendererArgs = useMemo(() => {
    return { renderer, maxStdDev: Math.sqrt(5) };
  }, [renderer]);

  const camera = useThree((state) => state.camera);

  useEffect(() => {
    // Set the initial rotation of the camera
    camera.rotation.y = Math.PI * 0.5;
  }, [camera]);

  useFrame(() => {
    // Update camera position to follow the player
    camera.position.copy(characterStatus.position);
    camera.position.y += 0.8; // Eye level offset
  });

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
