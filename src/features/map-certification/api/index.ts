import type { R } from "@/types/common";
import { GET, POST } from "@/lib/axios";
import type { RoOnlyPathParamsType } from "@/lib/axios/utils";
import type { Goals } from "../types";
import { GOALS, GOALS_ACHIEVE } from "./paths";

export function getGoals({
  pathParams: { id }
}: RoOnlyPathParamsType<{ id: number }>): R<Goals> {
  return GET({ url: GOALS(id) });
}

export function postGoalsAchieve({
  pathParams: { id }
}: RoOnlyPathParamsType<{ id: number }>): R<{ point: number }> {
  return POST({ url: GOALS_ACHIEVE(id) });
}
