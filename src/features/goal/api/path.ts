import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("goals", "v1");

export const GOALS_CHECK = (id) => generatePathByBase(BASE_PATH, "check", id);
export const GOALS_COMPLETE = (id) =>
  generatePathByBase(BASE_PATH, "complete", id);
