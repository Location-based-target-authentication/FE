import { BASE_PATH } from "@/features/auth/api/paths";

import { POST } from "@/lib/axios";

export function postKakaoLogin({ data }: { data: { code: string } }) {
  return POST({ url: `${BASE_PATH}/kakao/login`, data });
}

export function postGoogleLogin({ data }: { data: { code: string } }) {
  return POST({ url: `${BASE_PATH}/google/login`, data });
}

export function postRefreshAccessToken({
  data
}: {
  data: { refreshToken: string };
}) {
  return POST({ url: `${BASE_PATH}/refresh`, data });
}
