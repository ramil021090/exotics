import type { User } from "@supabase/supabase-js";

interface DefaultPersonalInformationProps {
  user: User | null;
}
const DefaultPersonalInformation = ({
  user,
}: DefaultPersonalInformationProps) => {
  return (
    <>
      <div className="px-2 mb-4">
        <div className="flex justify-between">
          <label>Email</label>
          <div className="min-w-46">{user?.email}</div>
        </div>
        <div className="flex justify-between">
          <label>username</label>
          <div className="  min-w-46">{user?.user_metadata?.username}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultPersonalInformation;
