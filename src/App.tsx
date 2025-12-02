import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Stats, Loader } from "@react-three/drei";
import { Scene } from "./Scene.tsx";
import { MobileControls } from "./MobileControls.tsx";
import { PlayButton } from "./PlayButton.tsx";

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
              position: [14, -1.5, 0],
              rotation: [0, Math.PI * 0.5, 0],
            }}
          >
            <Scene started={started} />
          </Canvas>
        </KeyboardControls>
        <Stats />
        <Loader />
        {isMobile && started && <MobileControls />}
      </div>
    </>
  );
}

export default App;
