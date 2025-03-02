import { postRewards } from "@/features/reward/api/reward";
import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseMutationRewardsOptions
  extends UseMutationOptions<{ point: number }, AxiosError, void, unknown> {}
type GenerateQoPostRewards = (userId: string) => UseMutationRewardsOptions;
export const generate_qo_postRewards: GenerateQoPostRewards = (userId) => {
  return {
    mutationFn: () => postRewards({ pathParams: { userId } })
  };
};
