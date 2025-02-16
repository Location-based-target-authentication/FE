import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const DatePickerPage = ({ setStartDate, setEndDate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type"); // "start" 또는 "end"

  const [selectedDate, setSelectedDate] = useState("");

  const handleConfirm = () => {
    if (type === "start") setStartDate(selectedDate);
    else setEndDate(selectedDate);

    navigate(-1);
  };

  return (
    <div>
      <h1>{type === "start" ? "시작 날짜 설정" : "목표 날짜 설정"}</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={handleConfirm}>설정 완료</button>
    </div>
  );
};

export default DatePickerPage;
