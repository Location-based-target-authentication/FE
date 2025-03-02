import { ProfileHeader } from "@/components/ui/header";

import React, { useEffect, useState } from "react";

import { getUserInfo, postLogout } from "@/features/user/api/user";
import { UserInfo } from "@/features/user/types/user-info";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

const MyPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const userId: number | null = useAuthStore((state) => state.userId);
  const { logout } = useAuthStore();
  useEffect(() => {
    if (!userId) return;

    const fetchUserInfo = async (): Promise<void> => {
      try {
        const response = await getUserInfo({ pathParam: userId });

        setUserInfo(response);
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleLogout = async (): Promise<void> => {
    if (!userId) return;

    try {
      await postLogout({ pathParam: userId });
      logout();
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
    console.log(userInfo, "userinfo");
    navigate(paths.user.account.path, { state: { ...userInfo, userId } });
  };

  const navigateReward = () => navigate(paths.profile.reward.path);

  return (
    <div>
      <ProfileHeader />

      <div className="flex w-[375px] flex-col">
        <button
          onClick={handleClickAccount}
          className="mt-[21px] flex h-[56px] w-[375px] items-center justify-between border-b border-gray-200 px-[20px] hover:bg-gray-100"
        >
          <span className="text-[16px] font-medium text-black">계정관리</span>
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
        <button
          className="flex h-[56px] w-[375px] items-center justify-between border-b border-gray-200 px-[20px] hover:bg-gray-100"
          onClick={navigateReward}
        >
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
  );
};

export default MyPage;
