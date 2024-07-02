import { MdKeyboardArrowDown } from "react-icons/md";

function FilterItem({ filterName }: { filterName: string }) {
  return (
    <li className="w-[68px] h-[35px] flex items-center justify-center flex-grow-0 flex-auto flex-shrink-0  border border-[#D9E3FF] rounded-[5px] cursor-pointer ">
      <span className="text-gray-800">{filterName}</span>
      <MdKeyboardArrowDown className="w-[18px] h-[18px] text-gray-400" />
    </li>
  );
}

export default FilterItem;
