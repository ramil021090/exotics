import Subheader from "../../../ui/Subheader";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";
import DefaultPersonalInformation from "../DefaultPersonalInformation";
import type { UpdateProfileForm } from "../../../store/useAuthentication.tsx/actions/utility/types";

import UpdateAvatar from "../UpdateAvatar";
import toast from "react-hot-toast";

const UpdateUserDataform = () => {
  const { user } = useAuthenticationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileForm>({
    defaultValues: {
      email: user?.email || "",
      username: user?.user_metadata?.username || "",
    },
  });

  const navigate = useNavigate();
  const updateCurrentUser = useAuthenticationStore(
    (state) => state.updateCurrentUser,
  );

  const onSubmit: SubmitHandler<UpdateProfileForm> = async (data) => {
    try {
      await updateCurrentUser({
        password: data.password,
        avatar: data.avatar,
      });
      toast.success("Updated succesfully!");
      reset();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update!");
    } finally {
      navigate(-1);
    }
  };
  return (
    <div className="dark:bg-slate-700">
      <Subheader title="Update Profile" />

      <form
        className="bg-white dark:bg-slate-700  p-10 mt-5  shadow-lg rounded-sm "
        onSubmit={handleSubmit(onSubmit)}
      >
        <DefaultPersonalInformation user={user} />

        {/* <UpdatePasswordForgot register={register} errors={errors} /> */}

        <UpdateAvatar register={register} errors={errors} />
      </form>
    </div>
  );
};

export default UpdateUserDataform;
