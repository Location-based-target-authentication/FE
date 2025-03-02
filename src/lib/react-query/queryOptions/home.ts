import { getGoals } from "@/features/home/api/home";
import { BASE_PATH } from "@/features/home/api/paths";
import type { Goals } from "@/features/home/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseQueryGoalsOptions
  extends UseQueryOptions<Goals[], AxiosError, Goals[]> {}
type GenerateQoGetGoals = (userId: string) => UseQueryGoalsOptions;

export const generate_qo_getGoals: GenerateQoGetGoals = (userId) => {
  return {
    queryKey: [BASE_PATH],
    queryFn: () =>
      getGoals({ pathParams: { userId } }).then((data) => {
        return data;
      })
  };
};
