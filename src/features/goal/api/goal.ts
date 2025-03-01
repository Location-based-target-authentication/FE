import { BASE_PATH } from "@/features/goal/api/path";
import { GoalData } from "@/features/goal/types/goal-create";

import type { R } from "@/types/common.ts";
import { GET, POST } from "@/lib/axios";
import type { CompleteGoal, ProgressGoal } from "../types";
import { GOALS_CHECK, GOALS_COMPLETE } from "./path";

export function getGoalsCheck(): R<ProgressGoal[]> {
  return GET({ url: GOALS_CHECK });
}

export function getGoalsComplete(): R<CompleteGoal[]> {
  return GET({ url: GOALS_COMPLETE });
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
