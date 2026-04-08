import Button from "../../ui/Button";
import InputForm from "../../forms/InputForm";
import { useForm } from "react-hook-form";
import type { IFormInput } from "../../store/useAuthentication.tsx/actions/utility/types";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";
interface InviteNewKeeperProps {
  onCancel: () => void;
}
const InviteNewKeeper = ({ onCancel }: InviteNewKeeperProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ defaultValues: { gender: "male" } });

  const signup = useAuthenticationStore((state) => state.signup);
  const { isLoading } = useAuthenticationStore();

  const onSubmit = async (data: IFormInput) => {
    await signup(data);
    reset();
    console.log(data);
  };
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        label="email"
        {...register("email", {
          required: "email address is required!",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Please provide a valid email address",
          },
        })}
        errors={errors.email?.message}
      />
      <h1 className="mt-4">default password</h1>
      <InputForm
        label="password"
        // type="password"
        value="exotic2026"
        autoComplete="new-password"
        {...register("password", {
          required: "password is required!",
          minLength: { value: 8, message: "Must be 8+ characters" },
          pattern: {
            value: /\d/,
            message: "Password must contain numbers",
          },
        })}
        errors={errors?.password?.message}
      />
      <InputForm
        label="confirm password"
        // type="password"
        value="exotic2026"
        autoComplete="new-password"
        {...register("confirmPassword", {
          required: "please confirm your password!",
          validate: (value, formValues) =>
            value === formValues.password || "Passwords do not match",
        })}
        errors={errors?.confirmPassword?.message}
      />
      <div className="flex gap-2">
        <Button
          variant="danger"
          type="button"
          title="cancel"
          onClick={() => {
            reset();
            onCancel();
          }}
        />
        <Button
          variant="secondary"
          type="submit"
          title={isLoading ? "Sending..." : "Invite Keeper"}
        />
      </div>
    </form>
  );
};

export default InviteNewKeeper;
