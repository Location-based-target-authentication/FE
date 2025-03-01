import { getGoalsCheck, getGoalsComplete } from "@/features/goal/api/goal";
import { GOALS_CHECK, GOALS_COMPLETE } from "@/features/goal/api/path";
import type { CompleteGoal, ProgressGoal } from "@/features/goal/types";
import { getGoals, postGoalsAchieve } from "@/features/map-certification/api";
import { GOALS_DETAIL } from "@/features/map-certification/api/paths";
import { GoalDetail } from "@/features/map-certification/types";
import { simpleGenerateSecond } from "@/utils/date";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseQueryGoalsOptions
  extends UseQueryOptions<GoalDetail, AxiosError, GoalDetail> {}
type GenerateQoGetGoals = (goalId: number) => UseQueryGoalsOptions;
export const generate_qo_getGoals: GenerateQoGetGoals = (goalId) => {
  return {
    queryKey: [GOALS_DETAIL(goalId)],
    queryFn: () => getGoals({ pathParams: { goalId } }).then((data) => data),
    staleTime: simpleGenerateSecond([[10, "s"]])
  };
};

interface UseMutationGoalsAchieveOptions
  extends UseMutationOptions<{ point: number }, AxiosError, void, unknown> {}
type GenerateQoPostGoalsAchieve = ({
  goalId,
  userId,
  latitude,
  longitude
}: {
  goalId: number;
  userId: number;
  latitude: number;
  longitude: number;
}) => UseMutationGoalsAchieveOptions;
export const generate_qo_postGoalsAchieve: GenerateQoPostGoalsAchieve = ({
  goalId,
  userId,
  latitude,
  longitude
}) => {
  return {
    mutationFn: () =>
      postGoalsAchieve({
        pathParams: { goalId },
        data: { userId, latitude, longitude }
      })
  };
};

interface UseQueryGoalsCheckOptions
  extends UseQueryOptions<ProgressGoal[], AxiosError, ProgressGoal[]> {}
type GenerateQoGetGoalsCheck = () => UseQueryGoalsCheckOptions;
export const generate_qo_getGoalsCheck: GenerateQoGetGoalsCheck = () => {
  return {
    queryKey: [GOALS_CHECK],
    queryFn: () => getGoalsCheck().then((data) => data)
  };
};

interface UseQueryGoalsCompleteOptions
  extends UseQueryOptions<CompleteGoal[], AxiosError, CompleteGoal[]> {}
type GenerateQoGetGoalsComplete = () => UseQueryGoalsCompleteOptions;
export const generate_qo_getGoalsComplete: GenerateQoGetGoalsComplete = () => {
  return {
    queryKey: [GOALS_COMPLETE],
    queryFn: () => getGoalsComplete().then((data) => data)
  };
};
