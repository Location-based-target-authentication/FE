import { useCallback, useEffect, useState } from "react";

import Gps from "@/asset/map/gps.svg?react";
import positionIconUrl from "@/asset/map/position.svg?url";
import { getFormattedDistance } from "@/utils/map";
import { map } from "es-toolkit/compat";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import useKakaoPlaces from "@/hooks/useKakaoMapService";
import useUserLocation from "@/hooks/useUserLocation";
import type { PlaceData } from "../types";
import MapHeader from "./map-header";
import PlaceList from "./place-list";

function KakaoMap() {
  // Hooks
  const { placesService, status: serviceStatus } = useKakaoPlaces();
  const { center, position, setCenterToMyPosition, updateCenterWhenMapMoved } =
    useUserLocation();

  // state
  const [keyword, setKeyword] = useState("");
  const [placesData, setPlacesData] = useState<PlaceData[]>([]);

  // function
  const handleSetKeyword = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    searchInputValue: string
  ) => {
    const c1 = e.type === "click";
    const c2 = e.type === "keydown" && "key" in e && e.key === "Enter";

    if (!c1 && !c2) return;

    setKeyword(searchInputValue);
  };

  const getDistance = useCallback(
    (destinationLat: number, destinationLng: number) => {
      return getFormattedDistance({
        originLat: center.lat,
        originLng: center.lng,
        destinationLat,
        destinationLng
      });
    },
    [center.lat, center.lng]
  );

  // effect
  useEffect(() => {
    if (!placesService || !serviceStatus) return;

    placesService.keywordSearch(keyword, (positionInfo, status) => {
      if (status !== serviceStatus.OK) return;

      const data = map(positionInfo, ({ place_name, address_name, x, y }) => ({
        place_name,
        address_name,
        lng: Number(x),
        lat: Number(y)
      }));
      setPlacesData(data);
    });
  }, [keyword, placesService, serviceStatus]);

  return (
    <div className="flex size-full h-screen flex-col items-center bg-gray-50 p-4">
      <MapHeader handleSetKeyword={handleSetKeyword} />

      <div className="relative mt-4 h-[70%] w-full">
        <Map
          className="size-full"
          center={center}
          level={4}
          onCenterChanged={updateCenterWhenMapMoved}
        >
          <MapMarker
            image={{ src: positionIconUrl, size: { width: 30, height: 30 } }}
            position={position}
          />
        </Map>
        <button
          className="absolute bottom-4 right-4 z-10 flex size-[40px] items-center justify-center rounded-full bg-white shadow-md"
          onClick={setCenterToMyPosition}
        >
          <Gps />
        </button>
      </div>

      <PlaceList placesData={placesData} getDistance={getDistance} />
    </div>
  );
}

export default KakaoMap;
