"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import UpcomingStudyItem from "./UpcomingStudyItem";

// 서버로부터 불러온 다가오는 스터디 리스트의 예상 포멧
type TUpcomingStudy = {
  startDate: string;
  title: string;
  location: string;
  hour: number;
};

const UpcomingStudyList_dummy: TUpcomingStudy[] = [
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

function UpcomingStudies() {
  return (
    <div className="">
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
            <UpcomingStudyItem />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default UpcomingStudies;
