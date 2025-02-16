interface DistanceParams {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
}

export const toRadians = (degrees: number) => degrees * (Math.PI / 180);

export const getDistance = ({
  originLat,
  originLng,
  destinationLat,
  destinationLng
}: DistanceParams) => {
  const EARTH_RADIUS_KM = 6371;
  const deltaLat = toRadians(destinationLat - originLat);
  const deltaLng = toRadians(destinationLng - originLng);

  const sinDeltaLat = Math.sin(deltaLat / 2);
  const sinDeltaLng = Math.sin(deltaLng / 2);
  const cosOriginLat = Math.cos(toRadians(originLat));
  const cosDestLat = Math.cos(toRadians(destinationLat));

  const a =
    Math.pow(sinDeltaLat, 2) +
    cosOriginLat * cosDestLat * Math.pow(sinDeltaLng, 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = EARTH_RADIUS_KM * centralAngle;

  return distanceKm;
};

export const formatDistance = (km: number) => {
  if (km >= 10) return `${Math.round(km)}km`;
  else if (km >= 1) return `${km.toFixed(1)}km`;
  else return `${Math.round(km * 1000)}m`;
};

export const getFormattedDistance = ({
  originLat,
  originLng,
  destinationLat,
  destinationLng
}: DistanceParams) => {
  return formatDistance(
    getDistance({
      originLat,
      originLng,
      destinationLat,
      destinationLng
    })
  );
};
