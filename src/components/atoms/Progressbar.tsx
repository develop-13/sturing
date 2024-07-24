"use client";

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
