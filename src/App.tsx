import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  KeyboardControls,
  Loader,
  PointerLockControls,
} from "@react-three/drei";
import { Scene } from "./components/Scene.tsx";
import { MobileControls } from "./components/MobileControls.tsx";
import { PlayButton } from "./components/PlayButton.tsx";

function App() {
  const [isMobile] = useState(() => {
    // Check for touch support only once on initial render
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return hasTouch;
  });

  const [started, setStarted] = useState(false);

  return (
    <>
      {!started && <PlayButton setStarted={setStarted} />}
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
          <Canvas
            gl={{ antialias: false }}
            dpr={1}
            camera={{
              position: [4, -0.6, 0],
              rotation: [0, Math.PI * 0.5, 0],
            }}
          >
            <Scene started={started} />
            {!isMobile ? (
              <PointerLockControls selector="#playButton" />
            ) : (
              <CameraControls smoothTime={0} />
            )}
          </Canvas>
        </KeyboardControls>
        <Loader />
        {isMobile && started && <MobileControls />}
      </div>
    </>
  );
}

export default App;
