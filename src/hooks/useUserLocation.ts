import { useEffect, useMemo, useState } from "react";

import { debounce } from "es-toolkit";

const useUserLocation = () => {
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });

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

  return { center, position, setCenterToMyPosition, updateCenterWhenMapMoved };
};

export default useUserLocation;
