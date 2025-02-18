function GoalsInfo({ title, timeString, dayString }) {
  return (
    <div className="absolute left-1/2 top-0 z-20 mx-auto mt-4 w-full max-w-md -translate-x-1/2 rounded-lg bg-white p-2 shadow-lg">
      <div className="mt-2 rounded-md p-3">
        <p className="mb-2 font-medium">{title}</p>
        <p className="text-sm text-gray-600">{timeString}</p>
        <p className="text-sm text-gray-600">{dayString}</p>
      </div>
    </div>
  );
}

export default GoalsInfo;
