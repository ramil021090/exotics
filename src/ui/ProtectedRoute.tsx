import type { ReactNode } from "react";
import { useAuthenticationStore } from "../store/useAuthentication.tsx/useAuthenticationStore";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  //1. get the authenticated user
  const getCurrentUser = useAuthenticationStore(
    (state) => state.getCurrentUser,
  );
  const { isLoading, user } = useAuthenticationStore();
  console.log("user:", user);

  //2.while loading
  if (isLoading)
    return (
      <h1 className="h-screen flex justify-center items-center">"Loading";</h1>
    );

  //3.

  return children;
};

export default ProtectedRoute;
