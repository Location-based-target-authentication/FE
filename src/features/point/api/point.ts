import { BASE_PATH } from "@/features/point/api/path";
import { Point } from "@/features/point/types/get-point";

import { GET } from "@/lib/axios";

export function getPoint(pathParam: { userId: number }): Promise<Point> {
  return GET({ url: `${BASE_PATH}/${pathParam.userId}` });
}
