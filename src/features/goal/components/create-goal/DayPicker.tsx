interface DayPickerProps {
  selectedDays: string[];
  onToggleDay: (day: string) => void;
  onSelectAllDays: () => void;
}

const DayPicker: React.FC<DayPickerProps> = ({
  selectedDays,
  onToggleDay,
  onSelectAllDays
}) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const isDaily = selectedDays.length === days.length;

  return (
    <div>
      <label className="font-semibold">
        반복 요일 (주 {selectedDays.length}일)
      </label>
      <div className="mt-2 flex gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            className={`rounded px-4 py-2 ${selectedDays.includes(day) ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => onToggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <button
        onClick={onSelectAllDays}
        className={`mt-2 w-full rounded p-2 ${isDaily ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
      >
        매일하기
      </button>
    </div>
  );
};

export default DayPicker;
