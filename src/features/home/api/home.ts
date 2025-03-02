import { R } from "@/types/common";
import { GET } from "@/lib/axios";
import { RoOnlyPathParamsType } from "@/lib/axios/utils";
import { Goals } from "../types";
import { HOME_PATH } from "./paths";

export function getGoals({
  pathParams: { userId }
}: RoOnlyPathParamsType<{ userId: number }>): R<Goals[]> {
  return GET({ url: HOME_PATH(userId) });
}
