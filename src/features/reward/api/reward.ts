import type { R } from "@/types/common";
import { POST } from "@/lib/axios";
import type { RoOnlyPathParamsType } from "@/lib/axios/utils";
import { POINT_DEDUC } from "./path";

export function postRewards({
  pathParams: { socialId }
}: RoOnlyPathParamsType<{ socialId: number }>): R<{ point: number }> {
  return POST({ url: POINT_DEDUC(socialId) });
}
