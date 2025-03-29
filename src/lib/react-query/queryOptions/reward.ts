import { postRewards } from "@/features/reward/api/reward";
import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface RewardData {
  points: number;
  pointType: string;
  description: string;
}

interface UseMutationRewardsOptions
  extends UseMutationOptions<
    { totalPoints: number; status: string },
    AxiosError,
    RewardData,
    unknown
  > {}
type GenerateQoPostRewards = (userId: number) => UseMutationRewardsOptions;
export const generate_qo_postRewards: GenerateQoPostRewards = (userId) => {
  return {
    mutationFn: (data: RewardData) =>
      postRewards({ pathParams: { userId }, data })
  };
};
