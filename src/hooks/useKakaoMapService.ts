import { useEffect, useRef } from "react";

const useKakaoPlaces = () => {
  const placesServiceRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const { Places, Status } = window.kakao.maps.services;
    placesServiceRef.current = new Places();
    statusRef.current = Status;
  }, []);

  return { placesService: placesServiceRef.current, status: statusRef.current };
};

export default useKakaoPlaces;
