import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { useEffect, useMemo, useState } from "react";

import Gps from "@/asset/map/gps.svg";
import positionIconUrl from "@/asset/map/position.svg?url";
import { debounce } from "es-toolkit";
import { map } from "es-toolkit/compat";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function KakaoMap() {
  const navigate = useNavigate();

  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  const [searchInputValue, setSearchInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [positionInfo, setPositionInfo] = useState([
    {
      place_name: "",
      address_name: "",
      lng: 0,
      lat: 0
    }
  ]);

  const handleReturnToFormPage = async (location) => {
    if (!location) {
      toast.error("위치 선택을 다시해주세요.");
      return;
    }

    console.log(location);
    navigate("/", {
      state: {
        location
      }
    });
  };

  const setCenterToMyPosition = () => setCenter(position);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") setKeyword(searchInputValue);
  };

  const getDistance = (lat1, lng1, lat2, lng2) => {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  function formatDistance(km) {
    return km >= 10 ? `${Math.round(km)}km` : `${km.toFixed(1)}km`;
  }

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

  useEffect(() => {
    const places = new kakao.maps.services.Places();

    places.keywordSearch(keyword, (positionInfo, status) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const positionInfosData = map(
        positionInfo,
        ({ place_name, address_name, x, y }) => ({
          place_name,
          address_name,
          lng: Number(x),
          lat: Number(y)
        })
      );
      setPositionInfo(positionInfosData);
    });
  }, [keyword]);

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
      <input
        onChange={(e) => setSearchInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
        value={searchInputValue}
        placeholder={"주소를 입력해주세요 ex)강남역 or 서울특별시 역삼동"}
      />
      <button onClick={() => setKeyword(searchInputValue)}>검색</button>
      <div className="flex flex-col gap-2">
        {map(positionInfo, ({ place_name, address_name, lng, lat }) => (
          <div
            key={`${place_name} ${address_name}`}
            className="rounded-lg bg-gray-100 p-4 shadow-md"
          >
            <div className="flex justify-between">
              <div>
                <div>{place_name}</div>
                <div>{address_name}</div>
                <div>
                  {formatDistance(
                    getDistance(center.lat, center.lng, lat, lng)
                  )}
                </div>
              </div>
              <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        해당 위치로 설정하시겠습니까?
                      </h4>
                      <button
                        onClick={() => handleReturnToFormPage({ lat, lng })}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KakaoMap;
