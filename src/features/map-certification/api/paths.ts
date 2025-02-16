import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("goals", "v1");

export const GOALS = (id) => generatePathByBase(BASE_PATH, id);
export const GOALS_ACHIEVE = (id) => generatePathByBase(GOALS(id), "achieve");
