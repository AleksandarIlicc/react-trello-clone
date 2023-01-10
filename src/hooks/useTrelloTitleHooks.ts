import { useState } from "react";

export const useOpenInputTitle = (
  initialValue: boolean
): [boolean, () => void, () => void] => {
  const [openInputTitle, setOpenInputTitle] = useState(initialValue);

  const toggleTitle = () => {
    setOpenInputTitle(!initialValue);
  };

  const closeTitle = () => {
    setOpenInputTitle(false);
  };

  return [openInputTitle, toggleTitle, closeTitle];
};
