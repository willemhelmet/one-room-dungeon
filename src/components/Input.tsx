import { useEffect, useRef, useCallback } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useMyStore } from "../store.ts";
import { characterStatus, useButtonStore } from "bvhecctrl";
import { gsap } from "gsap";
import { MobileControls } from "./MobileControls.tsx";

export const Input = () => {
  const [sub] = useKeyboardControls();

  const status = useMyStore((state) => state.status);
  const isMobile = useMyStore((state) => state.isMobile);
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

  // Combined transition handler
  const handleTransition = useCallback(() => {
    if (status === "playing") {
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
  }, [
    status,
    activeSplat,
    splatUrls.length,
    setHidingIndex,
    setShowingIndex,
    setOrigin,
    setTransitionProgress,
    setActiveSplat,
  ]);

  // Keyboard listener
  useEffect(() => {
    return sub(
      (state) => state.transition,
      (pressed) => {
        if (pressed) handleTransition();
      },
    );
  }, [sub, handleTransition]);

  // Mobile button listener
  const isTransitionPressed = useButtonStore(
    (state) => state.buttons["transition"],
  );
  const wasTransitionPressed = useRef(false);

  useEffect(() => {
    if (isTransitionPressed && !wasTransitionPressed.current) {
      handleTransition();
    }
    wasTransitionPressed.current = isTransitionPressed;
  }, [isTransitionPressed, handleTransition]); // Add handleTransition to deps

  return <>{isMobile && status === "playing" && <MobileControls />}</>;
};

