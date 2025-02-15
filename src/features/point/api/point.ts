import { BASE_PATH } from "@/features/point/\bapi/path";

import { GET } from "@/lib/axios";

export function getPoint(userId: string) {
  GET({ url: `${BASE_PATH}?${userId}` });
}
