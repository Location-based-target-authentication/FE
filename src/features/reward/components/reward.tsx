import { useMemo } from "react";

import { useMutation } from "@tanstack/react-query";
import { map } from "es-toolkit/compat";
import { toast } from "react-toastify";

import { useUserStore } from "@/stores/user";
import { generate_qo_postRewards } from "@/lib/react-query/queryOptions/reward.ts";
import { generateCoupons } from "./index.const";
import SuccessToast from "./success-toast";

export default function Reward() {
  const { point, setPoint } = useUserStore();

  const { mutate, isPending } = useMutation({
    ...generate_qo_postRewards(1),
    onSuccess: (data) => {
      setPoint(data.point);
      toast(<SuccessToast />, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        className:
          "flex justify-center items-center bg-transparent shadow-none p-0 w-full"
      });
    }
  });

  const loaledPoint = useMemo(() => `${point.toLocaleString()}p`, [point]);
  const coupons = useMemo(
    () => generateCoupons(point, isPending),
    [point, isPending]
  );

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="mb-2 mt-3 flex items-center justify-between">
        <span>현재 포인트</span>
        <span className="text-green-500">{loaledPoint}</span>
      </div>

      <p className="text-sm text-gray-400">
        신청 후 최대 3일 안에 쿠폰이 전달됩니다.
      </p>

      <div className="mt-4 space-y-4">
        {map(coupons, ({ id, image, name, isDisabled, className }) => (
          <div
            key={id}
            className="relative flex items-center gap-4 overflow-hidden rounded-xl"
          >
            <div
              className="h-36 w-full rounded-lg bg-cover bg-center after:absolute after:inset-0 after:bg-black/50 after:content-['']"
              style={{ backgroundImage: `url(${image})` }}
            />

            <p className="absolute inset-x-0 top-1/4 flex justify-center text-white">
              {name}
            </p>

            <button
              onClick={() => mutate()}
              className={`${className}`}
              disabled={isDisabled}
            >
              교환하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
