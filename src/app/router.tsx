import Layout from "@/components/layouts/layout";

import { useMemo } from "react";

import {
  default as AppRoot,
  ErrorBoundary as RootErrorBoundary
} from "@/app/routes/index.tsx";
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
          element: <AppRoot />,
          ErrorBoundary: RootErrorBoundary
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
