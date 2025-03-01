export const generateInitialGoalsData = () => ({
  id: 0,
  goalName: "",
  startDate: "",
  endDate: "",
  latitude: 33.450701,
  longitude: 126.570667,
  dayOfWeek: ""
});

export const DAYS_STRING_MAP = new Map([
  ["MON", "월"],
  ["TUE", "화"],
  ["WED", "수"],
  ["THU", "목"],
  ["FRI", "금"],
  ["SAT", "토"],
  ["SUN", "일"]
]);
