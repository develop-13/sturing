import { IoSearchOutline } from "react-icons/io5";

function Searchbar() {
  return (
    <div className="w-full py-[7px] px-[16px] max-w-[311px] max-h-[36px] bg-[#ECF1FF] flex gap-[10px] items-center rounded-full">
      <input
        type="text"
        className="w-full bg-inherit text-[14px] tracking-[-3%] leading-[22px] font-semibold "
      />
      <IoSearchOutline className="text-iconSize" />
    </div>
  );
}

export default Searchbar;
