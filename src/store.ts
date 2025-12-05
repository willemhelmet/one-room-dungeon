import { create } from "zustand";
import { Vector3 } from "three";

interface State {
  status: "intro" | "playing" | "paused";
  start: () => void;
  activeSplatIndex: number;
  setActiveSplatIndex: (index: number) => void;
  showingIndex: number;
  hidingIndex: number;
  splatUrls: string[];
  setShowingIndex: (newIndex: number) => void;
  setHidingIndex: (newIndex: number) => void;
  pause: () => void;
  resume: () => void;
  origin: Vector3;
  setOrigin: (newOrigin: Vector3) => void;
  transitionProgress: number;
  setTransitionProgress: (progress: number) => void;
  isMobile: boolean;
}

export const useMyStore = create<State>((set) => ({
  status: "intro",
  start: () => set(() => ({ status: "playing" })),
  activeSplatIndex: 0,
  splatUrls: ["one-page-dungeon-1.sog", "one-page-dungeon-2.sog"],
  setActiveSplatIndex: (newIndex: number) =>
    set({ activeSplatIndex: newIndex }),
  showingIndex: 1,
  hidingIndex: 0,
  setShowingIndex: (newIndex: number) => set({ showingIndex: newIndex }),
  setHidingIndex: (newIndex: number) => set({ hidingIndex: newIndex }),
  pause: () => set(() => ({ status: "paused" })),
  resume: () => set(() => ({ status: "playing" })),
  origin: new Vector3(0, 0, 0),
  setOrigin: (newOrigin: Vector3) => set({ origin: newOrigin }),
  transitionProgress: 0.0,
  setTransitionProgress: (progress: number) =>
    set({ transitionProgress: progress }),
  isMobile: "ontouchstart" in window || navigator.maxTouchPoints > 0,
}));
