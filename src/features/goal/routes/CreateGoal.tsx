import { useCallback, useEffect, useState } from "react";

import { createGoal } from "@/features/goal/api/goal";
import { GoalData } from "@/features/goal/types/goal-create";
import { getPoint } from "@/features/point/\bapi/point";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router";

import { useAuthStore } from "@/stores/auth-store";

interface CreateGoalProps {
  goalId: number | null;
}

const CreateGoal: React.FC<CreateGoalProps> = ({ goalId }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [goalName, setGoalName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(
    location.state?.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    location.state?.endDate || null
  );

  const [targetLocation, setTargetLocation] = useState("");

  const [balancePoint, setBalancePoint] = useState<number>(0);

  const userId = useAuthStore((state) => state.userId);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const fetchBalancePoint = useCallback(async (): Promise<void> => {
    try {
      if (userId) {
        const { point } = await getPoint(userId);
        setBalancePoint(point);
      }
    } catch (error) {
      console.error("포인트 불러오기 실패:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchBalancePoint;
  }, [fetchBalancePoint]);

  useEffect(() => {
    if (!goalId) return;

    const savedGoal = localStorage.getItem(`goal_${goalId}`);
    if (savedGoal) {
      const parsedGoal = JSON.parse(savedGoal);
      setGoalName(parsedGoal.goalName || "");
      setStartDate(
        parsedGoal.startDate ? new Date(parsedGoal.startDate) : null
      );
      setEndDate(parsedGoal.endDate ? new Date(parsedGoal.endDate) : null);
      setTargetLocation(parsedGoal.location || "");
    }
  }, [goalId]);
  const handleDateClick = (): void => {
    navigate("/goal/date");
  };

  const handleEndDateClick = (): void => {
    navigate("/goal/date", { state: { mode: "end", startDate } });
  };

  const handleSave = async () => {
    if (!goalName.trim()) {
      alert("목표명을 입력해주세요.");
      return;
    }

    // data 객체 생성
    const goalData: GoalData = {
      goalName,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      targetLocation
    };

    try {
      // API 호출
      await createGoal(goalData);

      // 성공적으로 등록되면 목표 목록 페이지로 이동
      navigate("/goal/list"); // 목표 목록 페이지로 이동
      alert("목표가 등록되었습니다!");
    } catch (error) {
      console.error(error);
      alert("목표 등록에 실패했습니다.");
    }
  };

  const handleTempSave = (): void => {
    const tempData: GoalData = {
      goalName,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      targetLocation
    };

    localStorage.setItem(`goal_${goalId}`, JSON.stringify(tempData));
    navigate("/goal/list");
  };

  const handleBackButtonClick = (): void => {
    navigate("/goal/list");
  };

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const selectAllDays = (): void => {
    setSelectedDays((prev) => (prev.length === days.length ? [] : days));
  };

  const isDaily = selectedDays.length === 7;

  return (
    <div className="p-4">
      <div className="flex items-center border-b pb-2 text-xl font-bold">
        <button onClick={handleBackButtonClick} className="mr-2 text-gray-600">
          &lt; {/* '<' 버튼 */}
        </button>
        목표 추가
      </div>
      <div className="mt-4">
        <label className="block text-gray-600">목표 명</label>
        <input
          type="text"
          className="mt-1 w-full rounded border p-2"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="목표명을 입력하세요"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-600">목표 기간</label>
        <div className="flex space-x-2">
          <button
            className="rounded border px-4 py-2"
            onClick={handleDateClick}
          >
            {startDate ? format(startDate, "yyyy-MM-dd") : "시작 날짜"}
          </button>
          <span>~</span>
          <button
            className="rounded border px-4 py-2"
            onClick={handleEndDateClick}
          >
            {endDate ? format(endDate, "yyyy-MM-dd") : "종료 날짜"}
          </button>
        </div>
      </div>
      <label className="font-semibold">
        반복 요일 (주 {selectedDays.length}일)
      </label>
      <div className="mt-2 flex gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            className={`rounded px-4 py-2 ${selectedDays.includes(day) ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <button
        onClick={selectAllDays}
        className={`mt-2 w-full rounded p-2 ${isDaily ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
      >
        매일하기
      </button>

      <div className="mt-4">
        <label className="block text-gray-600">장소 설정</label>
        <input
          type="text"
          className="mt-1 w-full rounded border p-2"
          placeholder="장소를 입력하세요"
        />
      </div>
      <div className="mt-4">
        차감 포인트: <span className="font-bold">200p</span>
      </div>
      <div className="mt-4">
        보유 포인트: <span className="font-bold">{balancePoint}P</span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          className="rounded bg-gray-200 px-4 py-2"
          onClick={handleTempSave}
        >
          임시 저장
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleSave}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default CreateGoal;
