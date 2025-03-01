import { postRewards } from "@/features/reward/api/reward";
import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseMutationRewardsOptions
  extends UseMutationOptions<
    { point: number; status: string },
    AxiosError,
    void,
    unknown
  > {}
type GenerateQoPostRewards = (id: number) => UseMutationRewardsOptions;
export const generate_qo_postRewards: GenerateQoPostRewards = (socialId) => {
  return {
    mutationFn: () => postRewards({ pathParams: { socialId } })
  };
};
