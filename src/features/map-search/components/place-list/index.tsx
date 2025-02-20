import { useState } from "react";

import ArrwoDown from "@/asset/common/arrow-down.svg?react";
import ArrowUp from "@/asset/common/arrow-up.svg?react";

import type { PlaceData } from "../../types";
import SettingPopover from "./setting-popover";

interface PlaceListProps {
  placesData: PlaceData[];
  getDistance: (lat: number, lng: number) => string;
  setSelectedPosition: ({ lat, lng }: { lat: number; lng: number }) => void;
}

function PlaceList({
  placesData,
  getDistance,
  setSelectedPosition
}: PlaceListProps) {
  const [isVisibleAddressName, setIsVisibleAddressName] = useState<boolean[]>(
    () => new Array(placesData.length).fill(false)
  );

  const toggleAddressVisibility = (idx: number) => () => {
    setIsVisibleAddressName((prev) => {
      const newState = new Array(placesData.length).fill(false);
      newState[idx] = !prev[idx];
      return newState;
    });
  };

  return (
    <div className="mt-4 flex h-[30%] w-full flex-col gap-3 overflow-x-hidden overflow-y-scroll rounded-lg bg-white p-4 shadow-md">
      {placesData.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-10 text-gray-500">
          <p className="text-sm">검색 결과가 없습니다.</p>
          <p className="text-xs text-gray-400">다른 키워드로 검색해보세요!</p>
        </div>
      ) : (
        placesData.map(
          ({ placeName, addressName, roadAddressName, lng, lat }, idx) => {
            return (
              <div
                key={`${placeName} ${roadAddressName}`}
                className="flex cursor-pointer items-center justify-between rounded-lg border p-3 shadow-sm"
                onClick={() => {
                  setSelectedPosition({ lat, lng });
                }}
              >
                <div>
                  <div className="mb-1 whitespace-pre-line break-words text-sm font-semibold">
                    {placeName}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-black-400 text-xs">
                      {getDistance(lat, lng)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {roadAddressName}
                    </div>
                    <div
                      className="relative cursor-pointer"
                      onClick={toggleAddressVisibility(idx)}
                    >
                      {isVisibleAddressName[idx] ? <ArrowUp /> : <ArrwoDown />}
                      {isVisibleAddressName[idx] && (
                        <div className="absolute left-0 top-full z-10 mt-1 whitespace-nowrap rounded-lg bg-green-100 p-3 shadow-lg">
                          <div className="text-xs text-gray-500">
                            {addressName}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <SettingPopover lat={lat} lng={lng} />
              </div>
            );
          }
        )
      )}
    </div>
  );
}

export default PlaceList;
