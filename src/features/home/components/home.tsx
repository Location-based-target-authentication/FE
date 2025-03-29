import { ProfileHeader } from "@/components/ui/header";

import { useMemo } from "react";

import ActvieAddIcon from "@/asset/common/plus-actvie.svg?react";
import InactiveAddIcon from "@/asset/common/plus-inactive.svg?react";
import { useQuery } from "@tanstack/react-query";
import { map } from "es-toolkit/compat";
import { Link, useNavigate } from "react-router";

import { useUserStore } from "@/stores/user";
import { paths } from "@/config/paths";
import { generate_qo_getGoals } from "@/lib/react-query/queryOptions/home";
import GoalList from "./goal-list";
import { generatDdateText, generateDayText } from "./index.const";

const HomePage = () => {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { data: goals = [] } = useQuery(generate_qo_getGoals(userId));

  const goalCount = useMemo(() => {
    if (goals.length === 0) return 0;

    return goals.length;
  }, [goals]);

  const isGoalLimitReached = useMemo(() => {
    if (goalCount === 0) return false;

    return goalCount === 3;
  }, [goalCount]);

  const targetAddIcon = useMemo(
    () =>
      isGoalLimitReached ? (
        <InactiveAddIcon className="size-12 cursor-not-allowed" />
      ) : (
        <ActvieAddIcon className="size-12 cursor-pointer" />
      ),
    [isGoalLimitReached]
  );

  const transformGoals = useMemo(
    () =>
      map(goals, (item) => {
        const lastRowText =
          item.status === "DRAFT"
            ? "목표등록을 마무리하고 바로 시작해보세요!"
            : `${generatDdateText(item.startDate, item.endDate)} ${generateDayText(item.dayOfWeek)}`;
        const buttonText = `${item.status === "DRAFT" ? "완성하기" : "인증하기"} >`;
        const redirectionCallback = () => {
          const url =
            item.status === "DRAFT"
              ? `${paths.goal.create.getHref()}?goalId=${item.goalId}`
              : paths.map.certification.getHref();

          navigate(url, { state: { goalId: item.goalId, userId } });
        };

        return {
          ...item,
          title: `${item.status === "DRAFT" ? "임시저장" : "진행중"} 목표`,
          name: item.goalName,
          lastRowText,
          buttonText,
          redirectionCallback
        };
      }),
    [goals, navigate, userId]
  );

  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <ProfileHeader popoverContent="목표는 최대 3개까지 생성 가능합니다." />

      <GoalList goalCount={goalCount} transformGoals={transformGoals} />

      <Link
        to={paths.goal.create.getHref()}
        className="absolute bottom-24 right-3"
      >
        {targetAddIcon}
      </Link>
    </div>
  );
};

export default HomePage;
