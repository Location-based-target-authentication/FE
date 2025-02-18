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
import CertificationButton from "./certification-button";
import GoalsInfo from "./goals-info";
import { generateInitialGoalsData } from "./map-certification.const";

const DISTANCE_DIFFRENCE = 20;

function MapCertification() {
  const navigate = useNavigate();
  const {
    data: {
      title,
      position: serverPosition,
      time,
      day
    } = generateInitialGoalsData()
  } = useQuery(generate_qo_getGoals(1));

  const { mutate, isPending } = useMutation({
    ...generate_qo_postGoalsAchieve(1),
    onSuccess: () => {
      /** @todo 홈 페이지에 사용도되는 데이터 쿼리 무효화 필요 */

      navigate("/map/certification/success", { state: { title } });
    }
  });

  // states
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });

  // useMemos
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
      <GoalsInfo title={title} timeString={timeString} dayString={dayString} />

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

      <CertificationButton
        buttonDisabled={buttonDisabled}
        isContainRadar={isContainRadar}
        isPending={isPending}
        mutate={mutate}
      />
    </div>
  );
}

export default MapCertification;
