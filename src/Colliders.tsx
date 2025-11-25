import { useGLTF } from "@react-three/drei";
import { StaticCollider } from "bvhecctrl";

export const Colliders = () => {
  const gltf = useGLTF("teleportation-colliders.glb");
  return (
    <>
      <StaticCollider>
        <group scale={[2, 2, 2]} rotation={[Math.PI * 0.5, 0, 0]}>
          <primitive object={gltf.scene} visible={false} />
        </group>
      </StaticCollider>
    </>
  );
};
