// import { useLocation, useNavigate } from "react-router-dom";

import { Outlet } from "react-router";

const DatePickView = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);

  // const returnUrl = query.get("returnUrl") || "/goal-form";

  // const handleDateChange = (e) => {
  //   const selectedStartDate = e.target.value;
  //   navigate(`${returnUrl}?startDate=${selectedStartDate}`);
  // };

  return (
    <>
      <div>
        <h2>시작 날짜 설정</h2>
        {/* <input
        type="date"
        onChange={handleDateChange}
        className="w-full rounded border p-2"
      /> */}
      </div>
      <Outlet />
    </>
  );
};

export default DatePickView;
