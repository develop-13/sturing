"use client";

function RegionItem({
  selectedRegion,
  region,
  onRegionSelect,
}: {
  selectedRegion: string;
  region: string;
  onRegionSelect: () => void;
}) {
  return (
    <li
      key={region}
      className={`px-[10px] py-[14px] text-center text-[14px] font-medium cursor-pointer ${
        selectedRegion === region
          ? "font-bold text-white bg-mainColor"
          : "text-[#909090]"
      }`}
      onClick={onRegionSelect}
    >
      {region}
    </li>
  );
}

export default RegionItem;
