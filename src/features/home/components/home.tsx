import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

import { useEffect, useMemo, useState } from "react";

import CoffeIcon from "@/asset/common/coffee.svg?react";
import Coupon from "@/asset/common/coupon.svg?react";
import InfoIcon from "@/asset/common/info.svg?react";
import ActvieAddIcon from "@/asset/common/plus-actvie.svg?react";
import InactiveAddIcon from "@/asset/common/plus-inactive.svg?react";
import homeBackGroundFirst from "@/asset/home/home-background-first.png?url";
import homeBackGroundSecond from "@/asset/home/home-background-second.png?url";
import homeBackGroundThird from "@/asset/home/home-background-third.png?url";
import { useQuery } from "@tanstack/react-query";
import { join, map, replace } from "es-toolkit/compat";

import { generate_qo_getGoals } from "@/lib/react-query/queryOptions/home";
import { DAYS_STRING_MAP } from "./index.const";

const backgroundImages = [
  homeBackGroundFirst,
  homeBackGroundSecond,
  homeBackGroundThird
];

const generateKeyword = (point) => {
  if (point <= 500) return "coffee";
  else if (point > 500) return "convenienceStore";
  else return "reward";
};

const generateIcon = (keyword) => {
  if (keyword === "coffee") return <CoffeIcon />;
  else if (keyword === "convenienceStore") return <Coupon />;
  else return <Coupon />;
};

const generateProgressPercent = (point) => {
  if (point <= 500) return (point / 500) * 100;
  else if (point > 500) return (point / 1000) * 100;
  else return 100;
};

const fakePoint1 = 550;
// const fakePoint1 = 550;
// const fakePoint3 = 1040;

const HeaderCard = ({ points, requiredPoints }) => {
  const [bgImage, setBgImage] = useState("");

  const rewarndInfo = useMemo(() => {
    const keyword = generateKeyword(fakePoint1);

    return {
      icon: generateIcon(keyword),
      progressPercent: generateProgressPercent(fakePoint1)
    };
  }, []);

  useEffect(() => {
    const randomBg =
      backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBgImage(randomBg);
  }, []);

  return (
    <div
      className="relative flex h-56 w-full flex-col justify-between bg-cover bg-center p-4 text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-green-500">WillGO</h1>
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="cursor-pointer text-white" />
          </PopoverTrigger>

          <PopoverContent
            side="left"
            className="w-50 p-2 text-xs text-green-500"
          >
            목표는 최대 3개까지 생성 가능합니다.
          </PopoverContent>
        </Popover>
      </div>

      {/* 유저 정보 */}
      <div>
        <p className="text-xl">
          안녕하세요! <span className="font-bold text-green-300">홍길동</span>님
        </p>
        <p className="text-sm">오늘도 일단 가볼까요?</p>
      </div>

      {/* 포인트 정보 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end">{rewarndInfo.icon}</div>
        <Progress
          value={rewarndInfo.progressPercent}
          className="h-3"
          indicatorColor="bg-green-500"
        />
        <div className="flex justify-between text-sm">
          <span className="text-[10px] text-gray-400">
            현재 포인트 <span className="text-green-300">{fakePoint1}p</span>
          </span>
          <span className="text-[10px] text-gray-400">
            커피쿠폰까지 <span className="text-green-300">{fakePoint1}p</span>
          </span>
          {/* <span>{rewarndInfo.text}</span> */}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { data: goals } = useQuery(generate_qo_getGoals());

  const isGoalCount = useMemo(() => {
    if (!goals) return 0;

    return goals.length;
  }, [goals]);

  const targetAddIcon = useMemo(
    () =>
      isGoalCount === 3 ? (
        <InactiveAddIcon className="size-12 cursor-not-allowed" />
      ) : (
        <ActvieAddIcon className="size-12 cursor-pointer" />
      ),
    [isGoalCount]
  );

  const generatDdateText = (startDate, endDate) => {
    const replacedStartDate = replace(startDate, /-/g, ". ");
    const replacedEndDate = replace(endDate, /-/g, ". ");

    return `${replacedStartDate} ~ ${replacedEndDate}`;
  };

  const generateDayText = (days) => {
    const transformDays = map(days, (day) => DAYS_STRING_MAP.get(day));
    const day = days.length === 7 ? "매일" : join(transformDays, ", ");

    return day;
  };

  const transformGoals = useMemo(
    () =>
      map(goals, (item) => {
        const lastRowText = item.isTemporarySaved
          ? "목표등록을 마무리하고 바로 시작해보세요!"
          : `${generatDdateText(item.startDate, item.endDate)} ${generateDayText(item.days)}`;

        return {
          ...item,
          title: `${item.isTemporarySaved ? "임시저장" : "진행중"} 목표`,
          name: item.name,
          lastRowText
        };
      }),
    [goals]
  );

  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      {/* 공통 컴포넌트 (헤더) */}
      <HeaderCard points={2000} requiredPoints={500} />

      {/* 목표 리스트 */}
      <div className="p-4">
        {isGoalCount === 0 ? (
          <div className="flex h-56 w-full flex-col items-center justify-center">
            <p className="text-gray-400">목표를 추가해보세요!</p>
          </div>
        ) : (
          <>
            {map(
              transformGoals,
              ({
                id,
                title,
                name,
                lastRowText,
                isAchieved,
                isTemporarySaved
              }) => (
                <div
                  key={id}
                  className={`mb-4 rounded-2xl bg-white p-4 shadow-md ${isTemporarySaved ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-semibold text-green-500">
                        {title}
                      </p>
                      <p>{name}</p>
                      <p className="text-xs text-gray-500">{lastRowText}</p>
                    </div>
                    <button
                      disabled={isAchieved}
                      className={`${isAchieved ? "cursor-not-allowed text-gray-500" : "cursor-pointer text-green-500"} text-xs`}
                    >
                      {isTemporarySaved ? "완성하기" : "인증하기"} {">"}
                    </button>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>

      <div
        className="absolute bottom-20 right-3"
        onClick={() => isGoalCount !== 3 && console.log("hi")}
      >
        {targetAddIcon}
      </div>
    </div>
  );
};

export default HomePage;
