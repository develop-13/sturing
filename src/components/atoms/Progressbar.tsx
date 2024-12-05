function Progressbar({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) {
  return (
    <div className="flex h-[4px] mx-[-16px]">
      {Array(totalPage)
        .fill(null)
        .map((_, idx) =>
          idx <= currentPage ? (
            <div key={idx} className="flex-1 h-full bg-subColor"></div>
          ) : (
            <div key={idx} className="flex-1 h-full bg-gray-200"></div>
          )
        )}
    </div>
  );
}

export default Progressbar;

export function PercentageBar({ percentage }: { percentage: number }) {
  console.log(`percentage=${percentage}`);

  return (
    <div className="relative h-2 bg-gray-200 rounded-full">
      <div className="absolute right-1 bottom-3">{percentage}%</div>
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
