import { useMyStore } from "../store";

export const PlayButton = () => {
  const start = useMyStore((state) => state.start);

  return (
    <>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <button
          id="playButton"
          className="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={start}
        >
          Play
        </button>
      </div>
    </>
  );
};
