import type { WeekDay } from "@/types/date";

export interface CertificationInfo {
  date: string;
  isCertification: boolean;
}

export interface ProgressGoal {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  goalDaycnt: number;
  days: WeekDay[];
  viewDays: string[];
  certificationInfo: CertificationInfo[];
}

export interface CompleteGoal {
  id: number;
  name: string;
  achivePercent: number;
  startDate: string;
  endDate: string;
  days: WeekDay[];
}
