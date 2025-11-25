import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
export const Mesh = () => {
  const gltf = useGLTF("/dungeon.glb");

  // Define controls for position, scale, and visibility
  const { position, scale, visible } = useControls({
    position: {
      value: [-3.3, -1.1, 2.2], // Default position
      step: 0.1,
    },
    scale: {
      value: [0.5, 0.5, 0.5], // Default scale, matching the existing one
      step: 0.1,
    },
    visible: true, // Default to visible
  });
  return (
    <>
      <group position={position} scale={scale} visible={visible}>
        <primitive object={gltf.scene} />/
      </group>
    </>
  );
};
