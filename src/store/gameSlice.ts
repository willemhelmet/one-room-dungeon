import { type StateCreator } from "zustand";
import { type SceneSlice } from "./sceneSlice";
import { type DynoSlice } from "./dynoSlice";

export type GameStatus = "intro" | "playing" | "paused";

export interface GameSlice {
  status: GameStatus;
  isMobile: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
}

export const createGameSlice: StateCreator<
  GameSlice & SceneSlice & DynoSlice,
  [],
  [],
  GameSlice
> = (set) => ({
  status: "intro",
  isMobile: "ontouchstart" in window || navigator.maxTouchPoints > 0,
  start: () => set(() => ({ status: "playing" })),
  pause: () => set(() => ({ status: "paused" })),
  resume: () => set(() => ({ status: "playing" })),
});
