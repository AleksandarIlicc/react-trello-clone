import TrelloList from "../components/trelloList/TrelloList";
import TrelloCardContainer from "../components/addNewCard/TrelloCardContainer";
import { useAppDispatch, useAppSelector } from "../store";
import { draggCard, InitialState } from "../reducer/todoSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ListInterface } from "../InterfaceModels/ListInterface";

const dragDropList = (
  lists: ListInterface[],
  source: any,
  destination: any
): void => {
  const draggList = lists.splice(source.index, 1);
  lists.splice(destination.index, 0, ...draggList);
};

const dragDropInsideSameList = (
  startList: ListInterface,
  source: any,
  destination: any
): void => {
  const draggCard = startList.cards.splice(source.index, 1);
  startList.cards.splice(destination.index, 0, ...draggCard);
};

const dragDropDifferentList = (
  startList: ListInterface,
  endList: ListInterface,
  source: any,
  destination: any
): void => {
  const draggCard = startList.cards.splice(source.index, 1);
  endList.cards.splice(destination.index, 0, ...draggCard);
};

export const handleDragEnd = (state: InitialState, payload: any) => {
  const newState: InitialState = JSON.parse(JSON.stringify(state));
  const { lists } = newState;
  const { source, destination, type } = payload;

  if (!destination) return;

  if (type === "LIST") {
    dragDropList(lists, source, destination);
    return newState;
  }

  const startList = lists.find((list) => list.id === source.droppableId);
  const endList = lists.find((list) => list.id === destination.droppableId);

  if (!startList || !endList) return;

  if (source.droppableId === destination.droppableId) {
    dragDropInsideSameList(startList, source, destination);
  } else {
    dragDropDifferentList(startList, endList, source, destination);
  }

  return newState;
};

type Direction = "horizontal" | "vertical ";

function TrelloWrapper() {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todo);
  const direction: Direction = "horizontal";

  return (
    <DragDropContext onDragEnd={(result: any) => dispatch(draggCard(result))}>
      <Droppable droppableId="trello" type="LIST" direction={direction}>
        {(provided) => (
          <div
            className="wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todo.lists.map((list, index) => {
              return <TrelloList key={list.id} list={list} index={index} />;
            })}
            {provided.placeholder}

            <div className="input-container">
              <TrelloCardContainer typeBtn="list" />
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TrelloWrapper;
