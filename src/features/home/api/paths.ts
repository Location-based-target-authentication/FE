import { generatePathByBase, genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("goals", "v1");

export const HOME_PATH = (userId: number) =>
  generatePathByBase(BASE_PATH, String(userId));
