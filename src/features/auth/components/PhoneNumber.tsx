import { useState } from "react";

import { postPhoneNumber } from "@/features/auth/api/auth";
import { useNavigate } from "react-router";

import { paths } from "@/config/paths";

const PhoneNumber = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPhoneNumber(input);
    setIsButtonEnabled(input.length === 8);
  };

  const handleSubmit = async () => {
    try {
      const response = await postPhoneNumber({
        data: { phoneNumber }
      });

      if (response.data.success) {
        navigate(paths.home.path);
      } else {
        throw new Error("약관 동의에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-6 p-4">
      <div className="mt-[24px]">
        <h2 className="font-[Pretendard] text-[20px] font-medium leading-[24px] tracking-[-2.5%] text-gray-800">
          리워드 전달을 위해
        </h2>
        <h2 className="inline font-[Pretendard] text-[24px] font-semibold leading-[28.8px] tracking-[-2.5%] text-gray-800">
          휴대폰 번호
        </h2>
        <h2 className="inline font-[Pretendard] text-[20px] font-medium leading-[24px] tracking-[-2.5%] text-gray-800">
          를 입력해주세요.
        </h2>
      </div>

      <div className="mt-[213px] flex items-center gap-[10px]">
        <span className="h-[26px] w-[40px] font-[Pretendard] text-[24px] font-medium leading-[26px] tracking-[-2.5%] text-gray-700">
          010
        </span>
        <input
          type="tel"
          maxLength={11}
          placeholder="숫자만 입력"
          inputMode="numeric"
          className="h-[44px] w-[285px] border-0 border-b border-b-[#BDBDBD] text-center focus:outline-none"
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-[10px]">
        <button
          onClick={handleSubmit}
          disabled={!isButtonEnabled}
          className={`h-[56px] w-[335px] justify-between rounded-[8px] p-[10px] text-lg font-semibold text-white ${
            isButtonEnabled
              ? "bg-[#3CC360] text-white"
              : "bg-[#E0E0E0] text-gray-400"
          }`}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default PhoneNumber;
