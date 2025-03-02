import type { R } from "@/types/common";
import { POST } from "@/lib/axios";
import type { RoDataAndPathParamsType } from "@/lib/axios/utils";
import { POINT_DEDUC } from "./path";

export function postRewards({
  pathParams: { userId },
  data
}: RoDataAndPathParamsType<
  { points: number; pointType: string; description: string },
  { userId: number }
>): R<{
  point: number;
  status: string;
}> {
  return POST({ url: POINT_DEDUC(userId), data });
}
