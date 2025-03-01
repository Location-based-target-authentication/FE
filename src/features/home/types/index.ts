export type STATUS = "DRAF" | "ACTIVE" | "COMPLETE";

export interface Goals {
  id: number;
  goalName: string;
  startDate: string;
  endDate: string;
  dayOfWeek: string;
  status: STATUS;
  achievedToday: boolean;
}

export type TransformedGoals = Goals & {
  title: string;
  lastRowText: string;
  buttonText: string;
  redirectionUrl: string;
};
