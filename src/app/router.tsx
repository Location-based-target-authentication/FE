import Layout from "@/components/layouts/layout";

import { useMemo } from "react";

import DatePickView from "@/app/routes/goal/date-pick";
import {
  default as AppRoot,
  ErrorBoundary as RootErrorBoundary
} from "@/app/routes/index.tsx";
import GoogleCallback from "@/features/auth/routes/GoogleCallback";
import KakaoCallback from "@/features/auth/routes/KakaoCallback";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";

import { paths } from "@/config/paths";
import LoginView from "./routes/auth/login";
import CreateGoalView from "./routes/goal/create-goal";
import PrivateRoute from "./routes/PrivateRoute";

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
          path: paths.goal.goal.path,
          element: <CreateGoalView />
        },
        {
          path: paths.goal.date.path,
          element: <DatePickView />
        },
        {
          path: paths.map.search.path,
          lazy: () => import("./routes/map/search").then(convert(queryClient))
        },
        {
          path: "*",
          lazy: () => import("./routes/not-found").then(convert(queryClient))
        }
      ]
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
