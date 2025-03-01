import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("goals", "v1");

export const GOALS_CHECK = generatePathByBase(BASE_PATH, "check");

export const GOALS_DETAIL = (goalId: number) =>
  generatePathByBase(GOALS_CHECK, String(goalId));

export const GOALS_ACHIEVE = (goalId: number) => {
  return generatePathByBase(BASE_PATH, String(goalId), "achieve");
};
