import Subheader from "../../../ui/Subheader";
import Button from "../../../ui/Button";
import UpdatePasswordForgot from "../UpdatePasswordForgot";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";
import { useEffect } from "react";
import DefaultPersonalInformation from "../DefaultPersonalInformation";

type Password = string & { readonly __brand: unique symbol };

export interface UpdateProfileForm {
  email: string;
  username: string;
  password: Password;
  repeatPassword: Password;
  avatar: string;
}

const UpdateUserDataform = () => {
  const { user } = useAuthenticationStore();

  const getCurrentUser = useAuthenticationStore(
    (state) => state.getCurrentUser,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdateProfileForm>({
    defaultValues: {
      email: user?.email || "",
      username: user?.user_metadata?.username || "",
    },
  });
  const imageFile = watch("avatar")?.[0];
  const imagePreview = imageFile ? URL.createObjectURL(imageFile) : null;
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UpdateProfileForm> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Subheader title="Update Profile" />
      <form
        className="bg-slate-100  p-10 mt-5  shadow-md rounded-sm "
        onSubmit={handleSubmit(onSubmit)}
      >
        <DefaultPersonalInformation user={user} />

        <UpdatePasswordForgot register={register} errors={errors} />

        <div className="flex justify-between">
          <div className="">
            <input
              className="p-2 font-black rounded-sm shadow-md"
              type="file"
              accept="image/*"
              {...register("avatar", {
                required: "Image is required!",
              })}
            />
          </div>
          {/* <img
            className="w-10 h-10  rounded-full object-cover "
            src={"../../images/default-avatar.png "}
            alt={`avatar`}
          /> */}

          <div>
            {imagePreview && (
              <img
                src={imagePreview || "upload avatar"}
                alt="preview"
                className=" h-48 w-48 rounded-full"
              />
            )}
            {errors && (
              <p className="text-red-600 min-w-46">{errors?.avatar?.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="bg-red-400 px-2 rounded-md shadow-md h-10"
            onClick={() => navigate(-1)}
          >
            cancel
          </button>
          <Button type="submit" title="update" />
        </div>
      </form>
    </>
  );
};

export default UpdateUserDataform;
