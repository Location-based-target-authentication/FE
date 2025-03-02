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

export function postPhoneNumber({ data }: { data: { phoneNumber: string } }) {
  return POST({ url: `${BASE_PATH}/user/phone`, data });
}

export function postTermsAgree(pathParam: { userId: number }) {
  return POST({ url: `/api/v1/terms/agree/${pathParam.userId}` });
}
