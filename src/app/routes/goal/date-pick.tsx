import { useState } from "react";

import {
  addMonths,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subDays,
  subMonths
} from "date-fns";
import { useLocation, useNavigate } from "react-router";

import { paths } from "@/config/paths";

const DatePick = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goalName = location.state?.goalName || "";
  const mode: "start" | "end" = location.state?.mode || "start";
  const startDate: Date | null = location.state?.startDate
    ? new Date(location.state.startDate)
    : null;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstWeekday = getDay(firstDayOfMonth);

  const prevMonthLastDay = subDays(firstDayOfMonth, firstWeekday);
  const days = eachDayOfInterval({
    start: prevMonthLastDay,
    end: lastDayOfMonth
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    if (mode === "end") {
      navigate(paths.goal.create.path, {
        state: { startDate, endDate: selectedDate, goalName }
      });
    } else {
      navigate(paths.goal.create.path, {
        state: { startDate: selectedDate, goalName }
      });
    }
  };

  return (
    <div className="flex h-screen flex-col items-center bg-white p-4">
      <h2 className="mb-[40px] text-xl font-semibold">
        {mode === "end" ? "목표 날짜 설정" : "시작 날짜 설정"}
      </h2>

      <div className="mb-[31px] flex h-[24px] w-[192px] items-center justify-between text-lg font-medium">
        <button
          className="p-2 text-gray-500 hover:text-gray-800"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          {"<"}
        </button>
        <span>{format(currentMonth, "yyyy.MM")}</span>
        <button
          className="p-2 text-gray-500 hover:text-gray-800"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          {">"}
        </button>
      </div>
      <div className="flex w-[335px] flex-col">
        <div className="flex w-[335px] flex-col">
          <div className="grid h-[44px] w-[335px] grid-cols-7 gap-x-[4.5px] gap-y-[12px] font-medium text-gray-600">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="flex w-full items-center justify-center text-[14px] leading-[16px] -tracking-wide"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-x-[4.5px] gap-y-[12px]">
            {days.map((date, index) => {
              const isBeforeToday = date < new Date();
              const isInRange =
                startDate &&
                selectedDate &&
                date > startDate &&
                date < selectedDate;
              const isStartOrEnd =
                (startDate &&
                  format(startDate, "yyyy-MM-dd") ===
                    format(date, "yyyy-MM-dd")) ||
                (selectedDate &&
                  format(selectedDate, "yyyy-MM-dd") ===
                    format(date, "yyyy-MM-dd"));

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`flex size-[44px] items-center justify-center rounded-full ${
                    isStartOrEnd
                      ? "bg-green-500 text-white"
                      : isInRange
                        ? "bg-green-100"
                        : isBeforeToday
                          ? "text-gray-200"
                          : "text-[#616161] hover:bg-gray-200"
                  }`}
                >
                  {format(date, "d")}
                </button>
              );
            })}
          </div>
        </div>

        <p className="font-pretendard mt-[8px] text-[12px] font-normal leading-[14px] tracking-[-2.5%] text-gray-400">
          최소 7일, 최대 3개월까지 설정할 수 있어요.
        </p>
      </div>
      <div className="absolute top-[541px] mt-[16px] flex w-[171px] flex-col items-center">
        {mode === "end" && startDate && selectedDate && (
          <div className="mb-[16px] whitespace-nowrap text-center text-[16px] leading-[18px] tracking-[-2.5%] text-gray-600">
            {format(startDate, "yyyy-MM-dd")} ~{" "}
            {format(selectedDate, "yyyy-MM-dd")}{" "}
            <span className="font-bold text-green-500">
              {differenceInDays(selectedDate, startDate) + 1}일
            </span>
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!selectedDate}
          className="mb-[74px] h-[44px] w-[335px] rounded-lg bg-green-500 text-center text-[16px] font-medium leading-[18px] tracking-[-2.5%] text-[#FFFFFF] disabled:bg-gray-300"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default DatePick;
