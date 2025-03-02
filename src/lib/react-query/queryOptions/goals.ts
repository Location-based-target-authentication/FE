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
    queryFn: () =>
      getGoals({ pathParams: { goalId } }).then((data) => {
        console.log(data, "목표 인증 데이터");
        return data;
      }),
    staleTime: simpleGenerateSecond([[10, "s"]])
  };
};

interface UseMutationGoalsAchieveOptions
  extends UseMutationOptions<
    { totalPoints: number; bonusPoints: number },
    AxiosError,
    void,
    unknown
  > {}
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
type GenerateQoGetGoalsCheck = (userId: number) => UseQueryGoalsCheckOptions;
export const generate_qo_getGoalsCheck = ((userId) => {
  const options: UseQueryGoalsCheckOptions = {
    queryKey: [GOALS_CHECK, userId],
    queryFn: () => getGoalsCheck({ query: { userId } }).then((data) => data)
  };

  return options;
}) as GenerateQoGetGoalsCheck & { DELETE_KEY: (userId: string) => string[] };

generate_qo_getGoalsCheck.DELETE_KEY = (userId) => [GOALS_CHECK, userId];

interface UseQueryGoalsCompleteOptions
  extends UseQueryOptions<CompleteGoal[], AxiosError, CompleteGoal[]> {}
type GenerateQoGetGoalsComplete = (
  userId: string
) => UseQueryGoalsCompleteOptions;
export const generate_qo_getGoalsComplete = ((userId) => {
  const options: UseQueryGoalsCompleteOptions = {
    queryKey: [GOALS_COMPLETE(userId)],
    queryFn: () =>
      getGoalsComplete({ pathParams: { userId } }).then((data) => data)
  };

  return options;
}) as GenerateQoGetGoalsComplete & { DELETE_KEY: (userId: string) => string[] };

generate_qo_getGoalsComplete.DELETE_KEY = (userId) => [GOALS_COMPLETE(userId)];
