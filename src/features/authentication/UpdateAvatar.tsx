import Title from "../../ui/Title";
import type { UpdateProfileForm } from "../../store/useAuthentication.tsx/actions/updateCurrentUser";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

interface UpdateAvatarProps {
  register: UseFormRegister<UpdateProfileForm>;
  errors: FieldErrors<UpdateProfileForm>;
}

const UpdateAvatar = ({ register }: UpdateAvatarProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <Title text="Update Avatar" />
      <div className="">
        <div>
          <input
            className="p-2 bg-green-400  shadow-sm rounded-sm  font-black"
            type="file"
            accept="image/*"
            {...register("avatar")}
          />
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
        {/* <div>
            {!imagePreview && (
              <img
                className="w-24 h-24  rounded-full object-cover shadow-sm  "
                src={"../../images/default-avatar.png "}
                alt={`avatar`}
              />
            )} */}
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default UpdateAvatar;
