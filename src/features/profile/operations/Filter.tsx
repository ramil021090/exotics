import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Options {
  label: string;
  value: string;
}

interface FilterProps {
  filterField: string;
  options: Options[];
}
export const Filter = ({ filterField, options }: FilterProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    options[0]?.value || "",
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value: string) => {
    searchParams.set(`${filterField}`, value);
    setSearchParams(searchParams);
    setSelectedValue(value);
  };

  return (
    <div className="flex justify-around">
      {options.map((option) => (
        <div key={option.value}>
          <button
            className={`px-2 mx-2 border rounded-md hover:bg-green-500 shadow-sm ${
              selectedValue === option.value
                ? "bg-green-500 text-white border-green-500"
                : "bg- white dark:bg-slate-100 border-slate-300 hover:bg-green-5o0"
            }`}
            onClick={() => {
              handleClick(option.value);
            }}
          >
            {option.label}
          </button>
        </div>
      ))}
    </div>
  );
};
