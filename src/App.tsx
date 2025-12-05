import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  KeyboardControls,
  Loader,
  PointerLockControls,
  // Stats,
} from "@react-three/drei";
import { Scene } from "./components/Scene.tsx";
import { PlayButton } from "./components/PlayButton.tsx";
import { useMyStore } from "./store/store.ts";
import { MobileControls } from "./components/MobileControls.tsx";

function App() {
  const isMobile = useMyStore((state) => state.isMobile);
  const status = useMyStore((state) => state.status);
  const pause = useMyStore((state) => state.pause);
  const resume = useMyStore((state) => state.resume);

  const handleUnlock = () => {
    if (status === "playing") {
      pause();
    }
  };

  const handleLock = () => {
    resume();
  };

  return (
    <>
      {status !== "playing" && <PlayButton />}

      <div className="flex h-screen w-screen">
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
            { name: "rightward", keys: ["ArrowRight", "KeyD"] },
            { name: "transition", keys: ["Space"] },
            { name: "pause", keys: ["Escape"] },
          ]}
        >
          {isMobile && status === "playing" && <MobileControls />}
          <Canvas
            gl={{ antialias: false }}
            dpr={1}
            camera={{
              position: [4, -0.6, 0],
              rotation: [0, Math.PI * 0.5, 0],
            }}
          >
            <Scene />
            {!isMobile && (
              <PointerLockControls
                selector="#playButton"
                onUnlock={handleUnlock}
                onLock={handleLock}
              />
            )}
            {isMobile && <CameraControls smoothTime={0} />}
          </Canvas>
        </KeyboardControls>
        <Loader />
        {/* <Stats /> */}
      </div>
    </>
  );
}

export default App;
