import { useEffect, useState } from "react";

import DatePicker from "@/features/goal/components/create-goal/DatePicker";
import LocationSelector from "@/features/goal/components/create-goal/LocationSelector";
import RepeatDaysSelector from "@/features/goal/components/create-goal/RepeatDaysSelector";

const GoalForm = () => {
  const [goalName, setGoalName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeatDays, setRepeatDays] = useState([]);
  const [location, setLocation] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const savedGoal = localStorage.getItem("tempGoal");
    if (savedGoal) {
      const parsedGoal = JSON.parse(savedGoal);
      setGoalName(parsedGoal.goalName);
      setStartDate(parsedGoal.startDate);
      setEndDate(parsedGoal.endDate);
      setRepeatDays(parsedGoal.repeatDays);
      setLocation(parsedGoal.location);
    }
  }, []);

  const saveTemporaryGoal = () => {
    const tempGoal = { goalName, startDate, endDate, repeatDays, location };
    localStorage.setItem("tempGoal", JSON.stringify(tempGoal));
  };
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const selectAllDays = () => {
    setSelectedDays(days);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="font-semibold">목표명</label>
        <input
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="목표 이름"
          className="w-full rounded border p-2"
        />
      </div>

      <label className="font-semibold">
        반복 요일 (주 {selectedDays.length}일)
      </label>
      <div className="mt-2 flex gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            className={`rounded px-4 py-2 ${selectedDays.includes(day) ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <button
        onClick={selectAllDays}
        className="mt-2 w-full rounded bg-blue-500 p-2 text-white"
      >
        매일하기
      </button>

      <DatePicker
        label="목표 기간"
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <RepeatDaysSelector
        selectedDays={repeatDays}
        setSelectedDays={setRepeatDays}
      />

      <LocationSelector location={location} setLocation={setLocation} />

      <button
        onClick={saveTemporaryGoal}
        className="w-full rounded bg-gray-200 p-2"
      >
        임시 저장
      </button>
      <button className="w-full rounded bg-blue-500 p-2 text-white">
        등록
      </button>
    </div>
  );
};

export default GoalForm;
