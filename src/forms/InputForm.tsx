import type { InputHTMLAttributes } from "react";

interface InputformProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  placeholder?: string;
  accept?: string;
  className?: string;
}
const defaultClassName =
  "border border-slate-300 py-2 px-1 bg-white rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

const InputForm = ({
  className = defaultClassName,
  label,
  errors,
  accept,
  placeholder,
  type = "text",
  ...props
}: InputformProps) => {
  return (
    <div className="w-full my-2">
      <div>
        {label && <label className="  py-2 px-1  items-center ">{label}</label>}
      </div>
      <input
        {...props}
        placeholder={placeholder}
        accept={accept}
        type={type}
        className={className}
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default InputForm;
