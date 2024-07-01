import IconFormat from "@/components/common/atoms/IconFormat";
import CheckedBtn from "../../common/CheckedBtn";

const dummyName = "온라인 스터디";
const dummyIsSelected = false;

function StudyTypeItem() {
  return (
    <li className="flex justify-between border border-gray-300 px-6 py-5 rounded-[5px]">
      <span className="font-bold text-base font-[#676767]">{dummyName}</span>
      <CheckedBtn color="#9CA3AF" />
    </li>
  );
}

export default StudyTypeItem;
