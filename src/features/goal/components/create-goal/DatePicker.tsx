import { format } from "date-fns";

interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateClick: () => void;
  onEndDateClick: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  onStartDateClick,
  onEndDateClick
}) => (
  <div className="mt-4">
    <label className="block text-gray-600">목표 기간</label>
    <div className="flex space-x-2">
      <button className="rounded border px-4 py-2" onClick={onStartDateClick}>
        {startDate ? format(startDate, "yyyy-MM-dd") : "시작 날짜"}
      </button>
      <span>~</span>
      <button className="rounded border px-4 py-2" onClick={onEndDateClick}>
        {endDate ? format(endDate, "yyyy-MM-dd") : "종료 날짜"}
      </button>
    </div>
  </div>
);

export default DatePicker;
