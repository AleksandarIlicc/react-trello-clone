import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiUser, FiTag } from "react-icons/fi";
import LabelsList from "../../components/labels/LabelsList";
import { ListInterface } from "../../InterfaceModels/ListInterface";
import {
  useOpenLabels,
  useShowAddNewCardBtn,
  useEmptyStrMessage,
} from "../../hooks/useTrelloModalHooks";
import { TrelloModalFunc } from "../../functions/trelloModalFunc";

interface TrelloModalProps {
  backgroundOverlay: boolean;
  closeBackground: () => void;
  list: ListInterface;
  typeBtn: string;
}

const TrelloModal = (props: TrelloModalProps) => {
  const { backgroundOverlay, closeBackground, list, typeBtn } = props;
  const { handleAddNewCard, handleSetLabels, clearAllLabels } =
    TrelloModalFunc();
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [openLabels, showLabels, closeLabels] = useOpenLabels(false);
  const [showAddNewCardBtn, setShowAddNewCardBtn] = useShowAddNewCardBtn(false);
  const [emptyTitle, isEmptyTitle, isNotEmptyTitle] = useEmptyStrMessage(false);

  return (
    <div
      style={{
        width: typeBtn === "card" ? "80vw" : "60vw",
        height: typeBtn === "card" ? "80vh" : "50vh",
      }}
      className={
        backgroundOverlay ? "input-card input-card--show" : "input-card"
      }
    >
      <h2 className="title-card">{list ? list.title : "Add another list"}</h2>
      <div className="modal-container">
        <div
          className={
            typeBtn === "card"
              ? "modal-container__right modal-container__right--card"
              : "modal-container__right"
          }
        >
          <form className="form">
            <textarea
              placeholder={
                typeBtn === "card"
                  ? "Enter a title of this card"
                  : "Enter list title"
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setShowAddNewCardBtn(true)}
            ></textarea>
            {typeBtn === "card" ? (
              <input
                type="text"
                placeholder="Add image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            ) : (
              ""
            )}
          </form>
          <div className="empty-str-message">
            {emptyTitle && !title ? `Title cannot be empty string` : ""}
          </div>
          <div style={{ marginTop: "2rem", overflow: "hidden" }}>
            <div
              className={
                showAddNewCardBtn ? "confirm confirm--show" : "confirm"
              }
            >
              <button
                className="btn-confirm"
                onClick={() =>
                  handleAddNewCard(
                    title,
                    image,
                    typeBtn,
                    list,
                    setTitle,
                    setImage,
                    closeBackground,
                    closeLabels,
                    isEmptyTitle,
                    isNotEmptyTitle
                  )
                }
              >
                {typeBtn === "list" ? "Add List" : "Add Card"}
              </button>
              <FaTimes className="times-icon" onClick={closeBackground} />
            </div>
          </div>
        </div>
        {typeBtn === "card" ? (
          <div style={{ flexBasis: "25%" }}>
            <h3 style={{ fontSize: "1.3rem" }}>Add to card</h3>
            <ul className="card-list">
              <li>
                <span>
                  <FiUser /> Members
                </span>
              </li>
              <li>
                <span onClick={showLabels}>
                  <FiTag /> Labels
                </span>
                <div
                  style={{ display: openLabels ? "block" : "none" }}
                  className="card-sub-list"
                >
                  <FaTimes
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      color: "#8a8a8a",
                    }}
                    onClick={closeLabels}
                  />
                  <div>
                    <h4>Labels</h4>
                  </div>
                  <LabelsList
                    handleSetLabels={handleSetLabels}
                    clearAllLabels={clearAllLabels}
                  />
                </div>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <FaTimes className="times-icon" onClick={closeBackground} />
    </div>
  );
};

export default TrelloModal;
