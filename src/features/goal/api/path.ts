import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("goals", "v1");

export const GOALS_CHECK = generatePathByBase(BASE_PATH, "check");
export const GOALS_COMPLETE = (userId: string) =>
  generatePathByBase(GOALS_CHECK, "complete", userId);
