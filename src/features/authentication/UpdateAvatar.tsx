import Title from "../../ui/Title";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UpdateProfileForm } from "../../store/useAuthentication.tsx/actions/utility/types";

interface UpdateAvatarProps {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
}

const UpdateAvatar = ({ register }: UpdateAvatarProps) => {
  return (
    <div className="flex flex-col mb-4">
      <Title text="Update Avatar" />
      <div className="">
        <div>
          <input
            className="p-2 bg-green-400  shadow-sm rounded-sm  max-w-52 font-black"
            type="file"
            accept="image/*"
            {...register("avatar")}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateAvatar;
