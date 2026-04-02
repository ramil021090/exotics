import type { InputHTMLAttributes } from "react";

interface InputformProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  placeholder?: string;
  accept?: string;
  className?: string;
}

const defaultClassName =
  "border border-slate-300 bg-white py-2 px-1 dark:text-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

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
    <div className="my-2">
      <div>
        {label && <label className="  pointer-events-none">{label}</label>}
      </div>
      <input
        {...props}
        placeholder={placeholder}
        accept={accept}
        type={type}
        className={`${className}`}
      />

      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default InputForm;
