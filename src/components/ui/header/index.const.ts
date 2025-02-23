import CoffeIcon from "@/asset/common/coffee.svg?react";
import Coupon from "@/asset/common/coupon.svg?react";
import homeBackGroundFirst from "@/asset/home/home-background-first.png?url";
import homeBackGroundSecond from "@/asset/home/home-background-second.png?url";
import homeBackGroundThird from "@/asset/home/home-background-third.png?url";

export const backgroundImages = [
  homeBackGroundFirst,
  homeBackGroundSecond,
  homeBackGroundThird
];

export const generateKeyword = (point: number) => {
  if (point <= 500) return "coffee";
  else if (point > 500) return "convenienceStore";
  else return "reward";
};

export const generateIcon = (keyword: "coffee" | "convenienceStore") => {
  if (keyword === "coffee") return CoffeIcon;
  else if (keyword === "convenienceStore") return Coupon;
  else return Coupon;
};

export const generateProgressPercent = (point: number) => {
  if (point <= 500) return (point / 500) * 100;
  else if (point > 500) return (point / 1000) * 100;
  else return 100;
};
