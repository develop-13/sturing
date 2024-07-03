import CloseBtn from "@/components/common/atoms/CloseBtn";

function SelectedRegionItem({
  subRegion,
  onRemoveSubRegion,
}: {
  subRegion: string;
  onRemoveSubRegion: () => void;
}) {
  return (
    <li
      key={subRegion}
      className="flex items-center text-mainColor font-semibold border border-mainColor bg-[#ECF1FF] gap-2 text-[14px] px-[14px] py-[9px] rounded-lg"
    >
      <span>{subRegion}</span>
      <CloseBtn size={18} onClick={onRemoveSubRegion} />
    </li>
  );
}

export default SelectedRegionItem;
