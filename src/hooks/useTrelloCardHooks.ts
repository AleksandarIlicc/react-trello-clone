import { useState } from "react";

export const useShowLabels = (initialValue: boolean): [boolean, () => void] => {
  const [showLabels, setShowLabels] = useState(initialValue);

  const toggleLabels = () => {
    setShowLabels(!initialValue);
  };

  return [showLabels, toggleLabels];
};
