import { useMemo } from "react";
import { useThree } from "@react-three/fiber";

import { SparkRenderer } from "../spark/SparkRenderer.ts";
import { Splat } from "./Splat.tsx";
import { Colliders } from "./Colliders.tsx";
import { Player } from "./Player.tsx";
import { useMyStore } from "../store.ts";

export const Scene = () => {
  // three and spark renderer
  const renderer = useThree((state) => state.gl);
  const sparkRendererArgs = useMemo(() => {
    return { renderer, maxStdDev: Math.sqrt(5) };
  }, [renderer]);

  // splats
  const splatUrls = useMyStore((state) => state.splatUrls);

  const status = useMyStore((state) => state.status);

  return (
    <>
      <Colliders />
      <perspectiveCamera />
      <Player />
      {/* <color attach="background" args={[0, 0, 0]} /> */}
      <SparkRenderer args={[sparkRendererArgs]}>
        {splatUrls.map((url, myIndex) => (
          <Splat key={myIndex} url={url} myIndex={myIndex} />
        ))}
      </SparkRenderer>
    </>
  );
};
