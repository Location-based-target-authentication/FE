import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("goals", "v1");

export const GOALS = (id: number) => generatePathByBase(BASE_PATH, String(id));
export const GOALS_ACHIEVE = (id: number) => {
  return generatePathByBase(GOALS(id), "achieve");
};
