import { useSearchParams } from "react-router-dom";

interface Options {
  label: string;
  value: string;
}

interface SortProps {
  options: Options[];
}

const Sort = ({ options }: SortProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSorted = searchParams.get("sortBy") || options[0]?.value;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <>
      <select
        className="m-2 mb-3 p-2  bg-green-100 border-slate-300 rounde-md shadow-sm rounded-md "
        onChange={handleChange}
        value={currentSorted}
      >
        {options.map((option) => (
          <option
            value={option.value}
            className={` bg-white  hover:bg-green-500`}
            key={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Sort;
