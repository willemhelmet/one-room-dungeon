import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  Stats,
  Loader,
  PointerLockControls,
} from "@react-three/drei";
import { Scene } from "./Scene.tsx";
import { MobileControls } from "./MobileControls.tsx";

function App() {
  const [isMobile] = useState(() => {
    // Check for touch support only once on initial render
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return hasTouch;
  });

  return (
    <div className="flex h-screen w-screen">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "transition", keys: ["Space"] },
        ]}
      >
        <Canvas gl={{ antialias: false }} dpr={1}>
          <Scene />
          {!isMobile && <PointerLockControls />}
        </Canvas>
      </KeyboardControls>
      <Stats />
      <Loader />
      {isMobile && <MobileControls />}
    </div>
  );
}

export default App;
