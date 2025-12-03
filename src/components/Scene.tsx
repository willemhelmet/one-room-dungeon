import { useMemo, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";
import { dyno } from "@sparkjsdev/spark";
import { characterStatus } from "bvhecctrl";
import { gsap } from "gsap";

import { SparkRenderer } from "./SparkRenderer.ts";
import { Splat } from "./Splat.tsx";
import { Colliders } from "./Colliders.tsx";
import { Player } from "./Player.tsx";

interface SceneProps {
  started: boolean;
}

export const Scene = ({ started }: SceneProps) => {
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
  const origin = useMemo(
    (): dyno.DynoVal<"vec3"> => dyno.dynoVec3(new Vector3(0, 0, 0)),
    [],
  );
  const transitionProgress = useMemo(
    (): dyno.DynoVal<"float"> => dyno.dynoFloat(0.0),
    [],
  );
  const showingIndex = useMemo(() => dyno.dynoInt(1), []);
  const hidingIndex = useMemo(() => dyno.dynoInt(0), []);

  const [activeSplat, setActiveSplat] = useState(0);

  useEffect(() => {
    return sub(
      (state) => state.transition,
      (pressed) => {
        if (pressed && started) {
          // need to divide by 2 because splat is scaled by 2, see Splat.tsx
          (origin as any).value.copy(characterStatus.position).divideScalar(2);

          const nextActiveSplat = (activeSplat + 1) % splatUrls.length;
          (hidingIndex as any).value = activeSplat;
          (showingIndex as any).value = nextActiveSplat;

          gsap.killTweensOf(transitionProgress);
          (transitionProgress as any).value = 0;
          gsap.to(transitionProgress, {
            value: 1,
            duration: 2.5,
            ease: "power1.inOut",
          });
          setActiveSplat(nextActiveSplat);
        }
      },
    );
  }, [
    sub,
    started,
    activeSplat,
    origin,
    splatUrls.length,
    transitionProgress,
    hidingIndex,
    showingIndex,
  ]);

  return (
    <>
      <Colliders />
      <perspectiveCamera />
      <Player paused={!started} debug={false} />
      <color attach="background" args={[0, 0, 0]} />
      <SparkRenderer args={[sparkRendererArgs]}>
        {splatUrls.map((url, myIndex) => (
          <Splat
            key={myIndex}
            url={url}
            origin={origin}
            transitionProgress={transitionProgress}
            myIndex={myIndex}
            showingIndex={showingIndex}
            hidingIndex={hidingIndex}
          />
        ))}
      </SparkRenderer>
    </>
  );
};
