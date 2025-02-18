import { getGoals, postGoalsAchieve } from "@/features/map-certification/api";
import { GOALS } from "@/features/map-certification/api/paths";
import { simpleGenerateSecond } from "@/utils/date";

export const generate_qo_getGoals = (id: number) => {
  return {
    queryKey: [GOALS(id)],
    queryFn: () => getGoals(id).then((data) => data),
    staleTime: simpleGenerateSecond([[10, "s"]])
  };
};

export const generate_qo_postGoalsAchieve = (id: number) => {
  return {
    mutationFn: () => postGoalsAchieve(id)
  };
};
