"use client";
import { useSearchParams } from "next/navigation";
import Icon from "../atoms/Icon";
import Searchbar from "../molecules/Searchbar";
import Header from "../organisms/Header";
import { useEffect, useState } from "react";
import Button from "../molecules/Button";
import Text from "../atoms/Text";
import { v4 as uuidv4 } from "uuid";
import Divider from "../atoms/Divider";
import FilterModal from "../templates/filter/FilterModal";
import { filterDatas } from "@/db/filter";
import getTranslation from "@/utils/getTranslation";

// 상태값 두 개를 두어야 할 것 같음
// 서버에서 가져온 검색어에 해당한 스터디 객체들의 배열
// 스터디 객체들을 목록순으로 보여줄 info 객체?

function SearchResultPage() {
  let isDragging = false;
  const dragging = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (!isDragging) return;
    e.currentTarget.scrollLeft -= e.movementX;
  };
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [currentQuery, setCurrentQuery] = useState(query);
  const onChangeCurrentQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(e.target.value);
  };

  const [studyDatas, setStudyDatas] = useState([]);

  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    // query에 해당하는 검색어들을 서버로부터 가져오는 통신작업이 필요
    // const fetchedStudyDatas = fetchStudyData(query);
    // setStudyDatas(fetchedStudyDatas);
  }, []);

  return (
    <div className="relative h-full">
      {showFilterModal && <FilterModal filterDatas={filterDatas} />}
      <section className="flex flex-col gap-3 px-4 pb-4">
        <Header
          leftSlot={<Icon type="BACK" />}
          middleSlot={
            <Searchbar
              usage="header"
              placeholder=""
              onChange={onChangeCurrentQuery}
              value={currentQuery}
            />
          }
        />
        <div className="flex ">
          <ul
            className="flex gap-[6px] relative overflow-hidden"
            onMouseMove={dragging}
            onMouseDown={() => (isDragging = true)}
            onMouseUp={() => (isDragging = false)}
            onMouseLeave={() => (isDragging = false)}
          >
            {Object.keys(filterDatas).map((it) => (
              <Button
                key={uuidv4()}
                theme="transparent-border"
                shape="tag"
                extraCss="px-[16px] !h-[35px] shrink-0"
              >
                <Text size="sm" weight="bold" color="gray-800">
                  {getTranslation(it)}
                </Text>
                <Icon type="DOWN" />
              </Button>
            ))}
          </ul>
          <div className="bg-white z-[99999px] flex items-center">
            <Icon type="FILTER" />
          </div>
        </div>
      </section>
      <Divider type="row" py={3} color="gray-100" />
    </div>
  );
}

export default SearchResultPage;
