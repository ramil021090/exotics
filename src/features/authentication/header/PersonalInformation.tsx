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

  return (
    <>
      <p className="text-center h-60 border rounded-sm ">cover photo</p>
      <div className="flex">
        <img
          className="w-45 h-48  rounded-full object-cover "
          src={avatarUrl || "../../images/default-avatar.png "}
          alt={`avatar of ${username || "user"} `}
        />
        <div>
          <p>{username}</p>
          <p>ID:{userId}</p>
          <p>member since {createdDate}</p>
          <p>popularity/likes</p>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
