import { Navbar } from "@/components/ui/navbar/navbar";

import { Outlet } from "react-router";

import { HasChildren } from "@/types/common.ts";

interface Props extends HasChildren {}

function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
