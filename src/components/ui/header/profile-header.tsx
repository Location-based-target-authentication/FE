import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

import { useEffect, useMemo, useState } from "react";

import InfoIcon from "@/asset/common/info.svg?react";
import { Link } from "react-router";

import { useUserStore } from "@/stores/user";
import { paths } from "@/config/paths";
import {
  backgroundImages,
  generateIcon,
  generateKeyword,
  generateProgressPercent
} from "./index.const";

function ProfileHeader({ popoverContent }: { popoverContent: string }) {
  const { userName, point } = useUserStore();
  const [bgImage, setBgImage] = useState("");

  const rewarndInfo = useMemo(() => {
    const keyword = generateKeyword(point);

    const Icon = generateIcon(keyword);
    const progressPercent = generateProgressPercent(point);
    const currentPointText = (
      <>
        현재 포인트 <span className="text-green-300">{point}p</span>
      </>
    );
    const generateTagetPointText = () => {
      if (keyword === "coffee") {
        return (
          <>
            커피쿠폰까지 <span className="text-green-300">{5000 - point}p</span>
          </>
        );
      } else if (keyword === "convenienceStore") {
        return (
          <>
            편의점쿠폰까지{" "}
            <span className="text-green-300">{10000 - point}p</span>
          </>
        );
      } else {
        return (
          <Link to={paths.profile.reward.getHref()}>
            <span className="text-green-300">리워드를 수령해주세요.</span>
          </Link>
        );
      }
    };

    return {
      icon: <Icon />,
      progressPercent,
      currentPointText,
      targetPointText: generateTagetPointText()
    };
  }, [point]);

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
            {popoverContent}
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <p className="text-xl">
          <span>안녕하세요!</span>
          <span className="font-bold text-green-300">{` ${userName}`}</span>님
        </p>
        <p className="text-sm">오늘도 일단 가볼까요?</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end">{rewarndInfo.icon}</div>
        <Progress
          value={rewarndInfo.progressPercent}
          className="h-3"
          indicatorColor="bg-green-500"
        />
        <div className="flex justify-between text-sm">
          <span className="text-[10px] text-gray-400">
            {rewarndInfo.currentPointText}
          </span>
          <span className="text-[10px] text-gray-400">
            {rewarndInfo.targetPointText}
          </span>
        </div>
      </div>
    </div>
  );
}

export { ProfileHeader };
