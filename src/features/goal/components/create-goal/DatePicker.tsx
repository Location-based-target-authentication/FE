import { useNavigate } from "react-router";

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
    navigate(paths.goal.date.path);
  };

  return (
    <div>
      <label className="font-semibold">{label}</label>
      <div className="flex space-x-2">
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
          onClick={goToDatePage}
          className="w-full rounded border p-2"
        />
      </div>
    </div>
  );
};

export default DatePicker;
