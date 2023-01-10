import { FaCheck } from "react-icons/fa";
import { LabelsInterface } from "../../InterfaceModels/LabelsInterface";

interface SingleLabelProps {
  label: LabelsInterface;
}

const SingleLabel = (props: SingleLabelProps) => {
  const { label } = props;

  return (
    <li className={label.class} data-labels={label.data}>
      <span>{label.name}</span>
      <FaCheck className="labels__labels-icon" />
    </li>
  );
};

export default SingleLabel;
