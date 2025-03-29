import { useMemo } from "react";

import CreateGoal from "@/features/goal/routes/CreateGoal";
import { useLocation } from "react-router";

const CreateGoalView = () => {
  const { search } = useLocation();
  const parsedGoalId = useMemo(() => {
    const queryParams = new URLSearchParams(search);
    const goalId = queryParams.get("goalId");
    const numberedGoalId = goalId ? Number(goalId) : -1;
    localStorage.setItem("goalId", String(numberedGoalId));

    return numberedGoalId;
  }, [search]);

  return <CreateGoal goalId={parsedGoalId} />;
};

export default CreateGoalView;
