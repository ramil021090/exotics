import type { TextareaHTMLAttributes } from "react";

interface TextAreaFormProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errors?: string;
  placeholder?: string;
}
const TextAreaFrom = ({
  label,
  errors,
  placeholder = " ",
  ...props
}: TextAreaFormProps) => {
  return (
    <div className="my-2 ">
      <div>
        <label className=" text-center">{label}</label>
      </div>
      <textarea
        {...props}
        placeholder={placeholder}
        className="border border-slate-300 py-2 px-1 w-70 "
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default TextAreaFrom;
