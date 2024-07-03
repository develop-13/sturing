"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/components/atoms/Button";

export default function Seacrh_Study_Slide() {
  console.log("Seacrh_Study_Slide Rendered");
  const router = useRouter();
  const slideData = [
    {
      id: 1,
      src: "/img/study-icon-design.png",
      href: "/home",
      text: "디자인",
    },
    {
      id: 2,
      src: "/img/study-icon-design.png",
      href: "/home",
      text: "개발·테크",
    },
    {
      id: 3,
      src: "/img/study-icon-design.png",
      href: "/home",
      text: "마케팅",
    },
    {
      id: 4,
      src: "/img/study-icon-design.png",
      href: "/home",
      text: "비즈니스",
    },
    {
      id: 5,
      src: "/img/study-icon-design.png",
      href: "/home",
      text: "경제",
    },
    {
      id: 6,
      src: "/img/study-icon-design.png",
      href: "/home",
      text: "외국어",
    },
  ];

  return (
    <>
      <div className="swiper-container">
        <Swiper
          loop={false}
          spaceBetween={2}
          slidesPerView="auto"
          navigation={false}
          autoplay={false}
        >
          {slideData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Button className="flex flex-row h-[50px] px-2 justify-between items-center gap-1 rounded-full">
                <Image
                  src={slide.src}
                  alt=""
                  width={36}
                  height={36}
                  className="flex bg-black rounded-full"
                ></Image>
                <text className="font-bold text-[12px]">{slide.text}</text>
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
