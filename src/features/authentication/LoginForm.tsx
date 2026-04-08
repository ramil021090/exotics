import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import Button from "../../ui/Button";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { Credentials } from "../../store/useAuthentication.tsx/actions/utility/types";
import Spinner from "../../ui/Spinner";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Credentials>();

  const login = useAuthenticationStore((state) => state.login);
  const navigate = useNavigate();
  const user = useAuthenticationStore((state) => state.user);
  const { error, isLoading } = useAuthenticationStore();

  useEffect(() => {
    if (user && !error) {
      navigate("/homepage");
    }
    reset();
  }, [error, navigate, reset, user]);

  const onSubmit = async (data: Credentials) => {
    if (!data.email || !data.password) {
      console.log("Empty fields – returning early");
      return;
    }
    await login(data);
  };

  if (isLoading) return <Spinner size={15} />;
  return (
    <div className="bg-lime-50  shadow-lg rounded-md">
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
        <div className="flex justify-end">
          <Button
            variant="secondary"
            className="bg-green-400 my-2"
            title="Login"
            type="submit"
          />
        </div>
      </form>
      <div className="flex justify-end ">
        <button
          className=" px-10 py-2 hover:text-blue-600 "
          onClick={() => navigate("/signup")}
        >
          <p className="text-sm">Sign up</p>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
