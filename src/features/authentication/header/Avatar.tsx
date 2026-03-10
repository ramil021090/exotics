import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";
interface MyMetadata {
  username?: string;
  avatar: string;
}
const Avatar = () => {
  const user = useAuthenticationStore((state) => state.user);
  const { username, avatar } = user?.user_metadata as MyMetadata;

  return (
    <div className="flex justify-center items-center text-center gap-1">
      <img
        className="w-10 h-10  rounded-full object-cover "
        src={avatar || "../../images/default-avatar.png "}
        alt="avatar"
      />
      <span className="items-center text-center">{username}</span>
    </div>
  );
};

export default Avatar;
