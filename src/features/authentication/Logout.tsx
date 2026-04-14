import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { useAuthenticationStore } from "../../store/useAuthentication.tsx/useAuthenticationStore";

const Logout = () => {
  const logout = useAuthenticationStore((state) => state.logout);
  return (
    <button className="hover:text-red-500" onClick={logout}>
      <div className="flex items-center">
        <HiMiniArrowRightStartOnRectangle /> <span>logout</span>
      </div>
    </button>
  );
};

export default Logout;
