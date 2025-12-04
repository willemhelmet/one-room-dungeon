import { useEffect, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useMyStore } from "../store.ts";
import { characterStatus } from "bvhecctrl";
import { gsap } from "gsap";

export const Input = () => {
  const [sub] = useKeyboardControls();

  const isStarted = useMyStore((state) => state.isStarted);
  const splatUrls = useMyStore((state) => state.splatUrls);
  const activeSplat = useMyStore((state) => state.activeSplatIndex);
  const setActiveSplat = useMyStore((state) => state.setActiveSplatIndex);
  const setOrigin = useMyStore((state) => state.setOrigin);
  const setShowingIndex = useMyStore((state) => state.setShowingIndex);
  const setHidingIndex = useMyStore((state) => state.setHidingIndex);
  const setTransitionProgress = useMyStore(
    (state) => state.setTransitionProgress,
  );

  const transitionProgressRef = useRef({ value: 0 });

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

  // handle transition button event
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
    setOrigin,
    splatUrls.length,
    setTransitionProgress,
    setHidingIndex,
    setShowingIndex,
    setActiveSplat,
  ]);

  return <></>;
};