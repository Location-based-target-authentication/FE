import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { join, map, slice } from "es-toolkit/compat";

import { generate_qo_getGoalsCheck } from "@/lib/react-query/queryOptions/goals";
import {
  DATEITEM_BASIC_CLASS_NAME,
  generateCertificationItem,
  generateDateString,
  generateNonCertificationItem,
  generateTodyString
} from "./index.const";

function ProgressGoal() {
  const todayString = generateTodyString();

  const { data: progressGoals = [] } = useQuery(generate_qo_getGoalsCheck());

  const certificationInfoMaps = useMemo(() => {
    const generateMap = (certificationInfo) => {
      return new Map(
        map(certificationInfo, ({ date, isCertification }) => [
          date,
          isCertification
        ])
      );
    };

    return map(progressGoals, ({ certificationInfo }) =>
      generateMap(certificationInfo)
    );
  }, [progressGoals]);

  const transformedProgressGoals = useMemo(
    () =>
      map(progressGoals, (goal, index) => {
        const transFormViewDays = map(goal.viewDays, (viewDay) => {
          const isCertificationInfo = certificationInfoMaps[index].has(viewDay);

          if (!isCertificationInfo) {
            return {
              className: `${DATEITEM_BASIC_CLASS_NAME} bg-gray-400`,
              key: viewDay
            };
          }

          const certificationStatus = certificationInfoMaps[index].get(viewDay);
          const day = viewDay.split("-")[2];
          const isToday = viewDay === todayString;

          return certificationStatus
            ? generateCertificationItem({ viewDay, day })
            : generateNonCertificationItem({ viewDay, day, isToday });
        });
        const dateString = `${generateDateString(goal.startDate)} ~ ${generateDateString(goal.endDate)}`;
        const days = goal.days.length === 7 ? "매일" : join(goal.days, ",");
        const lastWeekDate = slice(transFormViewDays, 0, 7);
        const thiwWeekDate = slice(transFormViewDays, -7);

        return {
          ...goal,
          dateString,
          days,
          allDays: [lastWeekDate, thiwWeekDate]
        };
      }),

    [progressGoals, certificationInfoMaps, todayString]
  );

  return transformedProgressGoals.length > 0 ? (
    transformedProgressGoals.map(
      ({ id, name, dateString, days, goalDaycnt, allDays }, idx) => (
        <div
          key={id}
          className="mb-2 flex flex-col gap-2 rounded-lg border p-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-[13px]">{`목표${idx + 1}`}</span>
            <h3 className="font-semibold text-green-500">{name}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{dateString}</span>
            <span className="text-xs text-green-500">{goalDaycnt}일</span>
            <span className="text-xs text-gray-500">{days}</span>
          </div>

          <div>
            <hr />
            {map(allDays, (days) => (
              <div
                className="mt-2 flex items-center justify-between gap-1"
                key={days[0].key}
              >
                {map(days, ({ key, className, day }) => (
                  <span key={key} className={`${className}`}>
                    {day}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )
    )
  ) : (
    <p className="mt-8 text-center text-gray-400">목표를 추가해보세요!</p>
  );
}

export default ProgressGoal;
