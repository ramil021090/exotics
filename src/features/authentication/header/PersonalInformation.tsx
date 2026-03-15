import { useAuthenticationStore } from "../../../store/useAuthentication.tsx/useAuthenticationStore";

const PersonalInformation = () => {
  const user = useAuthenticationStore((state) => state.user);
  const username = user?.user_metadata?.username;
  const avatarUrl = user?.user_metadata?.avatar_url;
  const userId = user?.id;
  const createdDate = user?.created_at;

  console.log("userID:", user);
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
