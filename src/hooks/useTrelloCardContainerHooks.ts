import { useState } from "react";

export const useShowBg = (
  initialValue: boolean
): [boolean, () => void, () => void] => {
  const [backgroundOverlay, setBackgroundOverlay] = useState(initialValue);

  const showBackground = (): void => {
    setBackgroundOverlay(true);
  };

  const closeBackground = (): void => {
    setBackgroundOverlay(false);
  };

  return [backgroundOverlay, showBackground, closeBackground];
};
