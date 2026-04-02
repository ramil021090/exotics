import Subheader from "../../../ui/Subheader";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";
import DefaultPersonalInformation from "../DefaultPersonalInformation";
import type { IFormInput } from "../../../store/useAuthentication.tsx/actions/utility/types";
import toast from "react-hot-toast";
import type { UpdateProfileForm } from "../../../store/useAuthentication.tsx/actions/updateCurrentUser";
// import UpdateAvatar from "../UpdateAvatar";
// import UpdatePasswordForgot from "../UpdatePasswordForgot";
import Spinner from "../../../ui/Spinner";
import Button from "../../../ui/Button";
interface UpdateUserDataformProps {
  onCancel: () => void;
}

const UpdateUserDataform = ({ onCancel }: UpdateUserDataformProps) => {
  const { user } = useAuthenticationStore();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      email: user?.email || "",
      username: user?.user_metadata?.username || "",
    },
  });

  const updateCurrentUser = useAuthenticationStore(
    (state) => state.updateCurrentUser,
  );
  const { isLoading } = useAuthenticationStore();

  const onSubmit: SubmitHandler<UpdateProfileForm> = async (data) => {
    try {
      await updateCurrentUser({
        password: data.password,
        avatar: data.avatar,
        username: data.username,
      });
      toast.success("Update succesfully!");
      reset();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update!");
    }
  };
  if (!user) {
    return <Spinner size={24} />;
  }
  return (
    <>
      <Subheader title="Update Profile" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <DefaultPersonalInformation register={register} user={user} />

        {/* <UpdatePasswordForgot register={register} errors={errors} /> */}

        {/* <UpdateAvatar register={register} errors={errors} /> */}
        <div className="flex justify-between">
          <Button
            variant="danger"
            title="cancel"
            type="reset"
            onClick={() => {
              reset();
              onCancel();
            }}
          />
          <Button
            variant="primary"
            title="update"
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </>
  );
};

export default UpdateUserDataform;
