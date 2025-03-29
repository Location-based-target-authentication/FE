import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("points", "v1");

export const POINTS = (userId: number) =>
  generatePathByBase(BASE_PATH, String(userId));

export const POINT_DEDUC = (userId: number) =>
  generatePathByBase(BASE_PATH, String(userId), "deduct");
