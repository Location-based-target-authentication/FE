import { useMemo, useState } from "react";

import CompleteGoal from "./complete-goal";
import ProgressGoal from "./progress-goal";

export default function GoalPage() {
  const [activeTab, setActiveTab] = useState("progress");

  const buttonInfo = useMemo(
    () => [
      {
        title: "진행중인 목표",
        extraClasses:
          activeTab === "progress"
            ? "border-b-2 border-black font-bold"
            : "text-gray-400",
        onClick: () => setActiveTab("progress")
      },
      {
        title: "완료한 목표",
        extraClasses:
          activeTab === "completed"
            ? "border-b-2 border-black font-bold"
            : "text-gray-400",
        onClick: () => setActiveTab("completed")
      }
    ],

    [activeTab]
  );

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="flex border-b">
        {buttonInfo.map(({ title, extraClasses, onClick }) => (
          <button
            key={title}
            className={`flex-1 p-2 text-center ${extraClasses}`}
            onClick={onClick}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="mt-4 px-3">
        {activeTab === "progress" ? <ProgressGoal /> : <CompleteGoal />}
      </div>
    </div>
  );
}
