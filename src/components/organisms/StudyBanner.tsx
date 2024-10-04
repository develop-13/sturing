"use client";
import { TStudyBanner } from "@/db/studyBanners";
import Image from "../atoms/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function StudyBanner({ props }: { props: TStudyBanner[] }) {
  return (
    <>
      <div
        className="flex w-full h-[194px] select-none"
        onClick={() => {
          alert("해당 이벤트페이지는 아직 준비되지 않았습니다.");
        }}
      >
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {props.map((data) => {
            return (
              <SwiperSlide key={data.id}>
                <Image key={data.id} src={data.src} width={375} height={194} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
