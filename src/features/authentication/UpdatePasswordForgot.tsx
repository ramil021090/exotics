import type { UseFormRegister, FieldErrors } from "react-hook-form";
import Inputform2 from "../../forms/Inputform2";
import type { UpdateProfileForm } from "../../store/useAuthentication.tsx/actions/updateCurrentUser";
import Title from "../../ui/Title";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
interface UpdatePasswordForgot {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
}

const UpdatePasswordForgot = ({ register, errors }: UpdatePasswordForgot) => {
  const navigate = useNavigate();
  return (
    <>
      <Title text="Update Password" />
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
        register={register("confirmPassword", {
          required: "Confirm your password!",
          validate: (value, formValues) =>
            value === formValues.password || "Passwords do not match",
        })}
        errors={errors?.confirmPassword?.message}
      />
      <div className="flex justify-end gap-3 mt-4">
        <button
          className="bg-red-400 px-2 rounded-md shadow-md h-10"
          onClick={() => navigate(-1)}
        >
          cancel
        </button>
        <Button type="submit" title="update" />
      </div>
    </>
  );
};

export default UpdatePasswordForgot;
