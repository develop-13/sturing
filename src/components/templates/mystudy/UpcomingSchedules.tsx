"use client";

import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper와 SwiperSlide를 함께 정적으로 가져오기
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { TSchedule } from "@/types/study";
import Text from "@/components/atoms/Text";

const UpcomingScheduleItem = dynamic(
  () => import("../../organisms/UpcomingScheduleItem"),
  { ssr: false } // 서버 렌더링 비활성화
);

function UpcomingSchedules({ userSchedule }: { userSchedule: TSchedule[] }) {
  console.log(userSchedule);

  const hasSchedule = userSchedule.length;

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
        {hasSchedule ? (
          userSchedule.map((schedule, idx) => (
            <SwiperSlide key={idx}>
              <UpcomingScheduleItem {...schedule} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key={"none"}>
            <div className="px-[16px] pt-[20px] pb-[70px] flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-custom-blue-30 to-custom-pink-30">
              <Text size="xl" weight="bold">
                나의 일정
              </Text>
              <Text size="base"> 현재 일정이 없습니다</Text>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default UpcomingSchedules;
