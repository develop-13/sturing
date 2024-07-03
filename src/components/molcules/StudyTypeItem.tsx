import IconFormat from "@/components/atoms/IconFormat";
import CheckedBtn from "../atoms/CheckedBtn";
import Icon from "@/components/atoms/Icon";

const dummyName = "온라인 스터디";
const dummyIsSelected = false;

function StudyTypeItem() {
  return (
    <li className="flex justify-between border border-gray-300 px-6 py-5 rounded-[5px]">
      <span className="font-bold text-base font-[#676767]">{dummyName}</span>
      <Icon type="CHECKED" />
    </li>
  );
}

export default StudyTypeItem;
