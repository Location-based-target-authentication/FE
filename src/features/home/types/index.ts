export type STATUS = "DRAFT" | "ACTIVE" | "COMPLETE";

export interface Goals {
  goalId: number;
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
  redirectionCallback: () => void;
};
