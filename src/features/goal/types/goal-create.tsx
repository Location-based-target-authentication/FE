export enum GoalStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE"
}

export type GoalData = {
  goal: {
    userId: number;
    name: string;
    startDate: string | null;
    endDate: string | null;
    locationName: string;
  };
  status: GoalStatus;
  days: string[];
};
