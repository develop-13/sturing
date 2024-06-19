"use client";

// 클라이언트 컴포넌트 여야 하는가?

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import UpcomingStudyInfo from "./UpcomingStudyInfo";
// 서버로부터 불러온 다가오는 스터디 리스트의 예상 포멧
type TupcomingStudy = {
  startDate: string;
  title: string;
  location: string;
  hour: number;
};

const UpcomingStudyList_dummy: TupcomingStudy[] = [
  {
    startDate: new Date("2024-06-07T20:00:00+09:00").toISOString(),
    title: "UXUI 디자이너 본질 강화 피그마 스터디",
    location: "스타벅스 종로점",
    hour: 60,
  },
  {
    startDate: new Date("2024-06-15T20:00:00+09:00").toISOString(),
    title: "자바 스터디",
    location: "스타벅스 종로점",
    hour: 60,
  },
  {
    startDate: new Date("2024-06-22T20:00:00+09:00").toISOString(),
    title: "next js 스터디",
    location: "마곡 어딘가",
    hour: 60,
  },
];

function UpcomingStudyList() {
  return (
    // <div className="py-[28px] flex flex-col gap-5 px-[16px] bg-gradient-to-br from-[#D9E3FF] 100% to-[#FFE4E0] 100%">
    //   <h1 className="font-semibold text-[20px] leading-7 tracking-[-3%]">
    //     다가오는 스터디
    //   </h1>

    //   {UpcomingStudyList_dummy.map((UpcomingStudy, idx) => (
    //     <UpcomingStudyInfo upcomingStudyInfo={UpcomingStudy} />
    //   ))}
    // </div> // 한 페이지?
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
        renderBullet: (index, className) =>
          `<span class="${className}" style="width: 5.48px; height: 6px;"></span>`,
      }}
      modules={[Pagination]}
    >
      {UpcomingStudyList_dummy.map((UpcomingStudy, idx) => (
        <SwiperSlide key={idx}>
          <UpcomingStudyInfo upcomingStudyInfo={UpcomingStudy} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default UpcomingStudyList;
