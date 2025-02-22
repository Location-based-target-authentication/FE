interface SaveButtonsProps {
  onTempSave: () => void;
  onSave: () => void;
  isFormValid: boolean;
}

const SaveButtons: React.FC<SaveButtonsProps> = ({
  onTempSave,
  onSave,
  isFormValid
}) => (
  <div className="mt-[20px] flex h-[56px] w-[335px] justify-between">
    <button
      className="flex h-[56px] w-[160px] items-center justify-center rounded-[8px] bg-gray-200 px-4 py-[10px] text-[16px] font-medium leading-[18px] tracking-[-2.5%] text-[#9E9E9E]"
      onClick={onTempSave}
    >
      임시저장
    </button>

    <button
      className={`flex h-[56px] w-[150px] items-center justify-center rounded-[8px] px-4 py-[10px] text-[16px] font-medium leading-[18px] tracking-[-2.5%] ${
        isFormValid ? "bg-[#3CC360] text-white" : "bg-gray-200 text-[#9E9E9E]"
      }`}
      onClick={onSave}
    >
      등록하기
    </button>
  </div>
);

export default SaveButtons;
