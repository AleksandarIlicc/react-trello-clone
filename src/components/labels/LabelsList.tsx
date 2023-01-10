import React from "react";
import { labels } from "./labels";
import SingleLabel from "./SingleLabel";

interface LabelsListProps {
  handleSetLabels: React.MouseEventHandler<HTMLUListElement>;
  clearAllLabels: React.MouseEventHandler<HTMLButtonElement>;
}

const LabelsList = (props: LabelsListProps) => {
  const { handleSetLabels, clearAllLabels } = props;

  return (
    <ul onClick={handleSetLabels}>
      {labels.map((label, index) => {
        return <SingleLabel key={index} label={label} />;
      })}

      <button className="btn btn--clear" onClick={clearAllLabels}>
        Clear Label
      </button>
    </ul>
  );
};

export default LabelsList;
