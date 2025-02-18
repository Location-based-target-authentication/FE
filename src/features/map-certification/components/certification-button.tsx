import { useMemo } from "react";

import LoadingSpinner from "@/asset/common/loading-spinner.svg?react";

function CertificationButton({
  buttonDisabled,
  isContainRadar,
  isPending,
  mutate
}) {
  const buttonContent = useMemo(() => {
    if (!isPending) return "인증하기";

    return (
      <div role="status">
        <LoadingSpinner />
      </div>
    );
  }, [isPending]);

  return (
    <button
      className={`absolute bottom-4 left-1/2 z-30 flex w-[70%] max-w-md -translate-x-1/2 justify-center rounded-lg p-4 text-lg font-semibold shadow-md ${!isContainRadar ? "cursor-not-allowed bg-gray-300 text-gray-500" : "cursor-pointer bg-green-500 text-white"}`}
      disabled={buttonDisabled}
      onClick={mutate}
    >
      {buttonContent}
    </button>
  );
}

export default CertificationButton;
