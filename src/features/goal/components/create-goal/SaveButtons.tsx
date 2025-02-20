interface SaveButtonsProps {
  onTempSave: () => void;
  onSave: () => void;
}

const SaveButtons: React.FC<SaveButtonsProps> = ({ onTempSave, onSave }) => (
  <div className="mt-4 flex space-x-2">
    <button className="rounded bg-gray-200 px-4 py-2" onClick={onTempSave}>
      임시 저장
    </button>
    <button
      className="rounded bg-blue-500 px-4 py-2 text-white"
      onClick={onSave}
    >
      등록하기
    </button>
  </div>
);

export default SaveButtons;
