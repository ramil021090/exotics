import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Subheader from "../ui/Subheader";

const Login = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <Logo />
      <Subheader title="Log in to your account" />
      <LoginForm />
    </div>
  );
};

export default Login;
