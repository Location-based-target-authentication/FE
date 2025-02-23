import { map } from "es-toolkit/compat";

function GoalList({ goalCount, transformGoals }) {
  return (
    <div className="p-4">
      {goalCount === 0 ? (
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
              isTemporarySaved,
              redirectionText
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
                    {redirectionText}
                  </button>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default GoalList;
