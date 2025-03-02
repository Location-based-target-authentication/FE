export enum GoalStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE"
}

export type GoalData = {
  userId: number;
  name: string;
  startDate: string | null;
  endDate: string | null;
  latitude: number;
  longitude: number;
  locationName: string;
  status: GoalStatus;
  selectedDays: string[];
};
