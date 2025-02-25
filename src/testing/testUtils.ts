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

export const goalCheckAll = {
  id: 1,
  name: "태권도233",
  startDate: "2025-02-01",
  endDate: "2025-02-28",
  goalDaycnt: 28,
  day: ["월", "수", "금"],
  viewDays: [
    "2025-02-02",
    "2025-02-03",
    "2025-02-04",
    "2025-02-05",
    "2025-02-06",
    "2025-02-07",
    "2025-02-08",
    "2025-02-09",
    "2025-02-10",
    "2025-02-11",
    "2025-02-12",
    "2025-02-13",
    "2025-02-14",
    "2025-02-15"
  ],
  certificationInfo: [
    { date: "2025-02-02", isCertification: false },
    { date: "2025-02-03", isCertification: false },
    { date: "2025-02-04", isCertification: false },
    { date: "2025-02-05", isCertification: false },
    { date: "2025-02-06", isCertification: true },
    { date: "2025-02-07", isCertification: true },
    { date: "2025-02-08", isCertification: false },
    { date: "2025-02-09", isCertification: false },
    { date: "2025-02-10", isCertification: false },
    { date: "2025-02-11", isCertification: false },
    { date: "2025-02-12", isCertification: false },
    { date: "2025-02-13", isCertification: false },
    { date: "2025-02-14", isCertification: false },
    { date: "2025-02-15", isCertification: false }
  ]
};

export const goalCheckNotBeforeData = {
  id: 2,
  name: "독서하기",
  startDate: "2025-02-07",
  endDate: "2025-02-21",
  goalDaycnt: 15,
  days: ["월", "화", "수", "목", "금", "토", "일"],
  viewDays: [
    "2025-02-02",
    "2025-02-03",
    "2025-02-04",
    "2025-02-05",
    "2025-02-06",
    "2025-02-07",
    "2025-02-08",
    "2025-02-09",
    "2025-02-10",
    "2025-02-11",
    "2025-02-12",
    "2025-02-13",
    "2025-02-14",
    "2025-02-15"
  ],
  certificationInfo: [
    { date: "2025-02-07", isCertification: false },
    { date: "2025-02-08", isCertification: false },
    { date: "2025-02-09", isCertification: false },
    { date: "2025-02-10", isCertification: false },
    { date: "2025-02-11", isCertification: false },
    { date: "2025-02-12", isCertification: false },
    { date: "2025-02-13", isCertification: true },
    { date: "2025-02-14", isCertification: true },
    { date: "2025-02-15", isCertification: false },
    { date: "2025-02-16", isCertification: false },
    { date: "2025-02-17", isCertification: false },
    { date: "2025-02-18", isCertification: false },
    { date: "2025-02-19", isCertification: false },
    { date: "2025-02-20", isCertification: false },
    { date: "2025-02-21", isCertification: false }
  ]
};

export const goalCheckNotAfterData = {
  id: 3,
  name: "운동하기",
  startDate: "2025-02-01",
  endDate: "2025-02-12",
  goalDaycnt: 12,
  days: ["월", "화", "수", "목", "금", "토", "일"],
  viewDays: [
    "2025-02-02",
    "2025-02-03",
    "2025-02-04",
    "2025-02-05",
    "2025-02-06",
    "2025-02-07",
    "2025-02-08",
    "2025-02-09",
    "2025-02-10",
    "2025-02-11",
    "2025-02-12",
    "2025-02-13",
    "2025-02-14",
    "2025-02-15"
  ],
  certificationInfo: [
    { date: "2025-02-02", isCertification: false },
    { date: "2025-02-03", isCertification: false },
    { date: "2025-02-04", isCertification: false },
    { date: "2025-02-05", isCertification: false },
    { date: "2025-02-06", isCertification: false },
    { date: "2025-02-07", isCertification: false },
    { date: "2025-02-08", isCertification: false },
    { date: "2025-02-09", isCertification: false },
    { date: "2025-02-10", isCertification: false },
    { date: "2025-02-11", isCertification: false },
    { date: "2025-02-12", isCertification: false }
  ]
};

export const goalCompleteData1 = {
  id: 1,
  name: "태권도233",
  achivePercent: 80,
  startDate: "2025-02-01",
  endDate: "2025-02-28",
  days: ["월", "수", "금"]
};

export const goalCompleteData2 = {
  id: 2,
  name: "독서하기",
  achivePercent: 70,
  startDate: "2025-02-07",
  endDate: "2025-02-21",
  days: ["월", "화", "수", "목", "금", "토", "일"]
};
