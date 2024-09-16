export default function ProgressBar({
  value,
  total,
}: {
  value: number;
  total: number;
}) {
  const progress = value;
  const widthPercentage = Math.floor((progress / total) * 100);
  return (
    <div className="bg-[#F4F4F4]">
      <div
        className="bg-elixir-6 pt-[10px]"
        style={{ width: `${widthPercentage}%` }}
      ></div>
    </div>
  );
}
