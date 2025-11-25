import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene.tsx";
import { Stats, Loader } from "@react-three/drei";

function App() {
  return (
    <>
      <div className="flex h-screen w-screen">
        <Canvas gl={{ antialias: false }} dpr={1}>
          <Scene />
          <color attach="background" args={[0, 0, 0]} />
        </Canvas>
        <Stats />
        <Loader />
      </div>
    </>
  );
}

export default App;
