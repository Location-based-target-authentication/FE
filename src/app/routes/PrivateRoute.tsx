import { Outlet } from "react-router-dom";

import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore((state) => state);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    (window.location.href = paths.auth.login.path)
  );
};

export default PrivateRoute;
