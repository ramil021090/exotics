import { ImSpinner9 } from "react-icons/im";

interface SpinnerProps {
  size: number;
}

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div className="inline-block mt-8 animate-spin">
      <ImSpinner9 size={size} />
    </div>
  );
};

export default Spinner;
