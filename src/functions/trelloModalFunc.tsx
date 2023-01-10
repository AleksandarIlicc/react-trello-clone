import {
  useLabelsHook,
  useSvgLabelIcon,
  useShowAddNewCardBtn,
} from "../hooks/useTrelloModalHooks";
import { addAnotherList, addCard } from "../reducer/todoSlice";
import { useAppDispatch } from "../store";
import { ListInterface } from "../InterfaceModels/ListInterface";

export const TrelloModalFunc = () => {
  const [labels, addLabels, deleteLabels, clearLabels] = useLabelsHook([]);
  const [, addSvgIcon, removeClassFromSvgIcon] = useSvgLabelIcon([]);
  const [, setShowAddNewCardBtn] = useShowAddNewCardBtn(false);
  const dispatch = useAppDispatch();

  const handleAddNewCard = (
    title: string,
    image: string,
    typeBtn: string,
    list: ListInterface,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    closeBackground: () => void,
    closeLabels: () => void,
    isEmptyTitle: () => void,
    isNotEmptyTitle: () => void
  ): void => {
    if (!title) {
      isEmptyTitle();
    } else {
      if (typeBtn === "card") {
        dispatch(addCard({ title, image, labels, list }));
      }
      if (typeBtn === "list") {
        dispatch(addAnotherList({ title }));
      }
      closeBackground();
      setTitle("");
      setImage("");
      closeLabels();
      isNotEmptyTitle();
      clearLabels();
      removeClassFromSvgIcon();
      setShowAddNewCardBtn(false);
    }
  };

  const handleSetLabels = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLLIElement;
    const el = target.closest("li");
    if (el === null) return;

    const labelsData = el.dataset.labels;
    const svgIcon = el.getElementsByTagName("svg")[0];
    addSvgIcon(svgIcon);
    svgIcon.classList.toggle("labels__labels-icon--active");

    if (!labelsData) return;

    if (labels && svgIcon.classList.contains("labels__labels-icon--active")) {
      addLabels(labelsData);
    } else {
      deleteLabels(labelsData);
    }
  };

  const clearAllLabels = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.target as HTMLButtonElement;
    const el = target.closest("li");
    if (el === null) return;

    const svgIcons = Array.from(el.getElementsByTagName("svg"));

    svgIcons.forEach((svg) => {
      if (svg.classList.contains("labels__labels-icon--active")) {
        svg.classList.remove("labels__labels-icon--active");
        clearLabels();
      }
    });
  };

  return { handleAddNewCard, handleSetLabels, clearAllLabels };
};
