import { GET } from "@/lib/axios";
import { GOALS_CHECK, GOALS_COMPLETE } from "./path";

export function getGoalsCheck() {
  return GET({ url: GOALS_CHECK });
}

export function getGoalsComplete() {
  return GET({ url: GOALS_COMPLETE });
}
