export type STATUS = "DRAF" | "ACTIVE" | "COMPLETE";

export interface GoalDetail {
  name: string;
  startDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
  dayOfWeek: string;
  status: STATUS;
  achievedToday: boolean;
}
