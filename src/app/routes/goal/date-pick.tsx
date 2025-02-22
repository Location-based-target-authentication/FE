import { useState } from "react";

import {
  differenceInDays,
  format,
  isSameDay,
  isWithinInterval
} from "date-fns";
import Calendar from "react-calendar";
import { useLocation, useNavigate } from "react-router";

// import "react-calendar/dist/Calendar.css";

const DatePick = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goalName = location.state?.goalName || "";
  const mode: "start" | "end" = location.state?.mode || "start";
  const startDate: Date | null = location.state?.startDate
    ? new Date(location.state.startDate)
    : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    if (mode === "end") {
      navigate("/goal", {
        state: { startDate, endDate: selectedDate, goalName }
      });
    } else {
      navigate("/goal", { state: { startDate: selectedDate, goalName } });
    }
  };

  const formatDay = (locale: string | undefined, date: Date) => {
    return format(date, "d");
  };

  return (
    <div className="flex h-screen flex-col items-center bg-white p-4">
      <h2 className="mb-4 text-xl font-semibold">
        {mode === "end" ? "목표 날짜 설정" : "시작 날짜 설정"}
      </h2>

      <Calendar
        onClickDay={handleDateChange}
        value={selectedDate}
        formatDay={formatDay}
        prev2Label={null}
        next2Label={null}
        tileDisabled={({ date }) => {
          if (mode === "end" && startDate) {
            const sevenDaysLater = new Date(startDate);
            sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
            return date < startDate || date < sevenDaysLater;
          }
          if (mode === "start") {
            return date < new Date();
          }
          return false;
        }}
        tileClassName={({ date }) => {
          if (!startDate || !selectedDate) return "";
          if (isSameDay(date, startDate)) {
            return "bg-green-300 text-white rounded-l-full";
          }
          if (isSameDay(date, selectedDate)) {
            return "bg-green-300 text-white rounded-r-full";
          }

          if (isWithinInterval(date, { start: startDate, end: selectedDate })) {
            const dayOfWeek = date.getDay();

            if (dayOfWeek === 1) {
              return "bg-green-300 rounded-l-full";
            }
            if (dayOfWeek === 0) {
              return "bg-green-300 rounded-r-full";
            }

            return "bg-green-300 rounded-none";
          }
          return "";
        }}
      />

      <div className="mt-4 text-lg">
        {mode === "end" && startDate && selectedDate && (
          <>
            {format(startDate, "yyyy-MM-dd")} ~{" "}
            {format(selectedDate, "yyyy-MM-dd")} (
            {differenceInDays(selectedDate, startDate) + 1}일)
          </>
        )}
      </div>
      <button
        onClick={handleConfirm}
        disabled={!selectedDate}
        className="mt-4 rounded-lg bg-gray-300 px-6 py-2 text-gray-700 disabled:opacity-50"
      >
        설정하기
      </button>
    </div>
  );
};

export default DatePick;
