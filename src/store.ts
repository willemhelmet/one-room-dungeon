import { create } from "zustand";
import { Vector3 } from "three";

interface State {
  isStarted: boolean;
  start: () => void;
  isPaused: boolean;
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
  isStarted: false,
  start: () => set(() => ({ isStarted: true, isPaused: false })),
  isPaused: true,
  activeSplatIndex: 0,
  splatUrls: ["one-page-dungeon-1.sog", "one-page-dungeon-2.sog"],
  setActiveSplatIndex: (newIndex: number) =>
    set({ activeSplatIndex: newIndex }),
  showingIndex: 1,
  hidingIndex: 0,
  setShowingIndex: (newIndex: number) => set({ showingIndex: newIndex }),
  setHidingIndex: (newIndex: number) => set({ hidingIndex: newIndex }),
  pause: () => set(() => ({ isPaused: true })),
  resume: () => set(() => ({ isPaused: false })),
  origin: new Vector3(0, 0, 0),
  setOrigin: (newOrigin: Vector3) => set({ origin: newOrigin }),
  transitionProgress: 0.0,
  setTransitionProgress: (progress: number) =>
    set({ transitionProgress: progress }),
  isMobile: "ontouchstart" in window || navigator.maxTouchPoints > 0,
}));
