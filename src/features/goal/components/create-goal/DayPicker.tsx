import checkGrayUrl from "@/asset/goal/check-gray.svg?url";
import checkGreenUrl from "@/asset/goal/check-green.svg?url";
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
          (주&nbsp;
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
        <img
          src={isDaily ? checkGreenUrl : checkGrayUrl}
          alt="매일하기 체크박스"
          className="size-[16px]"
        />
        <span className="whitespace-nowrap text-[12px] font-medium leading-[14px] tracking-[-2.5%]">
          매일하기
        </span>
      </button>
    </div>
  );
};

export default DayPicker;
