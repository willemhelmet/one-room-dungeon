import { useMemo } from "react";
import { SplatMesh } from "@sparkjsdev/spark";
import { dyno } from "@sparkjsdev/spark";
import { TransitionDyno } from "../dyno/TransitionDyno.ts";

export interface SplatProps {
  url: string;
  origin: dyno.DynoVal<"vec3">;
  transitionProgress: dyno.DynoVal<"float">;
  myIndex: number;
  hidingIndex: dyno.DynoVal<"int">;
  showingIndex: dyno.DynoVal<"int">;
}

export const Splat = ({
  url,
  origin,
  transitionProgress,
  myIndex,
  hidingIndex,
  showingIndex,
}: SplatProps) => {
  const splat = useMemo(() => {
    const splatMesh = new SplatMesh({
      url: url,
      objectModifier: dyno.dynoBlock(
        { gsplat: dyno.Gsplat },
        { gsplat: dyno.Gsplat },
        ({ gsplat }) => {
          gsplat = TransitionDyno.apply({
            gsplat: gsplat,
            origin: origin,
            transitionProgress: transitionProgress,
            myIndex: dyno.dynoConst("int", myIndex),
            hidingIndex: hidingIndex,
            showingIndex: showingIndex,
          }).gsplat;
          return { gsplat };
        },
      ),
      onFrame({ mesh }) {
        mesh.updateVersion();
      },
    });
    return splatMesh;
  }, [url, origin, transitionProgress, myIndex, hidingIndex, showingIndex]);

  return (
    <>
      <group scale={[2, 2, 2]} rotation={[0, 0, 0]}>
        <primitive object={splat} />
      </group>
    </>
  );
};
