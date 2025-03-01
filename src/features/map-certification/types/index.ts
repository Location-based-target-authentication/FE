type WeekDay = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export interface Goals {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
  days: WeekDay[];
}
