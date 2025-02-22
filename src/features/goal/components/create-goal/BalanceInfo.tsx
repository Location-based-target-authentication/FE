interface BalanceInfoProps {
  balancePoint: number;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balancePoint }) => (
  <div className="relative mt-[20px] flex h-[51px] w-[335px] flex-col gap-[19px]">
    <div className="flex h-[18px] w-full items-center justify-between text-[16px] font-normal leading-[18px] tracking-[-2.5%] text-gray-900">
      <span>차감 포인트:</span>
      <span className="flex items-center gap-1">
        <span className="h-[18px] w-[31px] text-[16px] font-bold leading-[18px] tracking-[-2.5%] text-gray-900">
          200
        </span>
        <span className="ml-[2px] h-[18px] w-[10px] text-[16px] leading-[18px] tracking-[-2.5%] text-gray-900">
          p
        </span>
      </span>
    </div>
    <div className="ml-auto mt-0 flex items-center text-gray-400">
      <span className="text-[12px] font-normal leading-[14px] tracking-[-2.5%]">
        보유 포인트
      </span>
      <div className="flex items-end gap-1">
        <span className="w-[30px] text-right text-[12px] font-semibold leading-[14px] tracking-[-2.5%]">
          {balancePoint}
        </span>
        <span className="w-[6px] text-right text-[10px] font-normal leading-[12px] tracking-[-2.5%]">
          p
        </span>
      </div>
    </div>
  </div>
);

export default BalanceInfo;
