const LocationSelector = ({ location, setLocation }) => {
  return (
    <div>
      <label className="font-semibold">
        장소 설정{location},{setLocation}
      </label>
      <div className="mt-2 rounded border bg-gray-100 p-2">
        📍 지도 (추후 추가)
      </div>
    </div>
  );
};

export default LocationSelector;
