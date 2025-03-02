import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router";

import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore((state) => state);
  console.log("로그인 상태 확인:", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.path);
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
