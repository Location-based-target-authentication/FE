import { ProfileHeader } from "@/components/ui/header";

import { useMemo } from "react";

import ActvieAddIcon from "@/asset/common/plus-actvie.svg?react";
import InactiveAddIcon from "@/asset/common/plus-inactive.svg?react";
import { useQuery } from "@tanstack/react-query";
import { map } from "es-toolkit/compat";

import { generate_qo_getGoals } from "@/lib/react-query/queryOptions/home";
import GoalList from "./goal-list";
import { generatDdateText, generateDayText } from "./index.const";

const HomePage = () => {
  const { data: goals } = useQuery({
    ...generate_qo_getGoals(),
    initialData: []
  });

  const goalCount = useMemo(() => {
    if (!goals) return 0;

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
        const lastRowText = item.isTemporarySaved
          ? "목표등록을 마무리하고 바로 시작해보세요!"
          : `${generatDdateText(item.startDate, item.endDate)} ${generateDayText(item.days)}`;
        const redirectionText = `${item.isTemporarySaved ? "완성하기" : "인증하기"} >`;

        return {
          ...item,
          title: `${item.isTemporarySaved ? "임시저장" : "진행중"} 목표`,
          name: item.name,
          lastRowText,
          redirectionText
        };
      }),
    [goals]
  );

  const navigateToGoalAdd = () => {
    if (isGoalLimitReached) return;

    /** @todo 목표 추가 페이지로 리다이렉션 */
    // navigate("/goal-add");
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <ProfileHeader />

      <GoalList goalCount={goalCount} transformGoals={transformGoals} />

      <div className="absolute bottom-20 right-3" onClick={navigateToGoalAdd}>
        {targetAddIcon}
      </div>
    </div>
  );
};

export default HomePage;
