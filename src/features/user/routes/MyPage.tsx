import React, { useEffect, useState } from "react";

import { getUserInfo, logout } from "@/features/user/api/user";
import { UserInfo } from "@/features/user/types/user-info";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const userId: number | null = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUserInfo = async (): Promise<void> => {
      try {
        const response = await getUserInfo({ pathParam: userId });
        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleLogout = async (): Promise<void> => {
    if (!userId) return;

    try {
      await logout({ pathParam: userId });
      navigate(paths.home.path);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleClickAccount = () => {
    if (!userInfo) {
      console.error("사용자 정보가 없습니다.");
      return;
    }
    navigate(paths.user.account.path, { state: { ...userInfo, userId } });
  };

  return (
    <div>
      <div className="mx-auto flex min-h-screen w-[375px] flex-col bg-white">
        <div className="h-[255px] w-[375px] bg-gray-300 bg-cover bg-center">
          <div className="mt-[44px] flex h-[56px] w-[375px] items-center justify-center text-center">
            <span className="font-pretendard h-[20px] w-[315px] text-[18px] font-semibold leading-[20px] tracking-[-2.5%] text-white">
              내정보
            </span>
          </div>

          <div className="mt-[20px] flex w-[375px] justify-start pl-[20px]">
            <div className="h-[46px] w-[153px] text-white">
              <p className="text-[18px] font-semibold leading-[22px]">
                안녕하세요!{" "}
                <span className="text-green-400">
                  {userInfo ? userInfo?.name : "홍길동"}
                </span>
                님
              </p>
              <p className="mt-[4px] text-[16px] leading-[20px]">
                오늘도 일단 가볼까요?
              </p>
            </div>
          </div>
          <div className="ml-[20px] mt-[29px] h-[16px] w-[335px] overflow-hidden rounded-full bg-[#D8F3DF]">
            <div
              className="h-full bg-[#3CC360] transition-all"
              style={{
                width: `${userInfo ? (userInfo.points / 5000) * 100 : 40}%`
              }}
            ></div>
          </div>
          <div className="ml-[20px] mt-[10px] flex w-[335px] justify-between">
            <p className="font-pretendard text-[12px] font-medium leading-[14px] tracking-[-2.5%] text-white">
              현재 포인트:{" "}
              <span className="text-[#B1E7BF]">
                {userInfo ? userInfo.points : 3000}p
              </span>
            </p>
            <p className="font-pretendard text-[12px] font-medium leading-[14px] tracking-[-2.5%] text-white">
              커피 쿠폰까지{" "}
              <span className="text-[#B1E7BF]">
                {userInfo ? 5000 - userInfo.points : 500}p
              </span>
            </p>
          </div>

          <div className="flex w-[375px] flex-col">
            <button
              onClick={handleClickAccount}
              className="mt-[21px] flex h-[56px] w-[375px] items-center justify-between border-b border-gray-200 px-[20px] hover:bg-gray-100"
            >
              <span className="text-[16px] font-medium text-black">
                계정관리
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.42798 6.85645L14.5708 11.9993L9.42798 17.1422"
                  stroke="#1A1A1A"
                  strokeWidth="1.71429"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="flex h-[56px] w-[375px] items-center justify-between border-b border-gray-200 px-[20px] hover:bg-gray-100">
              <span className="text-[16px] font-medium text-black">
                포인트 내역
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.42798 6.85645L14.5708 11.9993L9.42798 17.1422"
                  stroke="#1A1A1A"
                  strokeWidth="1.71429"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="flex h-[56px] w-[375px] items-center justify-between border-b border-gray-200 px-[20px] hover:bg-gray-100">
              <span className="text-[16px] font-medium text-black">
                리워드 신청
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.42798 6.85645L14.5708 11.9993L9.42798 17.1422"
                  stroke="#1A1A1A"
                  strokeWidth="1.71429"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="absolute top-[456px] flex w-[375px] justify-center">
            <button
              onClick={handleLogout}
              className="h-[48px] w-[335px] rounded-lg border border-green-500 text-[16px] font-medium text-green-500 hover:bg-green-100"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
