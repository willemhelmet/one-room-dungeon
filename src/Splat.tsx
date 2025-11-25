import { useMemo } from "react";
import { SplatMesh } from "@sparkjsdev/spark";

export interface SplatType {
  url: string;
}

export const Splat = ({ url }: SplatType) => {
  const splat = useMemo(() => {
    const splatMesh = new SplatMesh({
      url: url,
    });
    return splatMesh;
  }, [url]);
  return (
    <>
      <group scale={[2, 2, 2]} rotation={[0, 0, 0]}>
        <primitive object={splat} />
      </group>
    </>
  );
};
