import HomeDisable from "@/asset/navbar/home-disable.svg?react";
import Home from "@/asset/navbar/home.svg?react";
import UserDisable from "@/asset/navbar/user-disable.svg?react";
import User from "@/asset/navbar/user.svg?react";

import { paths } from "@/config/paths";

export const NOT_VISIBLE_NAVBAR_PAGES = [
  paths.map.search.getHref(),
  paths.map.certification.getHref()
];

const isEqualPath = (locationPath: string, path: string) => {
  return locationPath === path;
};

export const generateNavbarInfo = (locationPath: string) => [
  {
    label: "홈",
    activeIcon: Home,
    notActiveIcon: HomeDisable,
    to: "/",
    isActvie: isEqualPath(locationPath, "/")
  },
  {
    label: "내정보",
    activeIcon: User,
    notActiveIcon: UserDisable,
    to: "/map",
    isActvie: isEqualPath(locationPath, "/map")
  }
];
