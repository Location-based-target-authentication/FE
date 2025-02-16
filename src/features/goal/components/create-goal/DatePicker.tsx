import { Link, useNavigate } from "react-router-dom";

import { paths } from "@/config/paths";

const DatePicker = ({
  label,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {
  const navigate = useNavigate();
  const goToDatePage = () => {
    navigate("/goal/date"); // 이렇게 경로로 이동
  };
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <div className="flex space-x-2">
        <Link
          to={paths.goal.date.path}
          className="w-full rounded border p-2 text-center"
        >
          이동해
        </Link>
        <Link
          to={paths.goal.date.path} // 시작 날짜 페이지로 이동
          className="w-full rounded border p-2 text-center"
        ></Link>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onClick={goToDatePage}
          className="w-full rounded border p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>
    </div>
  );
};

export default DatePicker;
