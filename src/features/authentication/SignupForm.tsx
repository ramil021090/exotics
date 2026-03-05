import { useForm } from "react-hook-form";
import InputForm from "../../forms/InputForm";
import Button from "../../ui/Button";
import { useState } from "react";
import type { IFormInput } from "../../store/useAuthentication.tsx/actions/utility/types";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";

const genderID = ["male", "female", "other"];

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ defaultValues: { gender: "male" } });

  const [onClose, setOnClose] = useState(true);
  const signup = useAuthenticationStore((state) => state.signup);

  const handleClose = () => {
    setOnClose(!onClose);
  };

  const onSubmit = async (data: IFormInput) => {
    await signup(data);
    reset();
    console.log(data);
  };

  return (
    <>
      {onClose && (
        <form
          className="flex flex-col items-center h-screen "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2 mb-5">
            <InputForm
              label="firstname"
              {...register("fullName.firstName", {
                required: "firstname is required!",
              })}
              errors={errors?.fullName?.firstName?.message}
            />
            <InputForm
              label="lastname"
              {...register("fullName.lastName", {
                required: "lastname is required!",
              })}
              errors={errors?.fullName?.lastName?.message}
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
          <div className="flex gap-2">
            <InputForm
              label="username"
              {...register("username", {
                required: "username is required!",
              })}
              errors={errors?.username?.message}
            />
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
          </div>
          <div className="flex gap-2 mb-5">
            <InputForm
              label="password"
              type="password"
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
              type="password"
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
              onToggle={handleClose}
            />
            <Button variant="secondary" type="submit" title="add member" />
          </div>
        </form>
      )}
    </>
  );
};

export default SignupForm;
