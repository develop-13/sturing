import { useState } from "react";
import Text from "../atoms/Text";
import { TabButtonGroup } from "./ButtonGroup";
import { TStudy } from "@/types/study";

const dataSet = ["분야", "지역", "인원", "기간", "직업", "역할"];
const initialFilterDatas = {
  category: {
    design: 0,
    tech: 0,
    marketing: 0,
    business: 0,
    economy: 0,
    language: 0,
    certification: 0,
    selfDevelop: 0,
  },

  location: {},
  people: { minPeople: 0, maxPeople: 4 },
  period: { startDate: "", endDate: "" },
  career: {},
  role: {},
};
// UI안나와 있어서 어찌 해야 할 지 모르겠다.
// 금요일 발표시간에 보고 사진찍어서 따라하는 걸로 하자.

function FilterModal({ studyDatas }: { studyDatas: TStudy[] }) {
  const [currentTab, setCurrentTab] = useState("category");
  const [filterDatas, setFilterDatas] = useState(initialFilterDatas);
  // filterDatas가 초기화되는 과정
  // 모든 스터디 객체 (studyDatas)들을 순회하며 다음과 같은 작업을 수행한다.
  // 각 스터디 객체의 category에 대해서 filterDatas의 category의 각 키값들을 비교하며 다음과 같은 작업을 수행한다.
  // filterMaps의 각 키값에 대해서 스터디 객체의 category에 포함된 키값의 수를 증가시킨다.
  // react qeury로 어텋게 최저화 할지 생각해보기?

  return (
    <div className="w-full bg-rose-500 absolute top-0 left-0 z-50 flex flex-col gap-4 px-4 py-6 rounded-[15px]">
      <Text size="lg" weight="bold">
        필터
      </Text>
      <TabButtonGroup
        buttonGroupData={dataSet}
        selectedOptionIdx={0}
        onClick={() => {}}
      />
    </div>
  );
}

export default FilterModal;
