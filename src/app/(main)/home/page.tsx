"use client";
import Button from "@/components/Button";
import { SlMagnifier, SlArrowRight } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import Banner_Slide from "@/components/Home/Banner-Slide";
import { Roboto } from "next/font/google";
import Seacrh_Study_Slide from "@/components/Home/Seacrh-Study-Slide";
import Study_Box from "@/components/Home/Study-Box";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function page() {
    console.log("HomePage Rendered");
    return (
        <>
            <div className={roboto.className}>
                {/** 매칭페이지 버튼 */}
                <div className="flex justify-end px-16">
                    <div className="absolute bottom-16">
                        <Button className="flex fixed bg-[#4171FF] w-[58px] h-[58px] rounded-full justify-center items-center">
                            <GoPlus className="text-[32px] font-bold text-white" />
                        </Button>
                    </div>
                </div>

                {/** 메인 메뉴 배너 */}
                <div className="flex flex-col">
                    <Banner_Slide />
                </div>

                {/** 스터디 Body */}
                <div className="flex flex-col bg-white h-[250px] w-auto">
                    {/** 검색 */}
                    <form
                        className="flex relative justify-center pt-8"
                        action={""}
                    >
                        <input
                            className="px-[20px] rounded-full bg-[#ECF1FF] w-[343px] h-[48px] text-left text-[12px] font-bold text-[#676767]"
                            type="text"
                            placeholder="관심 스터니 분야나 강의명을 검색해보세요"
                            id="search"
                            name="search"
                        />
                        <button type="submit">
                            <SlMagnifier
                                className="text-[#4171FF] absolute end-8 bottom-4"
                                id="search"
                            />
                        </button>
                    </form>

                    {/** 탐색 */}
                    <button
                        className="flex items-center pt-8 px-5"
                        onClick={() => "스터디 탐색 링크"}
                    >
                        <text className="font-bold text-[18px]">
                            분야별 스터디 탐색하기
                        </text>
                        <SlArrowRight className="text-black ml-auto" />
                    </button>
                    <div className="pt-6 px-5">
                        <Seacrh_Study_Slide />
                    </div>
                </div>
            </div>
            <div className="flex h-[8px] bg-[#F7F7F7]"></div>
            <div>
                <button
                    className="flex items-center pt-6 px-5"
                    onClick={() => "스터디 이동 링크"}
                >
                    <text className="font-bold text-[18px]">
                        이번주 인기 스터디
                    </text>
                    <SlArrowRight className="text-black ml-auto" />
                </button>
                <div className="mt-5 ml-5">
                    <Study_Box />
                </div>
            </div>
        </>
    );
}
