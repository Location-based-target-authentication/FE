import { BASE_PATH } from "@/features/point/\bapi/path";
import { Point } from "@/features/point/\btypes/get-point";

import { GET } from "@/lib/axios";

export function getPoint(userId: number): Promise<Point> {
  return GET({ url: `${BASE_PATH}?${userId}` });
}
