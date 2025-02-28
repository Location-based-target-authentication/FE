import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("points", "v1");

export const POINTS = (socialId: string) =>
  generatePathByBase(BASE_PATH, socialId);

export const POINT_DEDUC = (socialId: string) =>
  generatePathByBase(BASE_PATH, socialId, "deduc");
