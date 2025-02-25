import { GET } from "@/lib/axios";
import { GOALS_CHECK, GOALS_COMPLETE } from "./path";

export function getGoalsCheck(id) {
  return GET({ url: GOALS_CHECK(id) });
}

export function getGoalsComplete(id) {
  return GET({ url: GOALS_COMPLETE(id) });
}
