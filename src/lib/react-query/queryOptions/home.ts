// interface UseQueryGoalsOptions
//   extends UseQueryOptions<Goals, AxiosError, Goals> {}

import { getGoals } from "@/features/home/api/home";
import { BASE_PATH } from "@/features/home/api/paths";

// type GenerateQoGetGoals = (id: number) => UseQueryGoalsOptions;
export const generate_qo_getGoals = () => {
  return {
    queryKey: [BASE_PATH],
    queryFn: () =>
      getGoals().then((data) => {
        return data;
      })
  };
};
