import { useState } from "react";

import CompleteGoal from "./complete-goal";
import ProgressGoal from "./progress-goal";

export default function GoalPage() {
  const [activeTab, setActiveTab] = useState("ongoing");

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
        {activeTab === "ongoing" ? <ProgressGoal /> : <CompleteGoal />}
      </div>
    </div>
  );
}
