import { KeyboardControls, Capsule } from "@react-three/drei";
import BVHEcctrl from "bvhecctrl";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
];

export const Player = () => {
  return (
    <KeyboardControls map={keyboardMap}>
      <BVHEcctrl position={[4, -1.5, 0]}>
        {/* Invisible character model for BVHEcctrl to control */}
        <Capsule args={[0.3, 0.7, 4, 8]} visible={false}>
          <meshStandardMaterial color="white" />
        </Capsule>
      </BVHEcctrl>
    </KeyboardControls>
  );
};
