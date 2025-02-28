import Layout from "@/components/layouts/layout";

import { useMemo } from "react";

import KakaoCallback from "@/app/routes/auth/kakao-callback";
import LoginView from "@/app/routes/auth/login";
import CreateGoalView from "@/app/routes/goal/create-goal";
import {
  default as AppRoot,
  ErrorBoundary as RootErrorBoundary
} from "@/app/routes/index.tsx";
import PrivateRoute from "@/app/routes/PrivateRoute";
import GoogleCallback from "@/features/auth/routes/GoogleCallback";
import DatePickView from "@/features/goal/components/create-goal/date-pick";
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

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: paths.home.path,
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <AppRoot />
            }
          ],
          ErrorBoundary: RootErrorBoundary
        },
        {
          path: paths.map.search.path,
          lazy: () => import("./routes/map/search").then(convert(queryClient))
        },
        {
          path: paths.map.certification.path,
          lazy: () =>
            import("./routes/map/certification").then(convert(queryClient))
        },
        {
          path: paths.map.certification.sucess.path,
          lazy: () =>
            import("./routes/map/certification/success").then(
              convert(queryClient)
            )
        },
        {
          path: paths.profile.reward.path,
          lazy: () =>
            import("./routes/profile/reward").then(convert(queryClient))
        },
        {
          path: paths.goal.root.path,
          lazy: () => import("./routes/goal").then(convert(queryClient))
        },
        {
          path: "*",
          lazy: () => import("./routes/not-found").then(convert(queryClient))
        },
        {
          path: paths.goal.create.path,
          element: <CreateGoalView />
        },
        {
          path: paths.goal.date.path,
          element: <DatePickView />
        }
      ]
    },
    {
      path: paths.auth.kakaoCallback.path,
      element: <KakaoCallback />
    },
    {
      path: paths.auth.googleCallback.path,
      element: <GoogleCallback />
    },
    {
      path: paths.auth.login.path,
      element: <LoginView />
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
