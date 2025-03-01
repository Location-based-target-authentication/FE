import { map } from "es-toolkit/compat";
import { Link } from "react-router";

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
          id,
          title,
          name,
          lastRowText,
          isAchieved,
          isTemporarySaved,
          buttonText,
          redirectionUrl
        }) => (
          <div
            key={id}
            className={`mb-4 rounded-2xl bg-white p-4 shadow-md ${isAchieved ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <p
                  className={`text-xs font-semibold ${isAchieved || isTemporarySaved ? "text-green-200" : "text-green-500"}`}
                >
                  {title}
                </p>
                <p
                  className={`${isAchieved || isTemporarySaved ? "text-gray-500" : "text-black"}`}
                >
                  {name}
                </p>
                <p className="text-xs text-gray-500">{lastRowText}</p>
              </div>
              <Link to={redirectionUrl}>
                <button
                  disabled={isAchieved}
                  className={`${isAchieved ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-green-500"} text-xs`}
                >
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default GoalList;
