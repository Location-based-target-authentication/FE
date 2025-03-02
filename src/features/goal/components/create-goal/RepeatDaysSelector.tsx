const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

const RepeatDaysSelector = ({ selectedDays, setSelectedDays }) => {
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const selectAllDays = () => {
    setSelectedDays(DAYS);
  };

  return (
    <div>
      <label className="font-semibold">반복 요일</label>
      <div className="mt-2 flex space-x-2">
        {DAYS.map((day) => (
          <button
            key={day}
            className={`rounded border p-2 ${selectedDays.includes(day) ? "bg-green-400 text-white" : "bg-gray-100"}`}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <button
        onClick={selectAllDays}
        className="mt-2 w-full rounded bg-gray-300 p-2"
      >
        매일 선택
      </button>
    </div>
  );
};

export default RepeatDaysSelector;
