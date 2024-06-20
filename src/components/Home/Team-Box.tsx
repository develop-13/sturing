"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Team_Box() {
    console.log("Study_Box Rendered");
    const router = useRouter();
    const slideData = [
        {
            id: 1,
            src: "/img/team-example.png",
            href: "/home",
            datas: {
                name: "스터링윗미",
                tags: ["자격증", "자기주도적"],
                count: "9",
                point: "95%",
                career: "신입",
            },
        },
        {
            id: 2,
            src: "/img/team-example.png",
            href: "/home",
            datas: {
                name: "열일개발자",
                tags: ["개발·테크", "열정적인"],
                count: "9",
                point: "95%",
                career: "시니어",
            },
        },
        {
            id: 3,
            src: "/img/team-example.png",
            href: "/home",
            datas: {
                name: "갓생살자",
                tags: ["자기계발", "열정적인"],
                count: "9",
                point: "95%",
                career: "비기너",
            },
        },
    ];

    return (
        <>
            <div className="swiper-container">
                <Swiper
                    loop={false}
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation={false}
                    autoplay={false}
                >
                    {slideData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="flex">
                                <div className="flex flex-col h-auto w-[134px]">
                                    <div className="flex flex-col items-center justify-center gap-2 w-full h-[149px] bg-[#ECF1FF] rounded-lg">
                                        <div className="flex w-[60px] h-[60px]">
                                            <Image
                                                src={slide.src}
                                                alt=""
                                                width={60}
                                                height={60}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <text className="font-bold text-[16px]">
                                            {slide.datas.name}
                                        </text>
                                        <text className="flex flex-row items-center justify-center gap-1 font-bold text-[13px] text-[#676767]">
                                            <img
                                                src="/img/banner-icon.png"
                                                alt="이미지 테스트"
                                            />
                                            지수 {slide.datas.point}
                                        </text>
                                    </div>
                                    <div className="flex w-full items-center justify-center py-2 text-[10px] text-[#676767]">
                                        {slide.datas.career} | 스터디{" "}
                                        {slide.datas.count}회
                                    </div>{" "}
                                    <div className="flex flex-row w-full gap-1 justify-center">
                                        <div className="flex roundedz bg-white h-[22px] w-auto text-[9px] text-[#4171FF] items-center justify-center px-2 border border-[#4171FF] font-bold">
                                            {slide.datas.tags[0]}
                                        </div>{" "}
                                        <div className="flex rounded bg-white h-[22px] w-auto text-[9px] text-[#4171FF] items-center justify-center px-2 border border-[#4171FF] font-bold">
                                            {slide.datas.tags[1]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
