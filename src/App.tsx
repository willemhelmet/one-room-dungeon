import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene.tsx";
import { Stats, Loader } from "@react-three/drei";
import { Joystick } from "bvhecctrl";
import { XR, createXRStore } from "@react-three/xr";
import { useState } from "react"; // Removed useEffect

const store = createXRStore();

function App() {
  // Initialize state lazily to avoid extra render and fix lint error
  const [isMobile] = useState(() => {
    // Check for touch support only once on initial render
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return hasTouch;
  });

  return (
    <>
      <div className="flex h-screen w-screen">
        <Canvas gl={{ antialias: false }} dpr={1}>
          <XR store={store}>
            <Scene />
            <color attach="background" args={[0, 0, 0]} />
          </XR>
        </Canvas>
        <Stats />
        <Loader />
        {isMobile && <Joystick />} {/* Conditionally render Joystick */}
      </div>
    </>
  );
}

export default App;
