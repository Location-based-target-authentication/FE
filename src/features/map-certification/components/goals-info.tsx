import MapPin from "@/asset/map/map-pin.svg?react";

interface GoalsInfoProps {
  name: string;
  timeString: string;
  dayString: string;
}

function GoalsInfo({ name, timeString, dayString }: GoalsInfoProps) {
  return (
    <div className="absolute left-1/2 top-0 z-20 mx-auto mt-4 w-full max-w-md -translate-x-1/2 rounded-xl border border-gray-200 bg-green-50 p-3 shadow-lg">
      <div className="relative flex items-center justify-between gap-4 p-3">
        <div>
          <p className="mb-3 text-xl text-green-700">{name}</p>
          <p className="mb-1 flex items-center text-sm">
            <span className="mr-1.5 text-gray-400">목표기간</span>
            <span className="text-black">{timeString}</span>
          </p>

          <p className="flex items-center text-sm">
            <span className="mr-1.5 text-gray-400">반복요일</span>
            <span className="text-black">{dayString}</span>
          </p>
        </div>
        <MapPin />
      </div>
    </div>
  );
}

export default GoalsInfo;
