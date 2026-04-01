import type { Profile } from "../../../store/feed/actions/utility/types";
import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";

interface PersonalInformationProps {
  profile?: Profile | null;
}

const PersonalInformation = ({ profile }: PersonalInformationProps) => {
  const user = useAuthenticationStore((state) => state.user);
  const username = profile?.username || user?.user_metadata?.username;
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;
  const userId = profile?.id || user?.id;
  const createdDate = profile?.created_at || user?.created_at;

  const name = username ? username[0].toUpperCase() + username.slice(1) : " ";
  const date = createdDate
    ? new Date(createdDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "";
  return (
    <>
      <p className="text-center h-60 w-auto border rounded-sm ">cover photo</p>
      <div className="flex my-3 items-center">
        <img
          className="w-16 h-16    
                      xs:w-24 xs:h-24
                      sm:w-32 sm:h-32                     
                      md:w-40 md:h-40                    
                      lg:w-48 lg:h-48                     
                      xl:w-56 xl:h-56    
                      rounded-full object-cover
                    "
          src={avatarUrl || "../../images/default-avatar.png "}
          alt={`avatar of ${username || "user"} `}
        />
        <div className="mx-2 ">
          <p className="font-bold text-lg">{name}</p>
          <p className="font-sans text-md border-slate-300 bg-white shadow-xs p-2  dark:bg-slate-900">
            ID: {userId}
          </p>
          <div className="my-2">
            <p>member since {date}</p>
            <p>popularity/likes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
