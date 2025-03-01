import HomeDisable from "@/asset/navbar/home-disable.svg?react";
import Home from "@/asset/navbar/home.svg?react";
import LocationDisable from "@/asset/navbar/location-disable.svg?react";
import Location from "@/asset/navbar/location.svg?react";
import UserDisable from "@/asset/navbar/user-disable.svg?react";
import User from "@/asset/navbar/user.svg?react";

import { paths } from "@/config/paths";

export const NOT_VISIBLE_NAVBAR_PAGES = [paths.profile.reward.getHref()];

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
    label: "목표",
    activeIcon: Location,
    notActiveIcon: LocationDisable,
    to: "/goal",
    isActvie: isEqualPath(locationPath, "/goal")
  },
  {
    label: "내정보",
    activeIcon: User,
    notActiveIcon: UserDisable,
    to: "/profile",
    isActvie: isEqualPath(locationPath, "/profile")
  }
];
