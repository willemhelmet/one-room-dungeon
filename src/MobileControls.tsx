import { Joystick, VirtualButton, useButtonStore } from "bvhecctrl";
export const MobileControls = () => {
  const { buttons } = useButtonStore.getState();
  console.log(buttons.transition); // true or false
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
