import { map } from "es-toolkit/compat";

import type { TransformedGoals } from "../types";

interface GoalListProps {
  goalCount: number;
  transformGoals: TransformedGoals[];
}

function GoalList({ goalCount, transformGoals }: GoalListProps) {
  if (goalCount === 0) {
    return (
      <div className="flex h-56 w-full flex-col items-center justify-center p-4">
        <p className="text-gray-400">목표를 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {map(
        transformGoals,
        ({
          goalId,
          title,
          goalName,
          lastRowText,
          achievedToday,
          status,
          buttonText,
          redirectionCallback
        }) => (
          <div
            key={goalId}
            className={`mb-4 rounded-2xl bg-white p-4 shadow-md ${achievedToday ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <p
                  className={`text-xs font-semibold ${achievedToday || status === "DRAFT" ? "text-green-200" : "text-green-500"}`}
                >
                  {title}
                </p>
                <p
                  className={`${achievedToday || status === "DRAFT" ? "text-gray-500" : "text-black"}`}
                >
                  {goalName}
                </p>
                <p className="text-xs text-gray-500">{lastRowText}</p>
              </div>

              <button
                disabled={achievedToday}
                className={`${achievedToday ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-green-500"} text-xs`}
                onClick={redirectionCallback}
              >
                {buttonText}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default GoalList;
