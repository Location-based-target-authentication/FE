import type { R } from "@/types/common";
import { GET, POST } from "@/lib/axios";
import type {
  RoDataAndPathParamsType,
  RoOnlyPathParamsType
} from "@/lib/axios/utils";
import type { GoalDetail } from "../types";
import { GOALS_ACHIEVE, GOALS_DETAIL } from "./paths";

export function getGoals({
  pathParams: { goalId }
}: RoOnlyPathParamsType<{ goalId: number }>): R<GoalDetail> {
  return GET({ url: GOALS_DETAIL(goalId) });
}

export function postGoalsAchieve({
  pathParams: { goalId },
  data
}: RoDataAndPathParamsType<
  { userId: number; latitude: number; longitude: number },
  { goalId: number }
>): R<{ point: number }> {
  return POST({ url: GOALS_ACHIEVE(goalId), data });
}
