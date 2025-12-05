import { type StateCreator } from "zustand";
import { Vector3 } from "three";
import { type GameSlice } from "./gameSlice";
import { type SceneSlice } from "./sceneSlice";

export interface DynoSlice {
  origin: Vector3;
  transitionProgress: number;
  setOrigin: (newOrigin: Vector3) => void;
  setTransitionProgress: (progress: number) => void;
}

export const createDynoSlice: StateCreator<
  DynoSlice & GameSlice & SceneSlice,
  [],
  [],
  DynoSlice
> = (set) => ({
  origin: new Vector3(0, 0, 0),
  transitionProgress: 0.0,
  setOrigin: (newOrigin) => set({ origin: newOrigin }),
  setTransitionProgress: (progress) => set({ transitionProgress: progress }),
});
