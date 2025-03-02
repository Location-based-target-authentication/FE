import { getGoals } from "@/features/home/api/home";
import { BASE_PATH } from "@/features/home/api/paths";
import type { Goals } from "@/features/home/types";
import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseQueryGoalsOptions
  extends UseQueryOptions<Goals[], AxiosError, Goals[]> {}
type GenerateQoGetGoals = (userId: string) => UseQueryGoalsOptions;

export const generate_qo_getGoals = ((userId) => {
  const options: UseQueryGoalsOptions = {
    queryKey: [BASE_PATH, userId],
    queryFn: () =>
      getGoals({ pathParams: { userId } }).then((data) => {
        return data;
      })
  };

  return options;
}) as GenerateQoGetGoals & { DELETE_KEY: (userId: string) => string[] };

generate_qo_getGoals.DELETE_KEY = (userId) => [BASE_PATH, userId];
