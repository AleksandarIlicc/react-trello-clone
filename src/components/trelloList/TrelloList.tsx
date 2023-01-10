import TrelloTitle from "./TrelloTitle";
import TrelloCard from "./TrelloCard";
import TrelloCardContainer from "../addNewCard/TrelloCardContainer";
import { ListInterface } from "../../InterfaceModels/ListInterface";
import { Draggable } from "react-beautiful-dnd";

interface ListProps {
  list: ListInterface;
  index: number;
}

const TrelloList = (props: ListProps) => {
  const { list, index } = props;

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="list-root" {...provided.dragHandleProps}>
            <TrelloTitle title={list.title} list={list} />
            <TrelloCard key={list.id} list={list} cards={list.cards} />
            <TrelloCardContainer list={list} typeBtn="card" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
