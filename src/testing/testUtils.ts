export const testTodos = [
  {
    id: "1",
    title: "React"
  },
  {
    id: "2",
    title: "Vue"
  },
  {
    id: "3",
    title: "Angular"
  },
  {
    id: "4",
    title: "Svelte"
  }
];

export const goalEveryDayCertification = {
  id: 14,
  name: "태권도233",
  startDate: "2025-02-19",
  endDate: "2025-02-28",
  latitude: 37.5071,
  longitude: 127.0629,
  days: ["MON", "WED", "THU", "FRI", "SAT", "SUN"]
};

export const goalNotEveryDayCertification = {
  id: 2,
  title: "독서하기",
  time: ["2021-07-01", "2021-07-31"],
  day: ["월", "수", "금"],
  position: { lat: 37.50766, lng: 127.06298 }
};

export const goalNotContainRadarCertification = {
  id: 3,
  title: "운동하기",
  time: ["2021-07-01", "2021-07-31"],
  day: ["월", "화", "수", "목", "금", "토", "일"],
  position: { lat: 37.5075, lng: 127.0633 }
};
