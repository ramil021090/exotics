interface FilterButtonProps {
  label?: string[];
  onClick: (value: string) => void;
}
const FilterButton = ({ label, onClick }) => {
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
