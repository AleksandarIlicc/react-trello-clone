import { FaTrash } from "react-icons/fa";
import { useAppDispatch } from "../../store";
import { deleteCard } from "../../reducer/todoSlice";
import { ListInterface } from "../../InterfaceModels/ListInterface";
import { CardsInterface } from "../../InterfaceModels/CardsInterface";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useShowLabels } from "../../hooks/useTrelloCardHooks";

interface CardProps {
  list: ListInterface;
  cards: CardsInterface[];
}

const TrelloCard = (props: CardProps) => {
  const { list, cards } = props;
  const [showLabels, toggleLabels] = useShowLabels(false);
  const dispatch = useAppDispatch();

  const handleDeleteCard = (id: string): void => {
    dispatch(deleteCard({ list, id }));
  };

  return (
    <div>
      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Draggable
                draggableId={card.cardID.toString()}
                index={index}
                key={card.cardID}
              >
                {(provided) => (
                  <div
                    className="card"
                    key={card.cardID}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <div
                      style={{
                        marginBottom: card.labels.length ? "1.5rem" : "0",
                      }}
                      className="card__header"
                    >
                      <div className="labels__container">
                        {card.labels.map((label, index) => (
                          <div
                            key={index}
                            className={
                              showLabels
                                ? `labels__labels labels__labels--show ${label}`
                                : `labels__labels ${label}`
                            }
                            onClick={toggleLabels}
                          >
                            <span>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <figure
                      style={{
                        height: `${card.image}` ? "15rem" : "0",
                        marginBottom: `${card.image}` ? "1.5rem" : 0,
                      }}
                      className="card__img"
                    >
                      <img src={card.image} alt="" />
                    </figure>
                    <div className="card__body">
                      <p className="card__title">{card.title}</p>
                      <FaTrash
                        className="card__icon"
                        onClick={() => handleDeleteCard(card.cardID)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TrelloCard;
