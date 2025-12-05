import { useEffect, useRef, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useMyStore } from "../store/store.ts";
import { characterStatus, useButtonStore } from "bvhecctrl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Vector2, Raycaster, Mesh } from "three";

export const TransitionController = () => {
  const { camera, scene } = useThree();
  const [sub] = useKeyboardControls();

  const status = useMyStore((state) => state.status);
  const origin = useMyStore((state) => state.origin);
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
  const raycaster = useRef(new Raycaster());
  const projectileRef = useRef<Mesh>(null);

  // Master Animation Timeline
  useGSAP(
    () => {
      // Skip initial render (origin is 0,0,0) or handle explicitly
      // We can check if status is 'playing' to avoid intro animations
      if (status !== "playing") return;

      const targetWorldPos = origin.clone().multiplyScalar(2);
      const startPos = characterStatus.position.clone();
      startPos.y += 0.5;

      const distance = startPos.distanceTo(targetWorldPos);
      const speed = 20;
      const duration = Math.max(0.4, distance / speed); // Min 0.4s

      if (projectileRef.current) {
        const tl = gsap.timeline();

        // 1. Reset & Show Projectile
        tl.set(projectileRef.current.position, {
          x: startPos.x,
          y: startPos.y,
          z: startPos.z,
        })
          .set(projectileRef.current.scale, { x: 1, y: 1, z: 1 })
          .set(projectileRef.current, { visible: true })

          // 2. Fly to Target
          .to(projectileRef.current.position, {
            x: targetWorldPos.x,
            y: targetWorldPos.y,
            z: targetWorldPos.z,
            duration: duration,
            ease: "none",
          })

          // 3. Impact & Transition
          .call(() => {
            // Update Splat Indices on Impact
            const nextActiveSplat = (activeSplat + 1) % splatUrls.length;
            setHidingIndex(activeSplat);
            setShowingIndex(nextActiveSplat);
            setActiveSplat(nextActiveSplat);

            // Reset transition value for the tween
            transitionProgressRef.current.value = 0;
            setTransitionProgress(0);
          })

          // 4. Shrink Projectile + Expand Shader (Parallel)
          .to(
            projectileRef.current.scale,
            {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.2,
            },
            "impact",
          ) // Label 'impact' to run together
          .to(
            transitionProgressRef.current,
            {
              value: 1,
              duration: 2.5,
              ease: "power1.inOut",
              onUpdate: () => {
                setTransitionProgress(transitionProgressRef.current.value);
              },
            },
            "impact",
          )

          // 5. Cleanup
          .set(projectileRef.current, { visible: false });
      }
    },
    { dependencies: [origin] }, // Re-run whenever origin changes
  );

  // LMB/Space Trigger Logic (Just sets Origin)
  const fire = useCallback(() => {
    if (status === "playing") {
      raycaster.current.setFromCamera(new Vector2(0, 0), camera);
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true,
      );
      const hit = intersects.find((i) => i.object.name === "teleport-collider");

      if (hit) {
        // This will trigger the useGSAP hook
        setOrigin(hit.point.clone().divideScalar(2));
      }
    }
  }, [status, camera, scene, setOrigin]);

  // Mobile Virtual Button Input Event
  useEffect(() => {
    return sub(
      (state) => state.transition,
      (pressed) => {
        if (pressed) fire();
      },
    );
  }, [sub, fire]);

  const isTransitionPressed = useButtonStore(
    (state) => state.buttons["transition"],
  );
  const wasTransitionPressed = useRef(false);
  useEffect(() => {
    if (isTransitionPressed && !wasTransitionPressed.current) {
      fire();
    }
    wasTransitionPressed.current = isTransitionPressed;
  }, [isTransitionPressed, fire]);

  useEffect(() => {
    const handleClick = () => {
      if (status === "playing" && document.pointerLockElement) {
        fire();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [status, fire]);

  return (
    <mesh ref={projectileRef} visible={false} frustumCulled={false}>
      <sphereGeometry args={[0.05]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};
