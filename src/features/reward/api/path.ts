import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("points", "v1");

export const POINT_DEDUC = (socialId) =>
  generatePathByBase(BASE_PATH, socialId, "deduc");
