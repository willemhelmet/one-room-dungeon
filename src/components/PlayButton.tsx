import { useMyStore } from "../store";

export const PlayButton = () => {
  const isMobile = useMyStore((state) => state.isMobile);
  const status = useMyStore((state) => state.status);

  const buttonText = status === "intro" ? "Click to Start" : "Resume";

  return (
    <>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-black/80 text-white">
        <button
          id="playButton"
          className="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none cursor-pointer"
        >
          {buttonText}
        </button>
        <div className="text-center max-w-md px-4">
          <h2 className="text-lg font-semibold mb-2">Controls</h2>
          {isMobile ? (
            <ul className="text-sm space-y-1 text-gray-200">
              <li>Use the Joystick to Move & Look</li>
              <li>Tap the Button to Transition</li>
            </ul>
          ) : (
            <ul className="text-sm space-y-1 text-gray-200">
              <li>
                <span className="font-bold">W, A, S, D</span> to Move
              </li>
              <li>
                <span className="font-bold">Space</span> to Transition
              </li>
              <li>
                <span className="font-bold">Esc</span> to Pause
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
