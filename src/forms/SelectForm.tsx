import type { SelectHTMLAttributes } from "react";

interface SelectFormProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  errors?: string;
  data: { name: string; value?: string }[];
}
const SelectForm = ({ data, label, errors, ...props }: SelectFormProps) => {
  return (
    <div className="my-2">
      <label className=" py-1">{label}:</label>
      <select {...props} className=" underline">
        {data.map((item) => (
          <option value={item.value || item.name} key={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};
export default SelectForm;
