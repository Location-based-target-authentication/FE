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
  <div className="h-[86px] w-[335px]">
    <label className="block text-[14px] font-medium leading-[16px] tracking-[-2.5%] text-[#1A1A1A]">
      목표 기간
    </label>
    <div className="mt-1 flex items-center justify-between">
      <button
        className={`h-[44px] w-[150px] rounded-[8px] p-[10px] text-[14px] ${
          startDate ? "text-black" : "text-gray-400"
        } flex items-center gap-2 bg-gray-50`}
        onClick={onStartDateClick}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 text-gray-400"
        >
          <path
            d="M13 0C13.2449 3.23106e-05 13.4813 0.0899562 13.6644 0.252715C13.8474 0.415475 13.9643 0.639749 13.993 0.883L14 1V2H16C16.5046 1.99984 16.9906 2.19041 17.3605 2.5335C17.7305 2.87659 17.9572 3.34684 17.995 3.85L18 4V16C18.0002 16.5046 17.8096 16.9906 17.4665 17.3605C17.1234 17.7305 16.6532 17.9572 16.15 17.995L16 18H2C1.49542 18.0002 1.00943 17.8096 0.639452 17.4665C0.269471 17.1234 0.0428434 16.6532 0.00500021 16.15L1.00268e-07 16V4C-0.000159579 3.49542 0.190406 3.00943 0.533497 2.63945C0.876588 2.26947 1.34684 2.04284 1.85 2.005L2 2H4V1C4.00028 0.74512 4.09788 0.499968 4.27285 0.314632C4.44782 0.129296 4.68695 0.017765 4.94139 0.00282788C5.19584 -0.0121092 5.44638 0.0706746 5.64183 0.234265C5.83729 0.397855 5.9629 0.629904 5.993 0.883L6 1V2H12V1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0ZM16 9H2V16H16V9ZM16 4H2V7H16V4Z"
            fill="#9E9E9E"
          />
        </svg>

        {startDate ? format(startDate, "yyyy-MM-dd") : "시작 날짜"}
      </button>
      <span className="rounded px-2 py-1 text-gray-500">~</span>
      <button
        className={`h-[44px] w-[150px] rounded-[8px] p-[10px] text-[14px] ${
          endDate ? "text-black" : "text-gray-400"
        } flex items-center gap-2 bg-gray-50`}
        onClick={onEndDateClick}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 text-gray-400"
        >
          <path
            d="M13 0C13.2449 3.23106e-05 13.4813 0.0899562 13.6644 0.252715C13.8474 0.415475 13.9643 0.639749 13.993 0.883L14 1V2H16C16.5046 1.99984 16.9906 2.19041 17.3605 2.5335C17.7305 2.87659 17.9572 3.34684 17.995 3.85L18 4V16C18.0002 16.5046 17.8096 16.9906 17.4665 17.3605C17.1234 17.7305 16.6532 17.9572 16.15 17.995L16 18H2C1.49542 18.0002 1.00943 17.8096 0.639452 17.4665C0.269471 17.1234 0.0428434 16.6532 0.00500021 16.15L1.00268e-07 16V4C-0.000159579 3.49542 0.190406 3.00943 0.533497 2.63945C0.876588 2.26947 1.34684 2.04284 1.85 2.005L2 2H4V1C4.00028 0.74512 4.09788 0.499968 4.27285 0.314632C4.44782 0.129296 4.68695 0.017765 4.94139 0.00282788C5.19584 -0.0121092 5.44638 0.0706746 5.64183 0.234265C5.83729 0.397855 5.9629 0.629904 5.993 0.883L6 1V2H12V1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0ZM16 9H2V16H16V9ZM16 4H2V7H16V4Z"
            fill="#9E9E9E"
          />
        </svg>

        {endDate ? format(endDate, "yyyy-MM-dd") : "목표 날짜"}
      </button>
    </div>
    <p className="mt-1 text-[12px] font-medium leading-[14px] tracking-[-2.5%] text-gray-400">
      최소 7일, 최대 3개월까지 설정할 수 있어요.
    </p>
  </div>
);

export default DatePicker;
