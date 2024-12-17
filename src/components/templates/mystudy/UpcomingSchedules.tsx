"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import UpcomingScheduleItem from "../../organisms/UpcomingScheduleItem";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { TSchedule } from "@/types/study";
import Text from "@/components/atoms/Text";

function UpcomingSchedules({ userEmail }: { userEmail: string | undefined }) {
  const [schedules, setSchedules] = useState<TSchedule[]>([]);
  const hasSchedule = schedules.length;
  const [isFetchingSchedules, setIsFetchingSchedules] = useState(true);

  useEffect(() => {
    // 사용자 스케쥴 가져오는 로직

    async function getUserSchedules() {
      try {
        const fetchedSchedules = await (
          await fetch(`/mystudy/api?userEmail=${userEmail}&type=schedules`)
        ).json();
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
        {hasSchedule ? (
          schedules.map((schedule, idx) => (
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
