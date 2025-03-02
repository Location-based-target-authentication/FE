import { useState } from "react";

import CheckedAllIcon from "@/asset/agreement/checked-all.svg?url";
import CheckedItemIcon from "@/asset/agreement/checked-item.svg?url";
import UncheckedAllIcon from "@/asset/agreement/unchecked-all.svg?url";
import UncheckedItemIcon from "@/asset/agreement/unchecked-item.svg?url";
import { postTermsAgree } from "@/features/auth/api/auth";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

const AgreementCheckbox = ({
  checked,
  onChange,
  CheckedIcon,
  UncheckedIcon
}) => {
  return (
    <div
      onClick={onChange}
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      <img
        src={checked ? CheckedIcon : UncheckedIcon}
        alt="Checkbox Icon"
        width={28}
        height={28}
      />
    </div>
  );
};

const Agreement = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);

  const [checkState, setCheckState] = useState({
    all: false,
    terms: false,
    privacy: false
  });

  const handleAllCheck = () => {
    setCheckState((prev) => {
      const newChecked = !prev.all;
      return {
        all: newChecked,
        terms: newChecked,
        privacy: newChecked
      };
    });
  };
  const handleSingleCheck = (key: "terms" | "privacy") => {
    setCheckState((prev) => {
      const newState = {
        ...prev,
        [key]: !prev[key]
      };

      newState.all = newState.terms && newState.privacy;

      return newState;
    });
  };

  const handleSubmit = async () => {
    if (!userId) return;

    try {
      const response = await postTermsAgree({
        data: { userId }
      });

      if (response.data.success) {
        navigate(paths.auth.phoneNumber.path);
      } else {
        throw new Error("약관 동의에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ml-[20px] mt-[50px] flex h-auto min-h-screen w-[335px] flex-col pb-[74px]">
      <h1 className="mb-[40px] h-[58px] w-[335px] text-[24px] font-semibold leading-[28.8px] -tracking-wide text-gray-900">
        <span className="text-[#3CC360]">윌고</span> 서비스 이용을 위한 <br />
        약관에 동의해주세요
      </h1>

      <div className="flex h-auto w-[335px] flex-col">
        <div className="flex h-[58px] items-center gap-[6px]">
          <AgreementCheckbox
            checked={checkState.all}
            onChange={handleAllCheck}
            CheckedIcon={CheckedAllIcon}
            UncheckedIcon={UncheckedAllIcon}
          />
          <label className="font-pretendard h-[20px] w-[96px] text-[18px] font-medium leading-[20px] -tracking-wide">
            전체 동의하기
          </label>
        </div>

        <hr className="mb-6 border-gray-300" />

        <div className="flex h-auto w-[335px] flex-col gap-[6px]">
          <div className="flex h-[28px] items-center justify-between gap-[6px]">
            <div className="flex items-center gap-[6px]">
              <AgreementCheckbox
                checked={checkState.terms}
                onChange={() => handleSingleCheck("terms")}
                CheckedIcon={CheckedItemIcon}
                UncheckedIcon={UncheckedItemIcon}
              />
              <span className="text-[14px] font-medium text-[#3CC360]">
                [필수]
              </span>
              <label className="text-[14px] font-medium text-gray-700">
                사용자 이용약관
              </label>
            </div>

            <button
              className="font-pretendard h-[14px] w-[41px] text-right text-[12px] font-normal leading-[14px] -tracking-wide text-gray-600 underline decoration-solid"
              onClick={() => window.open("약관 URL", "_blank")}
            >
              전체보기
            </button>
          </div>

          <div className="flex h-[28px] items-center justify-between gap-[6px]">
            <div className="flex items-center gap-[6px]">
              <AgreementCheckbox
                checked={checkState.privacy}
                onChange={() => handleSingleCheck("privacy")}
                CheckedIcon={CheckedItemIcon}
                UncheckedIcon={UncheckedItemIcon}
              />
              <span className="text-[14px] font-medium text-[#3CC360]">
                [필수]
              </span>
              <label className="text-[14px] font-medium text-gray-700">
                개인정보 처리방침
              </label>
            </div>

            <button
              className="font-pretendard h-[14px] w-[41px] text-right text-[12px] font-normal leading-[14px] -tracking-wide text-gray-600 underline decoration-solid"
              onClick={() => window.open("약관 URL", "_blank")}
            >
              전체보기
            </button>
          </div>
        </div>
      </div>

      <button
        disabled={!checkState.all}
        onClick={handleSubmit}
        className={`fixed bottom-6 ml-[20px] flex h-[56px] w-[335px] items-center justify-center rounded-[8px] py-[10px] text-[16px] font-semibold leading-[20px] ${
          !checkState.all
            ? "cursor-pointer bg-[#3CC360] text-white"
            : "cursor-not-allowed bg-gray-300 text-gray-500"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Agreement;
