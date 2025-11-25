import { useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { characterStatus } from "bvhecctrl";
import { Vector3 } from "three";

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
    // Add the offset to the current position
    camera.position.add(new Vector3(0, 1.8, 0));
    camera.rotation.set(0, Math.PI * 0.5, 0);
  }, [camera]);

  useFrame(() => {
    // Update camera position to follow the player
    camera.position.copy(characterStatus.position);
    camera.position.set(
      camera.position.x,
      camera.position.y + 0.8,
      camera.position.z,
    );
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
        <Splat url="one-page-dungeon.sog" />
      </SparkRenderer>
    </>
  );
};
