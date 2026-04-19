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
      <div className="px-2 mb-4 space-y-2">
        <div className="flex justify-end">
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <InputForm
            className="flex-1 border-b-2 border-gray-300 pb-1 focus:border-amber-500 focus:outline-none transition-colors"
            {...register("username")}
          />
        </div>
      </div>
    </>
  );
};

export default DefaultPersonalInformation;
