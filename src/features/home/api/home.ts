import { GET } from "@/lib/axios";
import { BASE_PATH } from "./paths";

export function getGoals() {
  return GET({ url: BASE_PATH });
}
