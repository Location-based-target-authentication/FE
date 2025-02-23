import React from "react";

import { SocialType, UserInfo } from "@/features/user/types/user-info";
import { useLocation, useNavigate } from "react-router";

const KakaoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" fill="url(#pattern0_554_6072)" />
    <defs>
      <pattern
        id="pattern0_554_6072"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <image
          width="586"
          height="586"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkoAAAJKCAYAAADTI2qZAAAAAXNSR0ICQMB9xQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29..."
        />
      </pattern>
    </defs>
  </svg>
);

const GoogleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M23.76 20.35v7.21h12.1c-.56 3.28-3.5 9.6-12.1 9.6-7.31 0-13.26-6.07-13.26-13.55S16.45 10.1 23.76 10.1c4.1 0 6.86 1.66 8.44 3.05l5.86-5.69C34.17 3.98 29.61 2 23.76 2 11.3 2 2 11.17 2 24s9.3 22 21.76 22c11.73 0 19.5-8.3 19.5-19.94 0-1.33-.15-2.33-.34-3.3H23.76Z"
    />
  </svg>
);

const AccountPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location.state as UserInfo;

  return (
    <div className="mx-auto max-w-md p-5">
      {/* 헤더 (뒤로가기 + 제목) */}
      <div className="mb-5 flex items-center space-x-4">
        <button onClick={() => navigate(-1)}></button>
        <h2 className="text-2xl font-bold">계정 관리</h2>
      </div>

      {userInfo ? (
        <div className="space-y-5">
          {/* 이메일 + 로그인 방식 */}
          <div className="rounded-lg bg-gray-100 p-5 shadow-md">
            <p className="text-sm text-gray-500">이메일</p>
            <div className="flex items-center space-x-2">
              {userInfo.socialType === SocialType.KAKAO ? (
                <KakaoIcon />
              ) : (
                <GoogleIcon />
              )}
              <p className="text-lg font-semibold">{userInfo?.email}</p>
            </div>
          </div>

          {/* 휴대폰 번호 */}
          <div className="rounded-lg bg-gray-100 p-5 shadow-md">
            <p className="text-sm text-gray-500">휴대폰 번호</p>
            <p className="text-lg">{userInfo.phone}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">사용자 정보를 불러올 수 없습니다.</p>
      )}

      {/* 계정 삭제 */}
      <button className="mt-10 text-sm text-gray-500 hover:text-red-500">
        계정 삭제
      </button>
    </div>
  );
};

export default AccountPage;
