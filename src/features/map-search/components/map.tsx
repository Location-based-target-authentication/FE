import { useCallback, useEffect, useMemo, useState } from "react";

import containTargetUrl from "@/asset/map/contain-target.svg?url";
import Gps from "@/asset/map/gps.svg?react";
import positionIconUrl from "@/asset/map/position.svg?url";
import { getFormattedDistance } from "@/utils/map";
import { debounce } from "es-toolkit";
import { map } from "es-toolkit/compat";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import useKakaoPlaces from "@/hooks/useKakaoMapService";
import type { PlaceData } from "../types";
import MapHeader from "./map-header";
import PlaceList from "./place-list";

function KakaoMap() {
  // Hooks
  const { placesService, status: serviceStatus } = useKakaoPlaces();

  // state
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const [selectedPosition, setSelectedPosition] = useState({ lat: 0, lng: 0 });

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

  const setCenterToMyPosition = () => setCenter(position);

  const getDistance = useCallback(
    (destinationLat: number, destinationLng: number) => {
      return getFormattedDistance({
        originLat: position.lat,
        originLng: position.lng,
        destinationLat,
        destinationLng
      });
    },
    [position.lat, position.lng]
  );

  const updateCenterWhenMapMoved = useMemo(
    () =>
      debounce((map: kakao.maps.Map) => {
        setCenter({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng()
        });
      }, 500),
    []
  );

  const memoizedSelectedMarker = useMemo(() => {
    const { lat, lng } = selectedPosition;

    if (lat === 0 && lng === 0) return null;

    return (
      <MapMarker
        image={{ src: containTargetUrl, size: { width: 24, height: 24 } }}
        position={{ lat, lng }}
      />
    );
  }, [selectedPosition]);

  const moveToSelectedPosition = ({
    lat,
    lng
  }: {
    lat: number;
    lng: number;
  }) => {
    setSelectedPosition({ lat, lng });
    setCenter({ lat, lng });
  };

  // effect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenter({ lat: latitude, lng: longitude });
      }
    );

    const watchId = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        setPosition({ lat: latitude, lng: longitude });
      }
    );
    return () => {
      if (!watchId) return;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!placesService || !serviceStatus) return;

    placesService.keywordSearch(keyword, (positionInfo, status) => {
      if (status !== serviceStatus.OK) return;

      const data = map(
        positionInfo,
        ({ place_name, address_name, road_address_name, x, y }) => ({
          placeName: place_name,
          addressName: address_name,
          roadAddressName: road_address_name,
          lng: Number(x),
          lat: Number(y)
        })
      );
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
            image={{ src: positionIconUrl, size: { width: 18, height: 18 } }}
            position={position}
          />
          {memoizedSelectedMarker}
        </Map>
        <button
          className="absolute bottom-4 right-4 z-10 flex size-[40px] items-center justify-center rounded-full bg-white shadow-md"
          onClick={setCenterToMyPosition}
        >
          <Gps />
        </button>
      </div>

      <PlaceList
        placesData={placesData}
        getDistance={getDistance}
        moveToSelectedPosition={moveToSelectedPosition}
      />
    </div>
  );
}

export default KakaoMap;
