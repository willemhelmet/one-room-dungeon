import type { Dispatch, SetStateAction } from "react";

interface PlayButtonProps {
  setStarted: Dispatch<SetStateAction<boolean>>;
}

export const PlayButton = ({ setStarted }: PlayButtonProps) => {
  const handleStart = () => {
    setStarted(true);
  };
  return (
    <>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <button
          className="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={handleStart}
        >
          Play
        </button>
      </div>
    </>
  );
};
