import { GET, POST } from "@/lib/axios";
import { GOALS, GOALS_ACHIEVE } from "./paths";

export function getGoals(id: number) {
  return GET({ url: GOALS(id) });
}

export function postGoalsAchieve(id: number) {
  return POST({ url: GOALS_ACHIEVE(id) });
}
