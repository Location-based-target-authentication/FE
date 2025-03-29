import React, { useMemo } from "react";

import { deleteUser } from "@/features/user/api/user";
import { SocialType, UserInfo } from "@/features/user/types/user-info";
import { useLocation, useNavigate } from "react-router";

import { paths } from "@/config/paths";

const KakaoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" rx="8" fill="#FEE500" />
    <path
      d="M8 3C5.23858 3 3 4.79086 3 7C3 8.33696 3.87197 9.50368 5.16667 10.1667L4.5 12.5L7 10.8333C7.32586 10.8884 7.66045 10.9167 8 10.9167C10.7614 10.9167 13 9.12582 13 7C13 4.87418 10.7614 3 8 3Z"
      fill="black"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M24 9.5c3.54 0 6.61 1.21 9.1 3.2l6.8-6.8C34.7 2 29.7 0 24 0 14.9 0 6.9 5.5 2.6 13.5l7.9 6.1c2.1-6.3 8-10.1 13.5-10.1z"
    />
    <path
      fill="#34A853"
      d="M46.5 24.5c0-1.5-.1-3-.4-4.5H24v9h12.8c-.6 2.9-2.4 5.3-5 7l7.9 6.1c4.6-4.3 7.8-10.6 7.8-17.6z"
    />
    <path
      fill="#FBBC05"
      d="M10.5 28.4c-1-2.9-1-6 0-8.8L2.6 13.5c-2.4 4.6-2.4 10.1 0 14.7l7.9-6z"
    />
    <path
      fill="#EA4335"
      d="M24 48c6.5 0 12.1-2.1 16.5-5.7l-7.9-6.1c-2.2 1.5-5 2.4-8.6 2.4-5.5 0-11.4-3.7-13.5-10.1l-7.9 6.1C6.9 42.5 14.9 48 24 48z"
    />
  </svg>
);

const AccountPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location.state as UserInfo & { userId: number };

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      await deleteUser({ pathParam: userInfo.userId });

      alert("계정이 삭제되었습니다."); //확인 필요

      navigate(paths.home.path);
    } catch (error) {
      console.error("계정 삭제 오류:", error);
      alert("계정 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const phoneNumber = useMemo(() => {
    if (!userInfo?.phoneNumber) return "";

    return `010${userInfo.phoneNumber}`
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/-{1,2}$/g, "");
  }, [userInfo]);

  return (
    <div className="h-[812px] w-[375px]">
      <div className="h-[90px] w-[375px] border-b border-[#E0E0E0] px-[20px] pt-[20px]">
        <div className="h-[18px] w-[41px]">
          <p className="text-[16px] font-medium leading-[18px] -tracking-wide text-black">
            이메일
          </p>
        </div>

        <div className="mt-[16px] flex items-center space-x-[6px]">
          <div className="size-4">
            {userInfo?.socialType === SocialType.KAKAO ? (
              <KakaoIcon />
            ) : (
              <GoogleIcon />
            )}
          </div>
          <p className="h-[14px] w-[143px] text-[14px] font-normal leading-[16px] -tracking-wide text-black">
            {userInfo?.email}
          </p>
        </div>
      </div>

      <div className="h-[90px] w-[375px] border-b border-[#E0E0E0] px-[20px] pt-[20px]">
        <div className="h-[18px] w-[72px]">
          <p className="text-[16px] font-medium leading-[18px] -tracking-wide text-black">
            휴대폰 번호
          </p>
          <p className="mt-[16px] h-[14px] w-[87px] whitespace-nowrap text-[14px] font-normal leading-[16px] -tracking-wide text-black">
            {phoneNumber}
          </p>
        </div>
      </div>

      <button
        onClick={handleDeleteAccount}
        className="absolute bottom-[74px] left-1/2 h-[16px] w-[51px] -translate-x-1/2 text-center text-[14px] font-medium leading-[16px] -tracking-wide text-gray-400 underline"
      >
        계정 삭제
      </button>
    </div>
  );
};

export default AccountPage;
