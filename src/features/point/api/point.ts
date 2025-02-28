import { BASE_PATH } from "@/features/point/\bapi/path";
import { Point } from "@/features/point/\btypes/get-point";

import { GET } from "@/lib/axios";

export function getPoint({
  params
}: {
  params: { userId: number };
}): Promise<Point> {
  return GET({ url: `${BASE_PATH}`, params }); // 확인필요
}
