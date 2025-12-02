import { useEffect } from "react";
import { Joystick, VirtualButton, useButtonStore } from "bvhecctrl";

export const MobileControls = () => {
  const isTransitionPressed = useButtonStore(
    (state) => state.buttons["transition"],
  );

  useEffect(() => {
    if (isTransitionPressed) {
      console.log("transition triggered");
    }
  }, [isTransitionPressed]);
  return (
    <>
      <Joystick />
      <VirtualButton
        id="transition"
        buttonWrapperStyle={{ right: "100px", bottom: "40px" }}
      />
    </>
  );
};
