import type { InputHTMLAttributes } from "react";

interface ImageFileFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  placeholder?: string;
  accept?: string;
  className?: string;
}

const ImageFileForm = ({
  errors,
  accept,
  placeholder,
  type = "file",
  ...props
}: ImageFileFormProps) => {
  return (
    <>
      <div className="mb-4 relative">
        <input
          {...props}
          placeholder={placeholder}
          accept={accept}
          type={type}
          className={
            " bg-green-200 text-slate-800 max-w-3xs shadow-md border border-slate-300 p-1.5 rounded-sm font-black"
          }
        />
        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    </>
  );
};

export default ImageFileForm;
