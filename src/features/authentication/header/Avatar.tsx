import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";

const Avatar = () => {
  const user = useAuthenticationStore((state) => state.user);
  const username = user?.user_metadata?.username;
  const avatarUrl = user?.user_metadata?.avatar_url;

  const navigate = useNavigate();

  const goToMyProfile = async () => {
    if (user?.id) {
      setTimeout(() => navigate(`/profile/${user.id}`), 0);
    }
  };

  return (
    <div
      className="flex justify-center items-center text-center gap-1 "
      onClick={goToMyProfile}
    >
      <img
        className="w-10 h-10  rounded-full object-cover "
        src={avatarUrl || "../../images/default-avatar.png "}
        alt={`avatar of ${username || "user"} `}
      />
      <span className="items-center text-center">{username}</span>
    </div>
  );
};

export default Avatar;
