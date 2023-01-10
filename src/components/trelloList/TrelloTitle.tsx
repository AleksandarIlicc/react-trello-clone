import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useOpenInputTitle } from "../../hooks/useTrelloTitleHooks";
import { ListInterface } from "../../InterfaceModels/ListInterface";
import { updateTitle } from "../../reducer/todoSlice";
import { useAppDispatch } from "../../store";

interface TitleProps {
  title: string;
  list: ListInterface;
}

const TrelloTitle = (props: TitleProps) => {
  const { title, list } = props;
  const [openInputTitle, toggleTitle, closeTitle] = useOpenInputTitle(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const dispatch = useAppDispatch();

  const handleOnBlur = () => {
    dispatch(updateTitle({ editTitle, list }));
    closeTitle();
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  return (
    <div>
      {openInputTitle ? (
        <div>
          <input
            type="text"
            className="title-input"
            autoFocus
            value={editTitle}
            onChange={handleChangeTitle}
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className="editable-title-container">
          <h1 onClick={toggleTitle} className="editable-title">
            {editTitle}
          </h1>
          <FiMoreHorizontal className="more-horiz-icon" />
        </div>
      )}
    </div>
  );
};

export default TrelloTitle;
