import { ImSpinner9 } from "react-icons/im";

interface SpinnerProps {
  size: number;
}

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center p-4">
      <ImSpinner9 size={size} />
    </div>
  );
};

export default Spinner;
