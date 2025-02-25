import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { join, map } from "es-toolkit/compat";

import { generate_qo_getGoalsComplete } from "@/lib/react-query/queryOptions/goals";
import { generateDateString } from "./index.const";

function CompleteGoal() {
  const { data: completedGoals = [] } = useQuery(
    generate_qo_getGoalsComplete()
  );

  const transformedCompletedGoals = useMemo(
    () =>
      map(completedGoals, (goal) => {
        const dateString = `${generateDateString(goal.startDate)} ~ ${generateDateString(goal.endDate)}`;
        const days = goal.days.length === 7 ? "매일" : join(goal.days, ",");
        const achivePercentString = `${goal.achivePercent}% 달성`;

        return { ...goal, dateString, days, achivePercentString };
      }),
    [completedGoals]
  );

  return (
    <>
      {transformedCompletedGoals.length > 0 ? (
        transformedCompletedGoals.map(
          ({ id, name, achivePercentString, dateString, days }) => (
            <div
              key={id}
              className="mb-2 flex flex-col gap-3 rounded-lg border p-4"
            >
              <span className="text-[13px] text-green-500">
                {achivePercentString}
              </span>
              <h3>{name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{dateString}</span>
                <span className="text-xs text-gray-500">{days}</span>
              </div>
            </div>
          )
        )
      ) : (
        <p className="mt-8 text-center text-gray-400">목표를 완료해보세요!</p>
      )}
    </>
  );
}

export default CompleteGoal;
