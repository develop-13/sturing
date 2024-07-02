"use client";

import ListStateItem from "../atom/ListStateItem";
import StudyListItem from "../molecules/StudyListItem";

function MyStudyList() {
  return (
    <section>
      <h1 className="text-[20px] font-semibold leading-7 tracking-[-3%] ml-[18px]">
        스터디 리스트
      </h1>
      <div className="px-4 pt-5 pb-10 flex flex-col gap-4">
        <ul className="flex gap-3">
          <ListStateItem key={"진행 중"} state={"진행 중"} />
          <ListStateItem key={"진행 예정"} state={"진행 예정"} />
          <ListStateItem key={"진행 종료"} state={"진행 종료"} />
        </ul>
        <ul className="flex flex-col gap-4">
          <StudyListItem />
          <StudyListItem />
          <StudyListItem />
        </ul>
      </div>
    </section>
  );
}

export default MyStudyList;
