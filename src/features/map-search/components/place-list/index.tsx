import type { PlaceData } from "../../types";
import SettingPopover from "./setting-popover";

interface PlaceListProps {
  placesData: PlaceData[];
  getDistance: (lat: number, lng: number) => string;
}

function PlaceList({ placesData, getDistance }: PlaceListProps) {
  return (
    <div className="mt-4 flex h-[30%] w-full max-w-md flex-col gap-3 overflow-x-hidden overflow-y-scroll rounded-lg bg-white p-4 shadow-md">
      {placesData.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center py-10 text-gray-500">
          <p className="text-sm">검색 결과가 없습니다.</p>
          <p className="text-xs text-gray-400">다른 키워드로 검색해보세요!</p>
        </div>
      ) : (
        placesData.map(({ place_name, address_name, lng, lat }) => {
          return (
            <div
              key={`${place_name} ${address_name}`}
              className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
            >
              <div>
                <div className="whitespace-pre-line break-words text-sm font-semibold">
                  {place_name}
                </div>
                <div className="text-xs text-gray-500">{address_name}</div>
                <div className="text-xs text-gray-400">
                  {getDistance(lat, lng)}
                </div>
              </div>
              <SettingPopover lat={lat} lng={lng} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default PlaceList;
