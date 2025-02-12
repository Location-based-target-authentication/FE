import { ArrowLeft } from "@/components/ui/arrow-left";

import { useState } from "react";

import { useNavigate } from "react-router";

interface MapHeaderProps {
  handleSetKeyword: (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    searchInputValue: string
  ) => void;
}

function MapHeader({ handleSetKeyword }: MapHeaderProps) {
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState("");

  const goBack = async () => navigate(-1);

  return (
    <div className="relative flex w-full max-w-md items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
      <button onClick={goBack} className="flex items-center justify-center">
        <ArrowLeft className="size-5 text-gray-500" />
      </button>
      <input
        onChange={(e) => setSearchInputValue(e.target.value)}
        onKeyDown={(e) => handleSetKeyword(e, searchInputValue)}
        value={searchInputValue}
        placeholder="목표 위치를 설정해주세요."
        className="flex-1 bg-transparent text-sm outline-none"
      />
      <button
        onClick={(e) => handleSetKeyword(e, searchInputValue)}
        className="text-gray-600"
      >
        검색
      </button>
    </div>
  );
}

export default MapHeader;
