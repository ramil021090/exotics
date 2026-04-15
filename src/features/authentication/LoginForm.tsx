import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";
import type { Credentials } from "../../store/useAuthentication.tsx/actions/utility/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import InputForm from "../../forms/InputForm";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Credentials>();

  const login = useAuthenticationStore((state) => state.login);
  const user = useAuthenticationStore((state) => state.user);
  const navigate = useNavigate();
  const { error, isLoading } = useAuthenticationStore();

  useEffect(() => {
    if (user && !error) {
      navigate(`/homepage/${user.id}`);
    }
    reset();
  }, [error, navigate, reset, user]);

  const onSubmit = async (data: Credentials) => {
    if (!data.email || !data.password) {
      return;
    }
    await login(data);
    console.error(error);
  };

  if (isLoading) return <Spinner size={25} />;
  return (
    <div className="bg-lime-50  flex flex-col justify-center items-center  shadow-md rounded-md">
      <form className=" p-10 " onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          label="Email address"
          {...register("email", { required: "email is required!" })}
          errors={errors?.email?.message}
        />
        <InputForm
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register("password", { required: "password is required!" })}
          errors={errors?.password?.message}
        />
        <Button
          variant="secondary"
          className="bg-green-400 w-full flex justify-center items-center text-white"
          title="Sign in"
          type="submit"
        />
      </form>
      <p className="text-sm mx-0.5">Don't have an account?</p>
      <button
        className=" mb-3 hover:text-blue-600 "
        onClick={() => navigate("/signup")}
      >
        <p className="text-sm text-blue-600">Sign up</p>
      </button>
    </div>
  );
};

export default LoginForm;
