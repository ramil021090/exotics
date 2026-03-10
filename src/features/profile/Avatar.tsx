import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";
interface MyMetadata {
  username?: string;
  avatar: string;
}
const Avatar = () => {
  const user = useAuthenticationStore((state) => state.user);
  const { username, avatar } = user?.user_metadata as MyMetadata;

  return (
    <div className="flex">
      <img
        className="w-10 h-10 border border-solid rounded-full object-cover shadow-md "
        src={avatar || "../../images/red-sold.png "}
        alt="avatar"
      />
      <span>{username}</span>
    </div>
  );
};

export default Avatar;
