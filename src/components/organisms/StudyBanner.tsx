"use client";
import { TStudyBanner } from "@/db/studyBanners";
import Image from "../atoms/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import React from "react";

export default function StudyBanner({
  bannerImages,
}: {
  bannerImages: React.ReactNode[];
}) {
  console.log(bannerImages);

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
        >
          {bannerImages.map((img, idx) => {
            return <SwiperSlide key={idx}>{img}</SwiperSlide>;
          })}
        </Swiper>
      </div>
    </>
  );
}
