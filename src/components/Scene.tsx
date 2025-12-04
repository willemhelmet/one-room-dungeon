import { useMemo, useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { characterStatus } from "bvhecctrl";
import { gsap } from "gsap";

import { SparkRenderer } from "./SparkRenderer.ts";
import { Splat } from "./Splat.tsx";
import { Colliders } from "./Colliders.tsx";
import { Player } from "./Player.tsx";
import { useMyStore } from "../dyno/store.ts";

export const Scene = () => {
  // three and spark renderer
  const renderer = useThree((state) => state.gl);
  const sparkRendererArgs = useMemo(() => {
    return { renderer, maxStdDev: Math.sqrt(5) };
  }, [renderer]);

  // keyboard controls event
  const [sub] = useKeyboardControls();

  // splats
  const splatUrls = ["one-page-dungeon-1.sog", "one-page-dungeon-2.sog"];
  // const [activeSplat, setActiveSplat] = useState(0);

  // Dyno uniforms
  const origin = useMyStore((state) => state.origin);
  const setOrigin = useMyStore((state) => state.setOrigin);

  const setTransitionProgress = useMyStore(
    (state) => state.setTransitionProgress,
  );
  const transitionProgressRef = useRef({ value: 0 });

  const setShowingIndex = useMyStore((state) => state.setShowingIndex);
  const setHidingIndex = useMyStore((state) => state.setHidingIndex);

  // const activeSplatIndex = useMyStore((state) => state.activeSplatIndex);
  const [activeSplat, setActiveSplat] = useState(0);

  const isStarted = useMyStore((state) => state.isStarted);

  // handle escape button event
  useEffect(() => {
    return sub(
      (state) => state.pause,
      (pressed) => {
        if (pressed && !isStarted) {
          console.log("pause");
        }
      },
    );
  }, [sub, isStarted]);

  useEffect(() => {
    return sub(
      (state) => state.transition,
      (pressed) => {
        if (pressed && isStarted) {
          // need to divide by 2 because splat is scaled by 2, see Splat.tsx
          setOrigin(characterStatus.position.clone().divideScalar(2));

          const nextActiveSplat = (activeSplat + 1) % splatUrls.length;
          setHidingIndex(activeSplat);
          setShowingIndex(nextActiveSplat);

          gsap.killTweensOf(transitionProgressRef.current);
          transitionProgressRef.current.value = 0;
          setTransitionProgress(0);
          gsap.to(transitionProgressRef.current, {
            value: 1,
            duration: 2.5,
            ease: "power1.inOut",
            onUpdate: () => {
              setTransitionProgress(transitionProgressRef.current.value);
            },
          });
          setActiveSplat(nextActiveSplat);
        }
      },
    );
  }, [
    sub,
    isStarted,
    activeSplat,
    origin,
    setOrigin,
    splatUrls.length,
    setTransitionProgress,
    setHidingIndex,
    setShowingIndex,
  ]);

  return (
    <>
      <Colliders />
      <perspectiveCamera />
      <Player paused={!isStarted} debug={false} />
      {/* <color attach="background" args={[0, 0, 0]} /> */}
      <SparkRenderer args={[sparkRendererArgs]}>
        {splatUrls.map((url, myIndex) => (
          <Splat key={myIndex} url={url} myIndex={myIndex} />
        ))}
      </SparkRenderer>
    </>
  );
};
