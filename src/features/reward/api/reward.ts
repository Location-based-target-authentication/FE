import type { R } from "@/types/common";
import { POST } from "@/lib/axios";
import type { RoDataAndPathParamsType } from "@/lib/axios/utils";
import { POINT_DEDUC } from "./path";

export function postRewards({
  pathParams: { socialId },
  data
}: RoDataAndPathParamsType<{ pointType: string }, { socialId: number }>): R<{
  point: number;
  status: string;
}> {
  return POST({ url: POINT_DEDUC(socialId), data });
}
