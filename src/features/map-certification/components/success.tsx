import successPng from "@/asset/common/certification.svg?url";
import { useLocation, useNavigate } from "react-router";

import { paths } from "@/config/paths";

function MapCertificationSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { name, point }
  } = location;

  const navigateToHome = () => {
    const homePath = paths.home;

    navigate(homePath.getHref());
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f7f5] p-4">
      <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-bold">축하해요!</h1>
        <p className="text-2xl font-medium text-[#4CAF50]">{`"${name}"`}</p>
        <div className="text-center">
          <p className="text-2xl font-medium leading-relaxed">
            목표를 완료해서 <span className="text-[#4CAF50]">{point}</span>를
          </p>
          <p className="text-xl font-medium">획득했어요!</p>
        </div>

        <div className="relative size-48">
          <img
            src={successPng}
            alt="celebration"
            className="size-full object-contain"
          />
        </div>
      </div>

      <div className="w-full bg-[#f5f7f5] p-4">
        <button
          className="mx-auto block w-full max-w-md flex-1 rounded-lg bg-[#4CAF50] py-4 text-lg font-medium text-white"
          onClick={navigateToHome}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default MapCertificationSuccess;
