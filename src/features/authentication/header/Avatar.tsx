import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";

const Avatar = () => {
  const user = useAuthenticationStore((state) => state.user);
  const username = user?.user_metadata?.username;
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="flex justify-center items-center text-center gap-1">
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
