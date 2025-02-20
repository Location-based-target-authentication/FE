import { BASE_PATH } from "@/features/goal/api/path";
import { GoalData } from "@/features/goal/types/goal-create";

import { GET, POST } from "@/lib/axios";

export function createGoal(data: GoalData) {
  return POST({
    url: `${BASE_PATH}`,
    data: { data }
  });
}

export function createTempSaveGoal(data: GoalData) {
  return POST({
    url: `${BASE_PATH}`,
    data: { data }
  });
}

export function getTempGoal(goalId: number) {
  return GET({
    url: `${BASE_PATH}/check/${goalId}`
  });
}
