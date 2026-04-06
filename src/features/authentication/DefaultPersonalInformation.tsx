import type { User } from "@supabase/supabase-js";
import InputForm from "../../forms/InputForm";
import type { UseFormRegister } from "react-hook-form";
import type { UpdateProfileForm } from "../../store/useAuthentication.tsx/actions/utility/types";

interface DefaultPersonalInformationProps {
  user: User | null;
  register: UseFormRegister<UpdateProfileForm>;
}
const DefaultPersonalInformation = ({
  user,
  register,
}: DefaultPersonalInformationProps) => {
  return (
    <>
      <div className=" px-2 mb-4 ">
        <div className="flex justify-end">{user?.email}</div>
        <div className="flex flex-col items-center">
          <label>username</label>
          {/* <div className="  min-w-46">{user?.user_metadata?.username}</div> */}
          <InputForm
            className="max-w-2xs border border-slate-300 rounded-md"
            {...register("username")}
          />
        </div>
      </div>
    </>
  );
};

export default DefaultPersonalInformation;
