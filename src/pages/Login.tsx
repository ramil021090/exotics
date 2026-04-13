import LoginForm from "../features/authentication/LoginForm";
import { useAuthenticationStore } from "../store/useAuthentication.tsx/useAuthenticationStore";
import Logo from "../ui/Logo";
import Subheader from "../ui/Subheader";

const Login = () => {
  const { isLoading } = useAuthenticationStore();

  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <div className="mb-8 md:mb-24">
        <Logo />
      </div>
      <Subheader
        title={isLoading ? "Signing..." : "Please sign in to continue."}
        classname="text-slate-700"
      />
      <LoginForm />
    </div>
  );
};

export default Login;
