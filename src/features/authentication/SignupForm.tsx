import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import Button from "../../ui/Button";
import type { IFormInput } from "../../store/useAuthentication.tsx/actions/utility/types";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";
import { useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import { useState } from "react";
import toast from "react-hot-toast";

const genderID = ["male", "female", "other"];

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ defaultValues: { gender: "male" } });

  const signup = useAuthenticationStore((state) => state.signup);
  const { isLoading } = useAuthenticationStore();
  const navigate = useNavigate();

  const onSubmit = async (data: IFormInput) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await signup(data);
      reset();
      navigate("/login");
      console.log(data);
    } catch (error: unknown) {
      const err = error as {
        status?: number;
        message?: string;
        error?: { status?: number; message?: string };
      };
      const status = err?.status ?? err?.error?.status;
      const message = err?.message ?? err?.error?.message;
      if (status === 429 || message?.includes("rate limit")) {
        toast.error("Too many attempts! Please wait a minute.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center text-center h-screen border  max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border-gray-200/80 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo />
        <div className="my-4">
          <InputForm
            className=" border-b-2 my-2"
            placeholder="firstname"
            {...register("fullName.first_name", {
              required: "firstname is required!",
            })}
            errors={errors?.fullName?.first_name?.message}
          />
          <InputForm
            className=" border-b-2 my-2"
            placeholder="lastname"
            {...register("fullName.last_name", {
              required: "lastname is required!",
            })}
            errors={errors?.fullName?.last_name?.message}
          />
        </div>

        <div className="space-x-2">
          {genderID.map((gender, index) => (
            <label key={index + 1}>
              <input
                type="radio"
                value={gender}
                {...register("gender", {
                  required: "Please select a gender",
                })}
              />
              {gender}
            </label>
          ))}
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
        <div className="my-4">
          <InputForm
            className=" border-b-2 my-2"
            placeholder="username"
            {...register("username", {
              required: "username is required!",
            })}
            errors={errors?.username?.message}
          />
          <InputForm
            className=" border-b-2 my-2"
            placeholder="email✉"
            {...register("email", {
              required: "email address is required!",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please provide a valid email address",
              },
            })}
            errors={errors.email?.message}
          />
        </div>
        <div className="my-4">
          <InputForm
            className=" border-b-2 my-2"
            placeholder="password"
            type="password"
            // value="exotic2026"
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
            className=" border-b-2 my-2"
            placeholder="repeat password"
            type="password"
            // value="exotic2026"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "please confirm your password!",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
            errors={errors?.confirmPassword?.message}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="danger"
            type="button"
            title="cancel"
            onClick={() => navigate(-1)}
          />
          <Button
            variant="secondary"
            type="submit"
            title={isLoading ? "Signing up" : "sign up"}
          />
        </div>
      </form>
    </>
  );
};

export default SignupForm;
