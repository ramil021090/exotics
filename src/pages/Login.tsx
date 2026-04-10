import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Subheader from "../ui/Subheader";

const Login = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <Logo />
      <Subheader
        title="Please sign in to continue."
        classname="text-slate-700"
      />
      <LoginForm />
    </div>
  );
};

export default Login;
