import { BASE_PATH } from "@/features/auth/api/paths";

import { GET, POST } from "@/lib/axios";

export function getUserInfo({ pathParam }: { pathParam: number }) {
  return GET({
    url: `${BASE_PATH}?userId=${pathParam}`
  });
}

export function logout({ pathParam }: { pathParam: number }) {
  return POST({
    url: `${BASE_PATH}/${pathParam}/logout`
  });
}
