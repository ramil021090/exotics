import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import Button from "../../ui/Button";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormProps>();

  const login = useAuthenticationStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormProps) => {
    if (!data.email || !data.password) return;
    await login(data);

    const { user, error } = useAuthenticationStore.getState();
    if (user && !error) {
      navigate("/marketplace");
    }
    reset();
  };
  return (
    <>
      <form
        className="bg-blue-100 p-10 shadow-lg rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm
          label="Email address"
          {...register("email", { required: "email is required!" })}
          errors={errors?.email?.message}
        />
        <InputForm
          label="Password"
          type="password"
          {...register("password", { required: "password is required!" })}
          errors={errors?.password?.message}
        />
        <Button variant="secondary" title="Login" type="submit" />
      </form>
    </>
  );
};

export default LoginForm;
