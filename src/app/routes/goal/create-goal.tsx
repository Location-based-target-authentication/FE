import CreateGoal from "@/features/goal/routes/CreateGoal";
import { useParams } from "react-router";

const CreateGoalView = () => {
  const { goalId } = useParams<{ goalId?: string }>();
  const parsedGoalId: number | undefined = goalId ? Number(goalId) : undefined;

  return <CreateGoal goalId={parsedGoalId} />;
};

export default CreateGoalView;
