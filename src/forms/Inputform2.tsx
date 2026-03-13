import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputForm2Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  register?: UseFormRegisterReturn;
}

const Inputform2 = ({ label, errors, register, ...props }: InputForm2Props) => {
  return (
    <div className="flex justify-between p-2 gap-2  ">
      <label>{label}</label>
      <div className="flex flex-col">
        <input
          className="border rounded-sm  py-2 bg-white"
          {...props}
          {...register}
        />
        {errors && <p className="text-red-600">{errors}</p>}
      </div>
    </div>
  );
};

export default Inputform2;
