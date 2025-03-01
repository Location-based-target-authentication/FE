import { join, map, replace } from "es-toolkit/compat";

import { WeekDay } from "../types";

export const DAYS_STRING_MAP = new Map<WeekDay, string>([
  ["MON", "월"],
  ["TUE", "화"],
  ["WED", "수"],
  ["THU", "목"],
  ["FRI", "금"],
  ["SAT", "토"],
  ["SUN", "일"]
]);

export const generatDdateText = (startDate: string, endDate: string) => {
  const replacedStartDate = replace(startDate, /-/g, ". ");
  const replacedEndDate = replace(endDate, /-/g, ". ");

  return `${replacedStartDate} ~ ${replacedEndDate}`;
};

export const generateDayText = (days: WeekDay[]) => {
  const transformDays = map(days, (day) => DAYS_STRING_MAP.get(day));
  const day = days.length === 7 ? "매일" : join(transformDays, ", ");

  return day;
};
