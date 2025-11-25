import { Box, useGLTF } from "@react-three/drei";
// import { useControls } from "leva";
import { RigidBody } from "@react-three/rapier";

export const Colliders = () => {
  const gltf = useGLTF("/teleportation-colliders.glb");

  // Define controls for position, scale, and visibility
  // const { position, scale, visible } = useControls({
  //   position: {
  //     value: [-3.3, -1.1, 2.2], // Default position
  //     step: 0.1,
  //   },
  //   scale: {
  //     value: [0.5, 0.5, 0.5], // Default scale, matching the existing one
  //     step: 0.1,
  //   },
  //   visible: true, // Default to visible
  // });

  {
    /* <RigidBody type="fixed" colliders="trimesh" position={position}> */
  }
  {
    /*   <group scale={scale} visible={visible}> */
  }
  {
    /*     <primitive object={gltf.scene} /> */
  }
  {
    /*   </group> */
  }
  {
    /* </RigidBody> */
  }
  return (
    <>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        position={[0, 0, 0]}
        rotation={[Math.PI * 0.5, 0, 0]}
      >
        <group scale={[2, 2, 2]}>
          <primitive object={gltf.scene} />
        </group>
      </RigidBody>
      {/* <RigidBody type="fixed" colliders="cuboid" position={[0, -1.75, 0]}> */}
      {/*   <Box args={[40, 0.1, 40]} /> */}
      {/* </RigidBody> */}
      {/*<RigidBody
        type={"fixed"}
        colliders={"cuboid"}
        position={[-10, -2.5, 8]}
        rotation={[0, 0, Math.PI * 0.35]}
      >
        <Box args={[4, 4, 4]} />
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[-14.5, 0, 4.5]}>
        <Box args={[6, 0.1, 12]} />
      </RigidBody> */}
    </>
  );
};
