import { getGoals } from "@/features/home/api/home";
import { BASE_PATH } from "@/features/home/api/paths";
import type { Goals } from "@/features/home/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseQueryGoalsOptions
  extends UseQueryOptions<Goals[], AxiosError, Goals[]> {}
type GenerateQoGetGoals = () => UseQueryGoalsOptions;

export const generate_qo_getGoals: GenerateQoGetGoals = () => {
  return {
    queryKey: [BASE_PATH],
    queryFn: () =>
      getGoals().then((data) => {
        return data;
      })
  };
};
