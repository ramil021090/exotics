import type { UseFormRegister, FieldErrors } from "react-hook-form";
import Inputform2 from "../../forms/Inputform2";
import type { UpdateProfileForm } from "./header/UpdateUserDataform";
interface UpdatePasswordForgot {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
}

const UpdatePasswordForgot = ({ register, errors }: UpdatePasswordForgot) => {
  return (
    <>
      {" "}
      <Inputform2
        label="password"
        type="password"
        autoComplete="new-password"
        register={register("password", {
          required: "Password is required!",
          minLength: { value: 8, message: "Must be 8+ characters" },
          pattern: { value: /\d/, message: "Password must contain numbers" },
        })}
        errors={errors?.password?.message}
      />
      <Inputform2
        label="repeat password"
        type="password"
        autoComplete="new-password"
        register={register("repeatPassword", {
          required: "Confirm your password!",
          validate: (value, formValues) =>
            value === formValues.password || "Passwords do not match",
        })}
        errors={errors?.repeatPassword?.message}
      />
    </>
  );
};

export default UpdatePasswordForgot;
