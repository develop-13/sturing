"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiBookmark } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { RiMapPin2Fill } from "react-icons/ri";

export default function Study_Box() {
    console.log("Study_Box Rendered");
    const router = useRouter();
    const slideData = [
        {
            id: 1,
            src: "/img/studing-banner.png",
            href: "/home",
            tags: ["오프라인", "개발·테크"],
            text: "C언어 기초부터 함께 배울 스터디 모집",
            date: "06.20~06.30",
            location: "성동구 외3",
            state: "모집중 1/4",
            schedule: "매주 금 오후 9:00",
        },
        {
            id: 2,
            src: "/img/studing-banner.png",
            href: "/home",
            tags: ["온라인", "디자인"],
            text: "블렌더 테크닉 향상 및 피드백 스터디",
            date: "06.20~06.30",
            location: "ZOOM",
            state: "모집중 3/4",
            schedule: "모임 날짜 미정",
        },
        {
            id: 3,
            src: "/img/studing-banner.png",
            href: "/home",
            tags: ["온라인", "디자인"],
            text: "블렌더 테크닉 향상 및 피드백 스터디",
            date: "06.20~06.30",
            location: "ZOOM",
            state: "모집중 2/4",
            schedule: "매주 수 오전 12:00",
        },
    ];

    return (
        <>
            <div className="swiper-container">
                <Swiper
                    loop={false}
                    spaceBetween={10}
                    slidesPerView={2}
                    navigation={false}
                    autoplay={false}
                >
                    {slideData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="flex">
                                <button className="flex flex-col h-auto w-[182px]">
                                    <div className="flex items-end">
                                        <Image
                                            width={182}
                                            height={100}
                                            src={slide.src}
                                            alt=""
                                        />
                                        <div className="flex absolute w-full h-[25px] bg-black rounded-b-lg opacity-80 text-white text-[12px] items-center justify-center">
                                            {slide.schedule}
                                        </div>
                                    </div>
                                    <div className="flex absolute w-full justify-end items-end p-2">
                                        <FiBookmark className="text-white" />
                                    </div>
                                    <div className="flex flex-row gap-2 pt-3">
                                        <div className="flex rounded bg-[#4171FF] h-[22px] w-auto text-[10px] text-[#ECF1FF] items-center justify-center px-2">
                                            {slide.tags[0]}
                                        </div>
                                        <div className="flex rounded bg-[#ECF1FF] h-[22px] w-auto text-[10px] text-[#4171FF] items-center justify-center px-2 border border-[#4171FF]">
                                            {slide.tags[1]}
                                        </div>
                                    </div>
                                    <div className="flex text-left pt-2 font-bold text-[14px]">
                                        {slide.text}
                                    </div>
                                    <div className="flex flex-row items-center w-full text-[12px] gap-1 py-2 text-[#909090] border-b-2">
                                        <IoCalendarOutline />
                                        {slide.date} |
                                        <RiMapPin2Fill />
                                        {slide.location}
                                    </div>
                                    <div className="flex flex-row items-center w-full text-[12px] font-bold pt-2 text-[#909090]">
                                        {slide.state}
                                    </div>
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
