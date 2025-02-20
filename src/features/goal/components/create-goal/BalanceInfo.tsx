interface BalanceInfoProps {
  balancePoint: number;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balancePoint }) => (
  <div className="mt-4">
    <div>
      차감 포인트: <span className="font-bold">200p</span>
    </div>
    <div>
      보유 포인트: <span className="font-bold">{balancePoint}P</span>
    </div>
  </div>
);

export default BalanceInfo;
