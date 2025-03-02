import { BASE_PATH } from "@/features/user/api/paths";

import { DELETE, GET, POST } from "@/lib/axios";

export function getUserInfo({ pathParam }: { pathParam: number }) {
  return GET({
    url: `${BASE_PATH}/${pathParam}/check`
  });
}

export function postLogout({ pathParam }: { pathParam: number }) {
  return POST({
    url: `${BASE_PATH}/${pathParam}/logout`
  });
}

export function deleteUser({ pathParam }: { pathParam: number }) {
  return DELETE({
    url: `${BASE_PATH}/${pathParam}/delete`
  });
}
