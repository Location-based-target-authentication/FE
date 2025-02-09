import { useEffect, useMemo, useState } from "react";

import Gps from "@/asset/map/gps.svg";
import positionIconUrl from "@/asset/map/position.svg?url";
import { debounce } from "es-toolkit";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function KakaoMap() {
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

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
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });

    navigator.geolocation.watchPosition((pos) => {
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  return (
    <div className="flex size-full justify-center">
      <div
        className="relative"
        style={{
          width: "50%",
          height: "100vh"
        }}
      >
        <Map
          style={{
            width: "100%",
            height: "100%"
          }}
          id="map"
          center={center}
          level={4}
          onCenterChanged={updateCenterWhenMapMoved}
        >
          <MapMarker
            image={{
              src: positionIconUrl,
              size: { width: 30, height: 30 }
            }}
            position={position}
          />
        </Map>
        <button
          className="absolute bottom-4 right-4 z-10 flex size-[35px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_0_8px_#00000025]"
          onClick={setCenterToMyPosition}
        >
          <Gps />
        </button>
      </div>
    </div>
  );
}

export default KakaoMap;
