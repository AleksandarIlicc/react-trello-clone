import { FaPlus } from "react-icons/fa";

interface AddCardBtnProps {
  showBackground: () => void;
  typeBtn: string;
}

const AddCardBtn = (props: AddCardBtnProps) => {
  const { showBackground, typeBtn } = props;

  return (
    <button className="btn btn--add-new-card" onClick={showBackground}>
      <FaPlus />{" "}
      <span>
        {typeBtn === "card" ? "Add Another Card" : "Add Another List"}
      </span>
    </button>
  );
};

export default AddCardBtn;
