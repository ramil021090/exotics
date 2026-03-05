import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import Button from "../../ui/Button";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { Credentials } from "../../store/useAuthentication.tsx/actions/utility/types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Credentials>();

  const login = useAuthenticationStore((state) => state.login);
  const navigate = useNavigate();
  const { user, error } = useAuthenticationStore.getState();

  useEffect(() => {
    if (user && !error) {
      navigate("/marketplace");
    }
    reset();
  }, [error, navigate, reset, user]);

  const onSubmit = async (data: Credentials) => {
    if (!data.email || !data.password) return;
    await login(data);
  };
  return (
    <>
      <form
        className="bg-blue-100 p-10 shadow-lg rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm
          // className="inset-shadow-sm bg-white outline outline-offset-2 rounded-sm"
          // value="ramil@example.com"
          label="Email address"
          {...register("email", { required: "email is required!" })}
          errors={errors?.email?.message}
        />
        <InputForm
          // className="inset-shadow-sm bg-white outline outline-offset-2 rounded-sm"
          value="villahermosa021090"
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register("password", { required: "password is required!" })}
          errors={errors?.password?.message}
        />
        <Button variant="secondary" title="Login" type="submit" />
      </form>
    </>
  );
};

export default LoginForm;
