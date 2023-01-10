import TrelloModal from "./TrelloModal";
import AddCardBtn from "../button/AddCardBtn";
import { useShowBg } from "../../hooks/useTrelloCardContainerHooks";

interface Cards {
  cardID: string;
  title: string;
  image: string;
  labels: string[];
}

interface List {
  id: string;
  title: string;
  cards: Cards[];
}

interface TrelloCardContainerProps {
  list?: List;
  typeBtn: string;
}

const TrelloCardContainer = (props: TrelloCardContainerProps) => {
  const { list, typeBtn } = props;
  const [backgroundOverlay, showBackground, closeBackground] = useShowBg(false);

  return (
    <div className="input-root">
      <TrelloModal
        backgroundOverlay={backgroundOverlay}
        closeBackground={closeBackground}
        list={list!}
        typeBtn={typeBtn}
      />
      <AddCardBtn showBackground={showBackground} typeBtn={typeBtn} />
      <div
        className={
          backgroundOverlay ? "background background--show" : "background"
        }
        onClick={closeBackground}
      ></div>
    </div>
  );
};

export default TrelloCardContainer;
