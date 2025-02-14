import { useEffect, useRef } from "react";

import { Nullable } from "@/types/common";
import { Places, Status } from "@/types/kakao";

const useKakaoPlaces = () => {
  const placesServiceRef = useRef<Nullable<Places>>(null);
  const statusRef = useRef<Nullable<Status>>(null);

  useEffect(() => {
    const { Places, Status } = window.kakao.maps.services;
    placesServiceRef.current = new Places();
    statusRef.current = Status;
  }, []);

  return { placesService: placesServiceRef.current, status: statusRef.current };
};

export default useKakaoPlaces;
