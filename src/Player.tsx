import BVHEcctrl from "bvhecctrl";
import { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { characterStatus } from "bvhecctrl";

export const Player = () => {
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

  return <BVHEcctrl position={[4, -1.5, 0]} />;
};
