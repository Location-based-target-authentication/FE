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
    if (!userId) return;

    const fetchUserInfo = async (): Promise<void> => {
      try {
        const response = await getUserInfo(userId);
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
      await logout(userId);
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
    navigate(paths.user.myPage.path, { state: userInfo });
  };

  return (
    <div className="mx-auto max-w-md p-5">
      <h2 className="mb-5 text-2xl font-bold">내 정보</h2>

      <div className="rounded-lg bg-gray-100 p-5 text-center shadow-md">
        {userInfo ? (
          <>
            <p className="text-lg font-semibold">
              안녕하세요! <span className="text-blue-500">{userInfo.name}</span>{" "}
              님
            </p>
            <p className="mt-1 text-sm text-gray-600">오늘도 일단 가볼까요?</p>

            <div className="mt-4 space-y-2">
              <div className="rounded-lg bg-gray-200 p-3">
                <span>현재 포인트: {userInfo.points}p</span>
              </div>
              <div className="rounded-lg bg-gray-300 p-3">
                <span>커피 쿠폰까지 {500 - userInfo.points}p 남음</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500">정보를 불러오는 중...</p>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <button
          onClick={handleClickAccount}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-left hover:bg-gray-100"
        >
          계정 관리
        </button>
        <button className="w-full rounded-lg border border-gray-300 bg-white p-3 text-left hover:bg-gray-100">
          포인트 내역
        </button>
        <button className="w-full rounded-lg border border-gray-300 bg-white p-3 text-left hover:bg-gray-100">
          리워드 신청
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full rounded-lg bg-red-500 p-3 text-white hover:bg-red-600"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
