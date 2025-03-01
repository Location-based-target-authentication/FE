import { R } from "@/types/common";
import { GET } from "@/lib/axios";
import { Goals } from "../types";
import { BASE_PATH } from "./paths";

export function getGoals(): R<Goals[]> {
  return GET({ url: BASE_PATH });
}
