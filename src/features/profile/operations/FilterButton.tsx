interface FilterButtonProps {
  label?: string[];
  onClick?: () => void;
}
const FilterButton = ({ label, onClick }: FilterButtonProps) => {
  return (
    <>
      <button
        className="bg-amber-300 px-2 mx-2 border rounded-xl"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default FilterButton;
