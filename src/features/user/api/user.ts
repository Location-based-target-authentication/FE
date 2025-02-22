import { BASE_PATH } from "@/features/auth/api/paths";

import { GET, POST } from "@/lib/axios";

export function getUserInfo(userId: number) {
  return GET({
    url: `${BASE_PATH}?userId=${userId}`
  });
}

export function logout(userId: number) {
  return POST({
    url: `${BASE_PATH}/${userId}/logout`,
    data: {}
  });
}
