import { useEffect, useMemo, useState } from "react";

import containTargetUrl from "@/asset/map/contain-target.svg?url";
import Gps from "@/asset/map/gps.svg?react";
import notContainTargetUrl from "@/asset/map/not-contain-target.svg?url";
import positionIconUrl from "@/asset/map/position.svg?url";
import { getDistance } from "@/utils/map";
import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce } from "es-toolkit";
import { join } from "es-toolkit/compat";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router";

import {
  generate_qo_getGoals,
  generate_qo_postGoalsAchieve
} from "@/lib/react-query/queryOptions/max";

const DISTANCE_DIFFRENCE = 20;

function MapCertification() {
  const navigate = useNavigate();
  // Hooks
  const {
    data: { title, position: serverPosition, time, day } = {
      title: "",
      position: { lat: 33.450701, lng: 126.570667 },
      time: ["", ""],
      day: [""]
    }
  } = useQuery(generate_qo_getGoals(1));

  const { mutateAsync, isPending } = useMutation({
    ...generate_qo_postGoalsAchieve(1),
    onSuccess: () => {
      /** @todo 홈 페이지에 사용도되는 데이터 쿼리 무효화 필요 */

      navigate("/map/certification/success", { state: { title } });
    }
  });

  // state
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  const isContainRadar = useMemo(() => {
    if (!serverPosition) return 0;

    const distance =
      getDistance({
        originLat: position.lat,
        originLng: position.lng,
        destinationLat: serverPosition.lat,
        destinationLng: serverPosition.lng
      }) * 1000;

    const floorDistance = Math.floor(distance);
    return floorDistance <= DISTANCE_DIFFRENCE;
  }, [serverPosition, position]);

  const dayString = useMemo(() => {
    const days = day.length === 7 ? "매일" : join(day, ", ");

    return `${days} (반복 요일)`;
  }, [day]);

  const timeString = useMemo(
    () => `${time[0]} ~ ${time[1]} (목표기간)`,
    [time]
  );

  const buttonDisabled = useMemo(
    () => !isContainRadar || isPending,
    [isContainRadar, isPending]
  );

  // function

  const setCenterToMyPosition = () => setCenter(position);

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

  // effect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => console.error(error)
    );

    const watchId = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        setPosition({ lat: latitude, lng: longitude });
      },
      (error) => console.error(error)
    );

    return () => {
      if (!watchId) return;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-gray-50">
      <div className="absolute left-1/2 top-0 z-20 mx-auto mt-4 w-full max-w-md -translate-x-1/2 rounded-lg bg-white p-2 shadow-lg">
        <div className="mt-2 rounded-md p-3">
          <p className="mb-2 font-medium">{title}</p>
          <p className="text-sm text-gray-600">{timeString}</p>
          <p className="text-sm text-gray-600">{dayString}</p>
        </div>
      </div>

      <div className="relative size-full">
        <Map
          className="size-full"
          center={center}
          level={1}
          onCenterChanged={updateCenterWhenMapMoved}
        >
          <Circle
            center={{ lat: position.lat, lng: position.lng }}
            radius={DISTANCE_DIFFRENCE}
            strokeWeight={1}
            strokeColor={"#F10000"}
            strokeOpacity={2}
            strokeStyle={"solid"}
            fillColor={"#F10000"}
            fillOpacity={0.1}
          />
          <MapMarker
            image={{ src: positionIconUrl, size: { width: 12, height: 12 } }}
            position={position}
          />
          <MapMarker
            image={{
              src: isContainRadar ? containTargetUrl : notContainTargetUrl,
              size: { width: 12, height: 12 }
            }}
            position={serverPosition}
          />
        </Map>
        <button
          className="absolute bottom-4 right-4 z-10 flex size-[40px] cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
          onClick={setCenterToMyPosition}
        >
          <Gps />
        </button>
      </div>

      <button
        className={`absolute bottom-4 left-1/2 z-30 flex w-[70%] max-w-md -translate-x-1/2 justify-center rounded-lg p-4 text-lg font-semibold shadow-md ${!isContainRadar ? "cursor-not-allowed bg-gray-300 text-gray-500" : "cursor-pointer bg-green-500 text-white"}`}
        disabled={buttonDisabled}
        onClick={() => mutateAsync()}
      >
        {isPending ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="size-7 animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          "인증하기"
        )}
      </button>
    </div>
  );
}

export default MapCertification;
