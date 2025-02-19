import { BASE_PATH } from "@/features/goal/api/path";
import { GoalData } from "@/features/goal/types/goal-create";

import { POST } from "@/lib/axios";

export function createGoal(data: GoalData) {
  return POST({
    url: `${BASE_PATH}`,
    data: { data }
  });
}
