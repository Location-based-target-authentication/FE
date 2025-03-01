import type { R } from "@/types/common.ts";
import { GET } from "@/lib/axios";
import { RoOnlyDataType, RoOnlyPathParamsType } from "@/lib/axios/utils";
import type { CompleteGoal, ProgressGoal } from "../types";
import { GOALS_CHECK, GOALS_COMPLETE } from "./path";

export function getGoalsCheck({
  data
}: RoOnlyDataType<{ userId: number }>): R<ProgressGoal[]> {
  return GET({ url: GOALS_CHECK, data });
}

export function getGoalsComplete({
  pathParams: { userId }
}: RoOnlyPathParamsType<{ userId: number }>): R<CompleteGoal[]> {
  return GET({ url: GOALS_COMPLETE(userId) });
}
