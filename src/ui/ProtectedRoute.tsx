import { useEffect, type ReactNode } from "react";
import { useAuthenticationStore } from "../store/useAuthentication.tsx/useAuthenticationStore";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { isLoading, user } = useAuthenticationStore();
  const getCurrentUser = useAuthenticationStore(
    (state) => state.getCurrentUser,
  );

  console.log("user:", user);

  //.if there is no authenticated user, back to login
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  //. get the authenticated user
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  //.while loading
  if (isLoading)
    return (
      <h1 className="h-screen flex justify-center items-center">"Loading";</h1>
    );

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
