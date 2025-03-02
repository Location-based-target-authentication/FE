import { useMemo } from "react";

import containTargetUrl from "@/asset/map/contain-target.svg?url";
import Gps from "@/asset/map/gps.svg?react";
import notContainTargetUrl from "@/asset/map/not-contain-target.svg?url";
import positionIconUrl from "@/asset/map/position.svg?url";
import { getDistance } from "@/utils/map";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { join, map, replace } from "es-toolkit/compat";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";
import { useLocation, useNavigate } from "react-router";

import { useUserStore } from "@/stores/user";
import {
  generate_qo_getGoals,
  generate_qo_getGoalsCheck,
  generate_qo_getGoalsComplete,
  generate_qo_postGoalsAchieve
} from "@/lib/react-query/queryOptions/goals";
import { generate_qo_getGoals as generate_qo_home } from "@/lib/react-query/queryOptions/home.ts";
import useUserLocation from "@/hooks/useUserLocation";
import CertificationButton from "./certification-button";
import GoalsInfo from "./goals-info";
import {
  DAYS_STRING_MAP,
  generateInitialGoalsData
} from "./map-certification.const";

const DISTANCE_DIFFRENCE = 20;

function MapCertification() {
  // Hooks
  const { addPoint } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const client = useQueryClient();
  const { userId, goalId } = location.state || {};

  const { center, position, setCenterToMyPosition, updateCenterWhenMapMoved } =
    useUserLocation();
  const {
    data: {
      goalName: name,
      startDate,
      endDate,
      dayOfWeek: days,
      latitude: serverLatitude,
      longitude: serverLongitude
    } = generateInitialGoalsData()
  } = useQuery(generate_qo_getGoals(userId));

  const { mutate, isPending } = useMutation({
    ...generate_qo_postGoalsAchieve({
      goalId,
      userId,
      latitude: position.lat,
      longitude: position.lng
    }),
    onSuccess: (data) => {
      const progressGoalKey = generate_qo_getGoalsCheck.DELETE_KEY(userId);
      const completeGoalKey = generate_qo_getGoalsComplete.DELETE_KEY(userId);
      const homeKey = generate_qo_home.DELETE_KEY(userId);

      Promise.all([
        client.invalidateQueries({ queryKey: progressGoalKey }),
        client.invalidateQueries({ queryKey: completeGoalKey }),
        client.invalidateQueries({ queryKey: homeKey })
      ]);

      addPoint(data.point);
      navigate("/map/certification/success", {
        state: { name, point: data.point }
      });
    }
  });

  // useMemos
  const isContainRadar = useMemo(() => {
    if (!serverLatitude || !serverLongitude) return false;

    const distance =
      getDistance({
        originLat: position.lat,
        originLng: position.lng,
        destinationLat: serverLatitude,
        destinationLng: serverLongitude
      }) * 1000;

    const floorDistance = Math.floor(distance);
    return floorDistance <= DISTANCE_DIFFRENCE;
  }, [serverLatitude, serverLongitude, position]);

  const dayString = useMemo(() => {
    const daysArr = days.split(",");
    const transformDays = map(daysArr, (day) => DAYS_STRING_MAP.get(day));
    const day = daysArr.length === 7 ? "매일" : join(transformDays, ", ");

    return day;
  }, [days]);

  const timeString = useMemo(() => {
    const replacedStartDate = replace(startDate, /-/g, ". ");
    const replacedEndDate = replace(endDate, /-/g, ". ");

    return `${replacedStartDate} ~ ${replacedEndDate}`;
  }, [startDate, endDate]);

  const buttonDisabled = useMemo(
    () => !isContainRadar || isPending,
    [isContainRadar, isPending]
  );

  return (
    <div className="content-height relative flex w-full flex-col items-center bg-gray-50">
      <GoalsInfo name={name} timeString={timeString} dayString={dayString} />

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
            image={{ src: positionIconUrl, size: { width: 16, height: 16 } }}
            position={position}
          />
          <MapMarker
            image={{
              src: isContainRadar ? containTargetUrl : notContainTargetUrl,
              size: { width: 24, height: 24 }
            }}
            position={{ lat: serverLatitude, lng: serverLongitude }}
          />
        </Map>
        <button
          className="absolute bottom-32 left-4 z-10 flex size-[40px] cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
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
