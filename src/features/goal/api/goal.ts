import type { R } from "@/types/common.ts";
import { GET } from "@/lib/axios";
import type { CompleteGoal, ProgressGoal } from "../types";
import { GOALS_CHECK, GOALS_COMPLETE } from "./path";

export function getGoalsCheck(): R<ProgressGoal[]> {
  return GET({ url: GOALS_CHECK });
}

export function getGoalsComplete(): R<CompleteGoal[]> {
  return GET({ url: GOALS_COMPLETE });
}
