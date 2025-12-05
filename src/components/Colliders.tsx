import { useGLTF } from "@react-three/drei";
import { StaticCollider } from "bvhecctrl";
import { useEffect } from "react";
import { Mesh, MeshBasicMaterial } from "three";

export const Colliders = () => {
  const gltf = useGLTF("teleportation-colliders.glb");

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.name = "teleport-collider";
        // Make transparent but raycastable
        mesh.material = new MeshBasicMaterial({
          color: "red",
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
      }
    });
  }, [gltf.scene]);

  return (
    <>
      <StaticCollider key={gltf.scene.uuid}>
        <group scale={[2, 2, 2]} rotation={[Math.PI * 0.5, 0, 0]}>
          <primitive object={gltf.scene} />
        </group>
      </StaticCollider>
    </>
  );
};
