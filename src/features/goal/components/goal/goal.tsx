import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { join, map } from "es-toolkit/compat";

import {
  generate_qo_getGoalsCheck,
  generate_qo_getGoalsComplete
} from "@/lib/react-query/queryOptions/goals";

export default function GoalPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const { data: progressGoals = [] } = useQuery(generate_qo_getGoalsCheck());
  const { data: completedGoals = [] } = useQuery(
    generate_qo_getGoalsComplete()
  );

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

  const todayString = useMemo(() => {
    const today = new Date();

    return today.toISOString().split("T")[0];
  }, []);

  const generateDateString = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString("ko-KR", {
      month: "long",
      day: "numeric"
    });

    return formattedDate;
  };

  const transformedProgressGoals = useMemo(
    () =>
      map(progressGoals, (goal, index) => {
        const transFormViewDays = map(goal.viewDays, (viewDay) => {
          const isCertificationInfo = certificationInfoMaps[index].has(viewDay);

          if (!isCertificationInfo)
            return { backgroundColor: "bg-gray-400", key: viewDay };

          const certificationStatus = certificationInfoMaps[index].get(viewDay);
          const day = viewDay.split("-")[2];
          const isToday = viewDay === todayString;
          return certificationStatus
            ? {
                backgroundColor: "bg-green-500",
                textColor: "text-white",
                day,
                key: viewDay
              }
            : {
                backgroundColor: isToday ? "bg-green-100" : "bg-gray-100",
                textColor: isToday ? "text-green-500" : "text-gray-400",
                day,
                key: viewDay
              };
        });

        const dateString = `${generateDateString(goal.startDate)} ~ ${generateDateString(goal.endDate)}`;
        const days = goal.days.length === 7 ? "매일" : join(goal.days, ",");

        return { ...goal, transFormViewDays, dateString, days };
      }),

    [progressGoals, certificationInfoMaps, todayString]
  );

  const transformedCompletedGoals = useMemo(
    () =>
      map(completedGoals, (goal) => {
        const dateString = `${generateDateString(goal.startDate)} ~ ${generateDateString(goal.endDate)}`;
        const days = goal.days.length === 7 ? "매일" : join(goal.days, ",");
        return { ...goal, dateString, days };
      }),
    [completedGoals]
  );

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="flex border-b">
        <button
          className={`flex-1 p-2 text-center ${
            activeTab === "ongoing"
              ? "border-b-2 border-black font-bold"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          진행중인 목표
        </button>
        <button
          className={`flex-1 p-2 text-center ${
            activeTab === "completed"
              ? "border-b-2 border-black font-bold"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          완료한 목표
        </button>
      </div>

      <div className="mt-4 px-3">
        {activeTab === "ongoing" ? (
          transformedProgressGoals.length > 0 ? (
            transformedProgressGoals.map(
              (
                { id, name, dateString, days, goalDaycnt, transFormViewDays },
                idx
              ) => (
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
                    <span className="text-xs text-green-500">
                      {goalDaycnt}일
                    </span>
                    <span className="text-xs text-gray-500">{days}</span>
                  </div>

                  <div>
                    <hr />
                    <div className="mt-2 flex items-center justify-between gap-1">
                      {transFormViewDays
                        .slice(0, 7)
                        .map(({ key, backgroundColor, textColor, day }) => (
                          <span
                            key={key}
                            className={`flex size-9 items-center justify-center rounded-md ${
                              backgroundColor
                            } ${textColor} }`}
                          >
                            {day}
                          </span>
                        ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      {transFormViewDays
                        .slice(7, 14)
                        .map(({ key, backgroundColor, textColor, day }) => (
                          <span
                            key={key}
                            className={`flex size-9 items-center justify-center rounded-md ${
                              backgroundColor
                            } ${textColor} }`}
                          >
                            {day}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="mt-8 text-center text-gray-400">
              목표를 추가해보세요!
            </p>
          )
        ) : transformedCompletedGoals.length > 0 ? (
          transformedCompletedGoals.map(
            ({ id, name, achivePercent, dateString, days }) => (
              <div
                key={id}
                className="mb-2 flex flex-col gap-3 rounded-lg border p-4"
              >
                <span className="text-[13px] text-green-500">
                  {achivePercent}% 달성
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
      </div>
    </div>
  );
}
