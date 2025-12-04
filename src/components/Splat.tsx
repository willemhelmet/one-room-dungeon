import { useMemo, useEffect } from "react";
import { SplatMesh } from "@sparkjsdev/spark";
import { dyno } from "@sparkjsdev/spark";
import { TransitionDyno } from "../dyno/TransitionDyno.ts";
import { useMyStore } from "../dyno/store.ts";

export interface SplatProps {
  url: string;
  myIndex: number;
}

export const Splat = ({ url, myIndex }: SplatProps) => {
  // Create local, stable dyno uniforms.
  // Initialize them with the store's initial state.
  const hidingIndexDyno = useMemo(
    () => dyno.dynoInt(useMyStore.getState().hidingIndex),
    [],
  );
  const showingIndexDyno = useMemo(
    () => dyno.dynoInt(useMyStore.getState().showingIndex),
    [],
  );
  const originDyno = useMemo(
    () => dyno.dynoVec3(useMyStore.getState().origin),
    [],
  );
  const transitionProgressDyno = useMemo(
    () => dyno.dynoFloat(useMyStore.getState().transitionProgress),
    [],
  );

  // Set up the non-reactive listener.
  useEffect(() => {
    const unsubscribe = useMyStore.subscribe((state) => {
      // When the store changes, imperatively update the .value of our local uniforms.
      // This does NOT cause a re-render.
      hidingIndexDyno.value = state.hidingIndex;
      showingIndexDyno.value = state.showingIndex;
      originDyno.value = state.origin;
      transitionProgressDyno.value = state.transitionProgress;
    });
    // Return the cleanup function to be called on unmount.
    return unsubscribe;
  }, [hidingIndexDyno, showingIndexDyno, originDyno, transitionProgressDyno]);

  const splat = useMemo(() => {
    const splatMesh = new SplatMesh({
      url: url,
      objectModifier: dyno.dynoBlock(
        { gsplat: dyno.Gsplat },
        { gsplat: dyno.Gsplat },
        ({ gsplat }) => {
          gsplat = TransitionDyno.apply({
            gsplat: gsplat,
            origin: originDyno,
            transitionProgress: transitionProgressDyno,
            myIndex: dyno.dynoConst("int", myIndex),
            hidingIndex: hidingIndexDyno, // Use the local dyno uniform
            showingIndex: showingIndexDyno, // Use the local dyno uniform
          }).gsplat;
          return { gsplat };
        },
      ),
      onFrame({ mesh }) {
        mesh.updateVersion();
      },
    });
    return splatMesh;
  }, [
    url,
    originDyno,
    transitionProgressDyno,
    myIndex,
    hidingIndexDyno,
    showingIndexDyno,
  ]);

  return (
    <>
      <group scale={[2, 2, 2]} rotation={[0, 0, 0]}>
        <primitive object={splat} />
      </group>
    </>
  );
};
