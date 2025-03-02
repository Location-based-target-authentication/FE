export type WeekDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export interface Goals {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  days: WeekDay[];
  isTemporarySaved: boolean;
  isAchieved: boolean;
}

export type TransformedGoals = Goals & {
  title: string;
  lastRowText: string;
  buttonText: string;
  redirectionUrl: string;
};
