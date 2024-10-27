"use client";
import { useSearchParams } from "next/navigation";
import Icon from "../atoms/Icon";
import Searchbar from "../molecules/Searchbar";
import Header from "../organisms/Header";
import { useEffect, useRef, useState } from "react";
import Button from "../molecules/Button";
import Text from "../atoms/Text";
import { v4 as uuidv4 } from "uuid";
import Divider from "../atoms/Divider";
import FilterModal from "../templates/filter/FilterModal";
import { filterDatas } from "@/db/filter";
import getTranslation from "@/utils/getTranslation";
import StudyBox from "../organisms/StudyBox";
import { TStudyItem } from "@/types/study";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";
import SortSelector from "../molecules/SortSelector";

// 상태값 두 개를 두어야 할 것 같음
// 서버에서 가져온 검색어에 해당한 스터디 객체들의 배열
// 스터디 객체들을 목록순으로 보여줄 info 객체?

async function fetchSearchResults(query: string) {
  try {
    const fetchedStudyDatas = await fetch(`/search/result/api?query=${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => res.json());
    console.log(fetchedStudyDatas);
    return fetchedStudyDatas;
  } catch (err) {
    console.error(err);
    return err;
  }
}

function SearchResultPage() {
  let isDragging = false;
  const dragging = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (!isDragging) return;
    e.currentTarget.scrollLeft -= e.movementX;
  };
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [isFetchingDatas, setIsFetchingDatas] = useState(false);

  const [searchResults, setSearchResults] = useState<TStudyItem[]>([]);

  const handleSetSearchResults = (studies: TStudyItem[]) => {
    setSearchResults(studies);
  };

  const [showFilterModal, setShowFilterModal] = useState(false);
  let initialTab = useRef<number>(0);
  let filterRef = useRef<HTMLDivElement>(null);

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // 필터가 닫히는 조건: 필터 영역 밖을 클릭 했을 때,
      // 예외조건: 필터가 없거나 (필터가 없을 수가 있나?) 필터 영역 안을 클릭 했을 때,

      if (
        !(filterRef.current instanceof HTMLElement) ||
        !filterRef.current ||
        (e.target instanceof Node && filterRef.current.contains(e.target))
      )
        return;
      closeFilterModal();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [filterRef]);

  useEffect(() => {
    // query에 해당하는 검색어들을 서버로부터 가져오는 통신작업이 필요
    async function dataSetterFunc() {
      setIsFetchingDatas(true);
      const fetchedStudyDatas = await fetchSearchResults(query);
      handleSetSearchResults(fetchedStudyDatas);
      setIsFetchingDatas(false);
    }
    dataSetterFunc();
  }, [query]);
  // 요청안가는 이유. 여기서 초기에 한 번만 발생해서

  return (
    <div className="relative h-screen flex flex-col gap-3">
      {showFilterModal && (
        <FilterModal
          ref={filterRef}
          closeFilterModal={closeFilterModal}
          filterDatas={filterDatas}
          initialTab={initialTab.current}
          handleSetSearchResults={handleSetSearchResults}
          query={query}
        />
      )}
      <section className="flex flex-col gap-3 px-4">
        <Header
          leftSlot={<Icon type="BACK" />}
          middleSlot={
            <Searchbar usage="header" placeholder="" value={query || ""} />
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
            {Object.keys(filterDatas).map((it, idx) => (
              <Button
                key={uuidv4()}
                theme="transparent-border"
                shape="tag"
                extraCss="px-[16px] !h-[35px] shrink-0"
                onClick={() => {
                  setShowFilterModal(true);
                  initialTab.current = idx;
                }}
              >
                <Text size="sm" weight="bold" color="gray-800">
                  {getTranslation(it)}
                </Text>
                <Icon type="DOWN" />
              </Button>
            ))}
          </ul>
          <div className="bg-white z-[99999px] flex items-center">
            <Icon
              type="FILTER"
              onClick={() => {
                setShowFilterModal(true);
              }}
            />
          </div>
        </div>
      </section>
      <Divider type="row" py={3} color="gray-100" />
      <section className="">
        <SortSelector
          searchResults={searchResults}
          handleSetSearchResults={handleSetSearchResults}
        />
        <div className="flex gap-2 flex-wrap ">
          {isFetchingDatas ? (
            Array(4)
              .fill(null)
              .map((_, idx) => <StudyBoxSkeleton key={idx} />)
          ) : searchResults.length ? (
            searchResults.map((study: TStudyItem) => (
              <StudyBox props={study} key={study.id} />
            ))
          ) : (
            <div>검색결과가 업습니다</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchResultPage;
