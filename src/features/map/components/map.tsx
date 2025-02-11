import { useEffect, useMemo, useState } from "react";

import Gps from "@/asset/map/gps.svg";
import positionIconUrl from "@/asset/map/position.svg?url";
import { getFormattedDistance } from "@/utils/map";
import { debounce } from "es-toolkit";
import { map } from "es-toolkit/compat";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import MapHeader from "./map-header";
import PlaceList from "./place-list";

function KakaoMap() {
  // state
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  const [keyword, setKeyword] = useState("");
  const [placesData, setPlacesData] = useState([]);

  // function
  const handleSetKeyword = (e, searchInputValue) => {
    const c1 = e.type === "click";
    const c2 = e.type === "keydown" && e.key === "Enter";

    if (!c1 && !c2) return;

    setKeyword(searchInputValue);
  };

  const setCenterToMyPosition = () => setCenter(position);

  const getDistance = (destinationLat, destinationLng) => {
    return getFormattedDistance({
      originLat: center.lat,
      originLng: center.lng,
      destinationLat,
      destinationLng
    });
  };

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
      }
    );

    navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        setPosition({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const places = new kakao.maps.services.Places();

    places.keywordSearch(keyword, (positionInfo, status) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const data = map(positionInfo, ({ place_name, address_name, x, y }) => ({
        place_name,
        address_name,
        lng: Number(x),
        lat: Number(y)
      }));
      setPlacesData(data as any);
    });
  }, [keyword]);

  return (
    <div className="flex size-full h-screen flex-col items-center bg-gray-50 p-4">
      <MapHeader handleSetKeyword={handleSetKeyword} />

      <div className="relative mt-4 h-[70%] w-full max-w-md">
        <Map
          className="size-full"
          id="map"
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
