import Subheader from "../../../ui/Subheader";
import Button from "../../../ui/Button";
import UpdatePasswordForgot from "../UpdatePasswordForgot";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";
import { useEffect, useState } from "react";
import DefaultPersonalInformation from "../DefaultPersonalInformation";
import type { IFormInput } from "../../../store/useAuthentication.tsx/actions/utility/types";
import type { UpdateProfileForm } from "../../../store/useAuthentication.tsx/actions/UpdateCurrentUser";
import toast from "react-hot-toast";

const UpdateUserDataform = () => {
  const [imagePreview, setImagePreview] = useState(false);
  const { user } = useAuthenticationStore();

  const getCurrentUser = useAuthenticationStore(
    (state) => state.getCurrentUser,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: user?.email || "",
      username: user?.user_metadata?.username || "",
    },
  });

  const navigate = useNavigate();
  const updateCurrentUser = useAuthenticationStore(
    (state) => state.updateCurrentUser,
  );

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const onSubmit: SubmitHandler<UpdateProfileForm> = async (data) => {
    try {
      await updateCurrentUser({
        password: data.password,
        confirmPassword: data.confirmPassword,
        avatar: data.avatar,
      });
      console.log(data);
      toast.success("Profile updated!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Update failed!");
    }
  };
  return (
    <>
      <Subheader title="Update Profile" />

      <form
        className="bg-white  p-10 mt-5  shadow-lg rounded-sm "
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
              {...register("avatar")}
            />
          </div>
          <div>
            {!imagePreview && (
              <img
                className="w-24 h-24  rounded-full object-cover shadow-sm  "
                src={"../../images/default-avatar.png "}
                alt={`avatar`}
              />
            )}
            {
              // <div>
              //   {imagePreview && (
              //     <img
              //       src={}
              //       alt="preview"
              //       className=" h-24 w-24 rounded-full shadow-sm"
              //     />
              //   )}
              //   {errors && (
              //     <p className="text-red-600 min-w-46">
              //       {errors?.avatar?.message}
              //     </p>
              //   )}
              // </div>
            }
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
