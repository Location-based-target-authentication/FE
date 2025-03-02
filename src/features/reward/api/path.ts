import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("points", "v1");

export const POINTS = (userId: string) => generatePathByBase(BASE_PATH, userId);

export const POINT_DEDUC = (userId: string) =>
  generatePathByBase(BASE_PATH, userId, "deduc");
