import { DAYS } from "@/features/goal/components/create-goal/goal.constants";

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
  const isDaily = selectedDays.length === DAYS.length;

  return (
    <div className="mt-4 h-auto w-[335px]">
      <div className="flex h-[16px] min-w-[99px] items-center gap-[4px]">
        <div className="flex h-[16px] w-[51px] items-center text-[14px] font-medium leading-[16px] tracking-[-2.5%] text-gray-900">
          반복요일
        </div>
        <div className="font-regular text-primary-400 flex h-[16px] w-[44px] items-center justify-center whitespace-nowrap text-[14px] leading-[16px] tracking-[-2.5%]">
          (주&nbsp;{" "}
          <span className="text-[#3CC360]"> {selectedDays.length}</span>일)
        </div>
      </div>

      <div className="mt-2 flex h-[44px] w-[335px] gap-[4.5px]">
        {DAYS.map((day, index) => (
          <button
            key={index}
            className={`size-[44px] rounded-[8px] px-[15px] py-[14px] ${selectedDays.includes(day) ? "bg-[#3CC360] text-white" : "bg-gray-50 text-gray-400"} text-[14px] font-medium leading-[16px] tracking-[-2.5%]`}
            onClick={() => onToggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <button
        onClick={onSelectAllDays}
        className={`mt-2 flex items-center gap-2 ${
          isDaily ? "text-[#3CC360]" : "text-[#9E9E9E]"
        }`}
        style={{ width: "59px", height: "16px" }}
      >
        <div className="box-border flex size-[16px] items-center justify-center rounded-full">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00002 14.6668C8.87565 14.6679 9.74287 14.496 10.5519 14.1609C11.3608 13.8258 12.0956 13.3341 12.714 12.7142C13.334 12.0958 13.8256 11.361 14.1607 10.552C14.4958 9.74303 14.6678 8.8758 14.6667 8.00017C14.6678 7.12453 14.4958 6.25731 14.1607 5.44833C13.8256 4.63935 13.334 3.90456 12.714 3.28617C12.0956 2.66622 11.3608 2.17457 10.5519 1.83947C9.74287 1.50437 8.87565 1.33242 8.00002 1.3335C7.12438 1.33242 6.25716 1.50437 5.44818 1.83947C4.6392 2.17457 3.90441 2.66622 3.28602 3.28617C2.66607 3.90456 2.17442 4.63935 1.83932 5.44833C1.50422 6.25731 1.33227 7.12453 1.33335 8.00017C1.33227 8.8758 1.50422 9.74303 1.83932 10.552C2.17442 11.361 2.66607 12.0958 3.28602 12.7142C3.90441 13.3341 4.6392 13.8258 5.44818 14.1609C6.25716 14.496 7.12438 14.6679 8.00002 14.6668Z"
              stroke={isDaily ? "#3CC360" : "#9E9E9E"}
              strokeWidth="1.33333"
              strokeLinejoin="round"
            />
            <path
              d="M5.33334 8L7.33334 10L11.3333 6"
              stroke={isDaily ? "#3CC360" : "#9E9E9E"}
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="whitespace-nowrap text-[12px] font-medium leading-[14px] tracking-[-2.5%]">
          매일하기
        </span>
      </button>
    </div>
  );
};

export default DayPicker;
