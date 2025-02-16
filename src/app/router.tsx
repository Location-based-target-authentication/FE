import { useMemo } from "react";

import KakaoCallback from "@/app/routes/auth/kakao-callback";
import LoginView from "@/app/routes/auth/login";
import CreateGoalView from "@/app/routes/goal/create-goal";
import DatePickView from "@/app/routes/goal/date-pick";
import {
  default as AppRoot,
  ErrorBoundary as RootErrorBoundary
} from "@/app/routes/index.tsx";
import PrivateRoute from "@/app/routes/PrivateRoute";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";

import { paths } from "@/config/paths";

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: <PrivateRoute />,
      children: [
        {
          index: true,
          element: <AppRoot />
        },
        {
          path: paths.map.path,
          lazy: () => import("./routes/map/view").then(convert(queryClient))
        }
      ],
      ErrorBoundary: RootErrorBoundary
    },
    {
      path: paths.auth.kakaoCallback.path,
      element: <KakaoCallback />
    },
    {
      path: paths.auth.googleCallback.path,
      element: <KakaoCallback />
    },
    {
      path: paths.auth.login.path,
      element: <LoginView />
    },
    {
      path: paths.goal.goal.path,
      element: <CreateGoalView />
    },
    {
      path: paths.goal.date.path,
      element: <DatePickView />
    },
    {
      path: "*",
      lazy: () => import("./routes/not-found").then(convert(queryClient))
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
