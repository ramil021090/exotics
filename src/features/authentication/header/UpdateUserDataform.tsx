import Subheader from "../../../ui/Subheader";
import { useForm, type SubmitHandler } from "react-hook-form";
import Inputform2 from "../../../forms/Inputform2";
import Button from "../../../ui/Button";

type Password = string & { readonly __brand: unique symbol };

interface UpdateProfileForm {
  username: string;
  password: Password;
  repeatPassword: Password;
}

const UpdateUserDataform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileForm>();

  const onSubmit: SubmitHandler<UpdateProfileForm> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Subheader title="Update Profile" />
      <form
        className="bg-slate-100  py-1  shadow-lg lg:mx-40 2xl:mx-110"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Inputform2
          label="username"
          register={register("username", { required: "username is required!" })}
          errors={errors.username?.message}
        />
        <Inputform2
          label="password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Must be 8+ characters" },
            pattern: { value: /\d/, message: "Password must contain numbers" },
          })}
          errors={errors?.password?.message}
        />
        <Inputform2
          label="repeat password"
          register={register("repeatPassword", {
            required: "Please confirm your password",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
          errors={errors?.repeatPassword?.message}
        />
        <div className="flex justify-end">
          <Button type="submit" title="update" />
        </div>
      </form>
    </>
  );
};

export default UpdateUserDataform;
