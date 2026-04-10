import type { InputHTMLAttributes } from "react";

interface InputformProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  placeholder?: string;
  accept?: string;
  className?: string;
}

// const defaultClassName =
//   "border border-slate-300 bg-white py-2 px-1 dark:text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

const InputForm = ({
  // className = defaultClassName,
  label,
  errors,
  accept,
  placeholder,
  type = "text",
  ...props
}: InputformProps) => {
  return (
    <div className="mb-4 relative">
      {label && (
        <label className=" absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:text-xs peer-focus:translate-y-0">
          {label}
        </label>
      )}
      <input
        {...props}
        placeholder={placeholder}
        accept={accept}
        type={type}
        className={
          "peer block w-full border border-gray-300 rounded-md p-2 pt-5 focus:outline-none focus:border-blue-500"
        }
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default InputForm;
