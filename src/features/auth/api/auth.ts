import { LOGIN_PATH } from "@/features/auth/api/paths";

import { POST } from "@/lib/axios";

export function kakaoLogin(code: string) {
  return POST({
    url: `${LOGIN_PATH}/kakao`,
    data: { code }
  });
}

export function googleLogin(code: string) {
  return POST({
    url: `${LOGIN_PATH}/google`,
    data: { code }
  });
}

export function refreshAccessToken(refreshToken: string) {
  return POST({
    url: `${LOGIN_PATH}/refreshToken` /** 확인필요  */,
    data: { refreshToken }
  });
}
