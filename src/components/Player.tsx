import BVHEcctrl from "bvhecctrl";
import { useThree, useFrame } from "@react-three/fiber";
import { characterStatus } from "bvhecctrl";

interface PlayerProps {
  paused: boolean;
  debug: boolean;
}

export const Player = ({ paused, debug }: PlayerProps) => {
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    if (!paused) {
      // Update camera position to follow the player
      camera.position.copy(characterStatus.position);
      camera.position.set(
        camera.position.x,
        camera.position.y + 0.8,
        camera.position.z,
      );
    }
  });

  return <BVHEcctrl position={[4, -1.4, 0]} debug={debug} paused={paused} />;
};
