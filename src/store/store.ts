import { create } from "zustand";
import { type GameSlice, createGameSlice } from "./gameSlice";
import { type SceneSlice, createSceneSlice } from "./sceneSlice";
import { type DynoSlice, createDynoSlice } from "./dynoSlice";

export const useMyStore = create<GameSlice & SceneSlice & DynoSlice>()(
  (...a) => ({
    ...createGameSlice(...a),
    ...createSceneSlice(...a),
    ...createDynoSlice(...a),
  }),
);
