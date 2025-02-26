import coffeeCouponUrl from "@/asset/reward/coffe-coupon.jpeg?url";
import convenienceStoreCouponUrl from "@/asset/reward/convenience-store-coupon.jpeg?url";

export const generateCoupons = (point: number, isPending: boolean) => {
  const baseClass =
    "absolute bottom-0 left-0 flex h-12 w-full items-center justify-center rounded-b-lg font-semibold text-white";

  return [
    {
      id: 1,
      name: "스타벅스 쿠폰(5,000p 소모)",
      cost: 5000,
      image: coffeeCouponUrl,
      isDisabled: point < 5000,
      className: `${baseClass} ${point >= 5000 && !isPending ? "bg-green-500" : "cursor-not-allowed bg-gray-400"}`
    },
    {
      id: 2,
      name: "편의점 1만원 쿠폰(10,000p 소모)",
      cost: 10000,
      image: convenienceStoreCouponUrl,
      isDisabled: point < 10000,
      className: `${baseClass} ${point >= 10000 && !isPending ? "bg-green-500" : "cursor-not-allowed bg-gray-400"}`
    }
  ];
};
