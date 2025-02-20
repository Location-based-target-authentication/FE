import { BASE_PATH } from "@/features/auth/api/paths";

import { POST } from "@/lib/axios";

export function kakaoLogin(code: string) {
  return POST({
    url: `${BASE_PATH}/kakao/login`,
    data: { code }
  });
}

export function googleLogin(code: string) {
  return POST({
    url: `${BASE_PATH}/google/login`,
    data: { code }
  });
}

export function refreshAccessToken(refreshToken: string) {
  return POST({
    url: `${BASE_PATH}/refresh`,
    data: { refreshToken }
  });
}
