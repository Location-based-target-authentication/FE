import { join, map, replace } from "es-toolkit/compat";

export const DAYS_STRING_MAP = new Map<string, string>([
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

export const generateDayText = (days: string) => {
  if (!days) return "";

  const dayArr = days.split(",");
  const transformDays = map(dayArr, (day) => DAYS_STRING_MAP.get(day));
  const day = dayArr.length === 7 ? "매일" : join(transformDays, ", ");

  return day;
};
