import { useCallback, useEffect, useState } from "react";

import {
  createGoal,
  createTempSaveGoal,
  getTempGoal
} from "@/features/goal/api/goal";
import BalanceInfo from "@/features/goal/components/create-goal/BalanceInfo";
import DatePicker from "@/features/goal/components/create-goal/DatePicker";
import DayPicker from "@/features/goal/components/create-goal/DayPicker";
import SaveButtons from "@/features/goal/components/create-goal/SaveButtons";
import { GoalData, GoalStatus } from "@/features/goal/types/goal-create";
import { getPoint } from "@/features/point/\bapi/point";
import { useLocation, useNavigate } from "react-router";

import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

interface CreateGoalProps {
  goalId: number | null;
}

const dayMapping: Record<string, string> = {
  일: "SUN",
  월: "MON",
  화: "TUE",
  수: "WED",
  목: "THU",
  금: "FRI",
  토: "SAT"
};

const CreateGoal: React.FC<CreateGoalProps> = ({ goalId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);

  const [goalName, setGoalName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(
    location.state?.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    location.state?.endDate || null
  );
  const [targetLocation, setTargetLocation] = useState<string>("");
  const [balancePoint, setBalancePoint] = useState<number>(0);
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
    fetchBalancePoint();
  }, [fetchBalancePoint]);

  useEffect(() => {
    if (!goalId) return;

    const fetchGoalData = async (): Promise<void> => {
      try {
        const goalData: GoalData = await getTempGoal(goalId);
        setGoalName(goalData.goal.name || "");
        setStartDate(
          goalData.goal.startDate ? new Date(goalData.goal.startDate) : null
        );
        setEndDate(
          goalData.goal.endDate ? new Date(goalData.goal.endDate) : null
        );
        setTargetLocation(goalData.goal.locationName || "");
      } catch (error) {
        console.error("임시 목표 데이터 불러오기 실패:", error);
      }
    };

    fetchGoalData();
  }, [goalId]);

  const handleDateClick = (): void => {
    navigate(paths.goal.date.path);
  };

  const handleEndDateClick = (): void => {
    navigate(paths.goal.date.path, { state: { mode: "end", startDate } });
  };

  const handleSaveWithStatus = async (status: GoalStatus): Promise<void> => {
    if (!userId) return;

    if (status === GoalStatus.ACTIVE) {
      if (!goalName.trim() || !startDate || !endDate || !targetLocation) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
      }
    }

    const goalData: GoalData = {
      goal: {
        userId,
        name: goalName,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        locationName: targetLocation
      },
      status,
      days: selectedDays.map((day) => dayMapping[day])
    };

    try {
      status === GoalStatus.DRAFT
        ? await createTempSaveGoal(goalData)
        : await createGoal(goalData);
      navigate(paths.goal.list.path);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackButtonClick = (): void => {
    navigate(paths.goal.list.path);
  };

  return (
    <div className="p-4">
      <div className="flex items-center border-b pb-2 text-xl font-bold">
        <button onClick={handleBackButtonClick} className="mr-2 text-gray-600">
          &lt;
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
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateClick={handleDateClick}
        onEndDateClick={handleEndDateClick}
      />
      <DayPicker
        selectedDays={selectedDays}
        onToggleDay={(day) =>
          setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
          )
        }
        onSelectAllDays={() =>
          setSelectedDays(
            selectedDays.length === 7 ? [] : Object.keys(dayMapping)
          )
        }
      />

      <div className="mt-4">
        <label className="block text-gray-600">장소 설정</label>
        <input
          type="text"
          className="mt-1 w-full rounded border p-2"
          placeholder="장소를 입력하세요"
        />
      </div>

      <BalanceInfo balancePoint={balancePoint} />

      <SaveButtons
        onTempSave={() => handleSaveWithStatus(GoalStatus.DRAFT)}
        onSave={() => handleSaveWithStatus(GoalStatus.ACTIVE)}
      />
    </div>
  );
};

export default CreateGoal;
