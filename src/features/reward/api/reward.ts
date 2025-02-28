import type { R } from "@/types/common";
import { GET, POST } from "@/lib/axios";
import type { RoOnlyPathParamsType } from "@/lib/axios/utils";
import type { Point } from "../types";
import { POINT_DEDUC, POINTS } from "./path";

export function postRewards({
  pathParams: { socialId }
}: RoOnlyPathParamsType<{ socialId: string }>): R<{ point: number }> {
  return POST({ url: POINT_DEDUC(socialId) });
}

export function getPoint({
  pathParams: { socialId }
}: RoOnlyPathParamsType<{ socialId: string }>): R<Point> {
  return GET({ url: POINTS(socialId) });
}
