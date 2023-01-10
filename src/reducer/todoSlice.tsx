import {
  AnyAction,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { ListInterface } from "../InterfaceModels/ListInterface";
import { handleDragEnd } from "../wrapper/TrelloWrapper";

export interface InitialState {
  lists: ListInterface[];
}

const initialState: InitialState = {
  lists: [
    {
      id: uuid(),
      title: "Todo",
      cards: [
        {
          cardID: uuid(),
          title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rutrum velit porttitor egestas hendrerit. Fusce a euismod lacus, nec sollicitudin.",
          image: "",
          labels: ["project", "client-request", "urgent"],
        },
        {
          cardID: uuid(),
          title: "Workout",
          image:
            "https://images.pexels.com/photos/1865131/pexels-photo-1865131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          labels: ["satisfaction"],
        },
      ],
    },
    {
      id: uuid(),
      title: "Doing",
      cards: [
        {
          cardID: uuid(),
          title: "Practice coding every day.",
          image:
            "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          labels: [],
        },
      ],
    },
    {
      id: uuid(),
      title: "Done",
      cards: [
        {
          cardID: uuid(),
          title: "Create Trello App with React.",
          image: "",
          labels: ["project"],
        },
      ],
    },
  ],
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addCard: (
      state,
      action: PayloadAction<{
        title: string;
        image: string;
        labels: string[];
        list: ListInterface;
      }>
    ) => {
      const { title, image, labels, list } = action.payload;
      const cardID = uuid();
      const newCard = { cardID, title, image, labels };

      return {
        ...state,
        lists: state.lists.map((item) =>
          item.id === list.id
            ? { ...item, cards: [...item.cards, newCard] }
            : item
        ),
      };
    },
    deleteCard: (
      state,
      action: PayloadAction<{ list: ListInterface; id: string }>
    ) => {
      const { list, id } = action.payload;

      return {
        ...state,
        lists: state.lists.map((item) =>
          item.id === list.id
            ? {
                ...item,
                cards: item.cards.filter((card) => card.cardID !== id),
              }
            : item
        ),
      };
    },
    addAnotherList: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;

      const newID = uuid();
      const newList = { id: newID, title, cards: [] };

      return {
        ...state,
        lists: [...state.lists, newList],
      };
    },
    updateTitle: (
      state,
      action: PayloadAction<{ editTitle: string; list: ListInterface }>
    ) => {
      const { editTitle, list } = action.payload;

      return {
        ...state,
        lists: state.lists.map((item) =>
          item.id === list.id ? { ...item, title: editTitle } : item
        ),
      };
    },
    draggCard: (state, action: AnyAction) => {
      const newState: InitialState = current(state);
      return handleDragEnd(newState, action.payload);
    },
  },
});

export const { addCard, deleteCard, addAnotherList, updateTitle, draggCard } =
  TodoSlice.actions;
export default TodoSlice.reducer;
