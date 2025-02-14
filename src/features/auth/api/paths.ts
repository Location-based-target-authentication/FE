import { genreateBasePath } from "@/lib/axios/utils";

export const BASE_PATH = genreateBasePath("auth");
export const LOGIN_PATH = `${BASE_PATH}/login`;
