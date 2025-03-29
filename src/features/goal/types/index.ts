export type STATUS = "DRAF" | "ACTIVE" | "COMPLETE";

export interface CertificationInfo {
  achievedAt: string;
  achievedSuccess: boolean;
}

export interface ProgressGoal {
  id: number;
  userId: number;
  name: string;
  status: STATUS;
  startDate: string;
  endDate: string;
  targetCount: number;
  dayOfWeek: string;
  calender: string[];
  dateAuthentication: CertificationInfo[];
}

export interface CompleteGoal {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  dayOfWeek: string;
  targetCount: number;
  achievedCount: number;
}
