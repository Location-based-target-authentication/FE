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

const ArrowLeft = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

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
  const [positionInfo, setPositionInfo] = useState([]);

  const goBack = () => navigate(-1);

  const handleReturnToFormPage = async (location) => {
    if (!location) {
      toast.error("위치 선택을 다시해주세요.");
      return;
    }

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
    <div className="flex size-full h-screen flex-col items-center bg-gray-50 p-4">
      {/* 입력창 + 뒤로가기 버튼 */}
      <div className="relative flex w-full max-w-md items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
        <button onClick={goBack} className="flex items-center justify-center">
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </button>
        <input
          onChange={(e) => setSearchInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          value={searchInputValue}
          placeholder="목표 위치를 설정해주세요."
          className="flex-1 bg-transparent text-sm outline-none"
        />
        <button
          onClick={() => setKeyword(searchInputValue)}
          className="text-gray-600"
        >
          검색
        </button>
      </div>

      {/* 지도 */}
      <div className="relative mt-4 h-[70%] w-full max-w-md">
        <Map
          style={{ width: "100%", height: "100%" }}
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
          <Gps className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* 리스트 */}
      <div className="mt-4 h-[30%] w-full max-w-md overflow-x-hidden overflow-y-scroll rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-col gap-3">
          {positionInfo.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-gray-500">
              <p className="text-sm">검색 결과가 없습니다.</p>
              <p className="text-xs text-gray-400">
                다른 키워드로 검색해보세요!
              </p>
            </div>
          ) : (
            positionInfo.map(({ place_name, address_name, lng, lat }) => {
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
                      {formatDistance(
                        getDistance(center.lat, center.lng, lat, lng)
                      )}
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger className="max-w-[100px] truncate rounded-full border border-green-500 px-3 py-1 text-xs text-green-500">
                      목표 설정
                    </PopoverTrigger>
                    <PopoverContent className="w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                      <div className="flex flex-col items-center space-y-4">
                        <h4 className="text-center text-sm font-semibold text-gray-800">
                          해당 위치로 설정하시겠습니까?
                        </h4>
                        <button
                          onClick={() => handleReturnToFormPage({ lat, lng })}
                          className="w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-green-600"
                        >
                          확인
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default KakaoMap;
