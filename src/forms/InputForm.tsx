import type { InputHTMLAttributes } from "react";

interface InputformProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string;
  placeholder: string;
  accept?: string;
}
const InputForm = ({
  label,
  errors,
  accept,
  placeholder,
  type = "text",
  ...props
}: InputformProps) => {
  return (
    <div className="w-full max-w-md my-2">
      <label className="bg-slate-700 text-white border border-slate-900 border-solid py-2 px-1 rounded-l-md inline-block w-14 text-center align-top">
        {label}:
      </label>
      <input
        {...props}
        placeholder={placeholder}
        accept={accept}
        type={type}
        className="border border-slate-300 py-2 px-1 rounded-r-md inline-block w-48 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent align-top"
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default InputForm;
