import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { paths } from "@/config/paths";

interface SettingPopoverProps {
  lat: number;
  lng: number;
  placeName: string;
}

function SettingPopover({ lat, lng, placeName }: SettingPopoverProps) {
  const navigate = useNavigate();

  const handleReturnToFormPage = async (
    position: {
      lat: number;
      lng: number;
    },
    placeName: string
  ) => {
    if (!position || !placeName) {
      toast.error("위치 선택을 다시해주세요.");
      return;
    }

    return navigate(paths.goal.create.getHref(), {
      state: { position, placeName }
    });
  };

  return (
    <Popover>
      <PopoverTrigger
        className="max-w-[80px] truncate rounded-md border border-green-500 px-2 py-[2px] text-[10px] text-green-500"
        onClick={(e) => e.stopPropagation()}
      >
        목표 설정
      </PopoverTrigger>
      <PopoverContent className="w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <h4 className="text-center text-sm font-semibold text-gray-800">
            해당 위치로 설정하시겠습니까?
          </h4>
          <button
            onClick={() => handleReturnToFormPage({ lat, lng }, placeName)}
            className="w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-green-600"
          >
            확인
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SettingPopover;
