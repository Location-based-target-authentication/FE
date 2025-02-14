import HomeDisable from "@/asset/navbar/home-disable.svg";
import Home from "@/asset/navbar/home.svg";
import UserDisable from "@/asset/navbar/user-disable.svg";
import User from "@/asset/navbar/user.svg";

const isEqualPath = (locationPath, path) => locationPath === path;

export const generateNavbarInfo = (locationPath) => [
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
