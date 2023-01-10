import { useState } from "react";

export const useLabelsHook = (
  initialValue: string[]
): readonly [
  string[],
  (labelsData: string) => void,
  (labelsData: string) => void,
  () => void
] => {
  const [labels, setLabels] = useState(initialValue);

  const addLabels = (labelsData: string) => {
    setLabels([...labels, labelsData]);
  };

  const deleteLabels = (labelsData: string) => {
    setLabels(labels.filter((label) => label !== labelsData));
  };

  const clearLabels = () => {
    setLabels([]);
  };

  return [labels, addLabels, deleteLabels, clearLabels];
};

export const useOpenLabels = (
  initialValue: boolean
): readonly [boolean, () => void, () => void] => {
  const [openLabels, setOpenLabels] = useState(initialValue);

  const showLabels = () => {
    setOpenLabels(true);
  };

  const closeLabels = () => {
    setOpenLabels(false);
  };

  return [openLabels, showLabels, closeLabels];
};

export const useSvgLabelIcon = (
  initialValue: SVGSVGElement[]
): readonly [SVGSVGElement[], (svgIcon: SVGSVGElement) => void, () => void] => {
  const [svgLabelIcon, setSvgLabelIcon] = useState(initialValue);

  const addSvgIcon = (svgIcon: SVGSVGElement) => {
    setSvgLabelIcon([...svgLabelIcon, svgIcon]);
  };

  const removeClassFromSvgIcon = () => {
    svgLabelIcon.forEach((svg) =>
      svg.classList.remove("labels__labels-icon--active")
    );
  };

  return [svgLabelIcon, addSvgIcon, removeClassFromSvgIcon];
};

export const useShowAddNewCardBtn = (
  initialValue: boolean
): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [showAddNewCardBtn, setShowAddNewCardBtn] = useState(initialValue);

  return [showAddNewCardBtn, setShowAddNewCardBtn];
};

export const useEmptyStrMessage = (
  initialValue: boolean
): readonly [boolean, () => void, () => void] => {
  const [emptyTitle, setEmptyTitle] = useState(initialValue);

  const isEmptyTitle = () => {
    setEmptyTitle(true);
  };

  const isNotEmptyTitle = () => {
    setEmptyTitle(false);
  };

  return [emptyTitle, isEmptyTitle, isNotEmptyTitle];
};
