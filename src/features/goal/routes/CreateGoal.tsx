import { useEffect, useState } from "react";

import GoalForm from "@/features/goal/components/create-goal/GoalForm";

const CreateGoal = () => {
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    setUserPoints(200); // 예제 포인트 값
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">목표 추가</h1>
      <GoalForm />
      <p className="mt-4 text-right text-gray-500">
        사용자 포인트: {userPoints}P
      </p>
    </div>
  );
};

export default CreateGoal;
