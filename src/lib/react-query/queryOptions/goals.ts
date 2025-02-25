import { getGoalsCheck, getGoalsComplete } from "@/features/goal/api/goal";
import { GOALS_CHECK, GOALS_COMPLETE } from "@/features/goal/api/path";
import { getGoals, postGoalsAchieve } from "@/features/map-certification/api";
import { GOALS } from "@/features/map-certification/api/paths";
import { Goals } from "@/features/map-certification/types";
import { simpleGenerateSecond } from "@/utils/date";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseQueryGoalsOptions
  extends UseQueryOptions<Goals, AxiosError, Goals> {}
type GenerateQoGetGoals = (id: number) => UseQueryGoalsOptions;
export const generate_qo_getGoals: GenerateQoGetGoals = (id) => {
  return {
    queryKey: [GOALS(id)],
    queryFn: () => getGoals({ pathParams: { id } }).then((data) => data),
    staleTime: simpleGenerateSecond([[10, "s"]])
  };
};

interface UseMutationGoalsAchieveOptions
  extends UseMutationOptions<{ point: number }, AxiosError, void, unknown> {}
type GenerateQoPostGoalsAchieve = (
  id: number
) => UseMutationGoalsAchieveOptions;
export const generate_qo_postGoalsAchieve: GenerateQoPostGoalsAchieve = (
  id
) => {
  return {
    mutationFn: () => postGoalsAchieve({ pathParams: { id } })
  };
};

export const generate_qo_getGoalsCheck = () => {
  return {
    queryKey: [GOALS_CHECK],
    queryFn: () => getGoalsCheck().then((data) => data)
  };
};

export const generate_qo_getGoalsComplete = () => {
  return {
    queryKey: [GOALS_COMPLETE],
    queryFn: () => getGoalsComplete().then((data) => data)
  };
};
