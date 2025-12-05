import { type StateCreator } from "zustand";
import { type GameSlice } from "./gameSlice";
import { type DynoSlice } from "./dynoSlice";

export interface SceneSlice {
  activeSplatIndex: number;
  showingIndex: number;
  hidingIndex: number;
  splatUrls: string[];
  setActiveSplatIndex: (index: number) => void;
  setShowingIndex: (index: number) => void;
  setHidingIndex: (index: number) => void;
}

export const createSceneSlice: StateCreator<
  SceneSlice & GameSlice & DynoSlice,
  [],
  [],
  SceneSlice
> = (set) => ({
  activeSplatIndex: 0,
  showingIndex: 1,
  hidingIndex: 0,
  splatUrls: ["one-page-dungeon-1.sog", "one-page-dungeon-2.sog"],
  setActiveSplatIndex: (newIndex) => set({ activeSplatIndex: newIndex }),
  setShowingIndex: (newIndex) => set({ showingIndex: newIndex }),
  setHidingIndex: (newIndex) => set({ hidingIndex: newIndex }),
});
