import type { R } from "@/types/common";
import { GET, POST } from "@/lib/axios";
import type {
  RoDataAndPathParamsType,
  RoOnlyPathParamsType
} from "@/lib/axios/utils";
import type { Point } from "../types";
import { POINT_DEDUC, POINTS } from "./path";

export function postRewards({
  pathParams: { userId },
  data
}: RoDataAndPathParamsType<
  { points: number; pointType: string; description: string },
  { userId: string }
>): R<{
  point: number;
  status: string;
}> {
  return POST({ url: POINT_DEDUC(userId), data });
}

export function getPoint({
  pathParams: { userId }
}: RoOnlyPathParamsType<{ userId: string }>): R<Point> {
  return GET({ url: POINTS(userId) });
}
