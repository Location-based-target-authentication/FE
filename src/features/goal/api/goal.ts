import { BASE_PATH } from "@/features/goal/api/path";
import { GoalData } from "@/features/goal/types/goal-create";

import type { R } from "@/types/common.ts";
import { GET, POST } from "@/lib/axios";
import { RoOnlyDataType, RoOnlyPathParamsType } from "@/lib/axios/utils";
import type { CompleteGoal, ProgressGoal } from "../types";
import { GOALS_CHECK, GOALS_COMPLETE } from "./path";

export function getGoalsCheck({
  data
}: RoOnlyDataType<{ userId: string }>): R<ProgressGoal[]> {
  return GET({ url: GOALS_CHECK, data });
}

export function getGoalsComplete({
  pathParams: { userId }
}: RoOnlyPathParamsType<{ userId: string }>): R<CompleteGoal[]> {
  return GET({ url: GOALS_COMPLETE(userId) });
}

export function postCreateGoal({ data }: { data: GoalData }) {
  return POST({
    url: `${BASE_PATH}`,
    data
  });
}

export function postCreateTempSaveGoal({ data }: { data: GoalData }) {
  return POST({
    url: `${BASE_PATH}`,
    data
  });
}

export function getTempGoal(pathParam: { goalId: number }) {
  return GET({
    url: `${BASE_PATH}/check/${pathParam.goalId}`
  });
}
