import Layout from "@/components/layouts/layout";

import { useMemo } from "react";

import AgreementView from "@/app/routes/auth/agreement";
import KakaoCallback from "@/app/routes/auth/kakao-callback";
import LoginView from "@/app/routes/auth/login";
import PhoneNumberInputView from "@/app/routes/auth/phone-number";
import {
  default as AppRoot,
  ErrorBoundary as RootErrorBoundary
} from "@/app/routes/index.tsx";
import PrivateRoute from "@/app/routes/PrivateRoute";
import GoogleCallback from "@/features/auth/routes/GoogleCallback";
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
          path: paths.goal.path,
          lazy: () => import("./routes/goal").then(convert(queryClient))
        },
        {
          path: "*",
          lazy: () => import("./routes/not-found").then(convert(queryClient))
        },
        {
          path: paths.auth.agreement.path,
          element: <AgreementView />
        },
        {
          path: paths.auth.phoneNumber.path,
          element: <PhoneNumberInputView />
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
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
