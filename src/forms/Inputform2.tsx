import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputForm2Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  register?: UseFormRegisterReturn;
}

const Inputform2 = ({ label, errors, register, ...props }: InputForm2Props) => {
  return (
    <div className="flex justify-between py-1.5 mx-10 pr-10 ">
      <label>{label}</label>
      {errors && <p className="text-red-600">{errors}</p>}
      <input className="border rounded-sm px-3 py-2" {...props} {...register} />
    </div>
  );
};

export default Inputform2;
