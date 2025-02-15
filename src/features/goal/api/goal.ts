import { BASE_PATH } from "@/features/goal/api/path";

import { POST } from "@/lib/axios";

export function createGoal() {
  return POST({
    url: `${BASE_PATH}`
  });
}
