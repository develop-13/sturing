"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import UpcomingStudyItem from "../../organisms/UpcomingStudyItem";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { TSchedule } from "@/types/study";

// 서버로부터 불러온 다가오는 스터디 리스트의 예상 포멧
type TUpcomingStudy = {
  startDate: string;
  title: string;
  location: string;
  hour: number;
};

// export type TSchedule = {
//   scheduleId: string;
//   studyId: string;
//   title: string;
//   date: Date;
//   location: string;
//   startTime: string;
//   endTime: string;
//   detail: string;
// };

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

// date: "2024-12-09T16:03:09.285Z";
// detail: "ㅇ냘ㅇ너ㅣㄹ";
// endTime: "11:00";
// location: "흑흑 ";
// scheduleId: "9b13c2ba-ab16-46f5-9de9-90dfa154e09f";
// startTime: "9:00";
// studyId: "674ed47fdcf98280c577676e";
// title: "제발되라 쓰바";
// userEmail: "wotkd09093@gmail.com";
// _id: "675715fe406beff0c8d80344";

function UpcomingSchedules({ userEmail }: { userEmail: string | undefined }) {
  const [schedules, setSchedules] = useState<TSchedule[]>([]);

  const [isFetchingSchedules, setIsFetchingSchedules] = useState(true);

  useEffect(() => {
    // 사용자 스케쥴 가져오는 로직

    async function getUserSchedules() {
      try {
        const fetchedSchedules = await (
          await fetch(`/mystudy/api?userEmail=${userEmail}&type=schedules`)
        ).json();

        console.log(fetchedSchedules);
        setSchedules(fetchedSchedules);
        setIsFetchingSchedules(false);
      } catch (err) {
        console.error(err);
      }
    }

    getUserSchedules();
  }, []);

  if (isFetchingSchedules) return <Loading />;

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
        {schedules.map((schedule, idx) => (
          <SwiperSlide key={idx}>
            <UpcomingStudyItem {...schedule} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default UpcomingSchedules;
