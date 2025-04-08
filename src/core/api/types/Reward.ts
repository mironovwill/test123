export type RewardDto = {
  action: string;
  description: string;
  imageUuid: string;
  name: string;
};

export type RewardResponse = RewardDto & {
  id: string;
  status: string;
};
