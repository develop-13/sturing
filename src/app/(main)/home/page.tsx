"use client";
import Button from "@/components/Button";
import { SlMagnifier, SlArrowRight } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import Banner_Slide from "@/components/Home/Banner-Slide";
import { Roboto } from "next/font/google";

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

                {/** 검색 */}
                <form className="flex relative justify-center pt-8" action={""}>
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
                <div className="flex items-center pt-8 px-5">
                    <text className="font-bold text-[18px]">
                        분야별 스터디 탐색하기
                    </text>
                    <SlArrowRight className="text-black ml-auto" />
                </div>
                <div className="flex flex-row items-center pt-6 pl-5 gap-4">
                    <Button className="flex flex-row items-center rounded-full border-gray-400 w-[104px] h-[50px] pl-[10px] gap-1 text-[14px] font-bold">
                        <img
                            className="w-36px h-36px bg-black rounded-full"
                            src="./img/study-icon-design.png"
                        ></img>
                        디자인
                    </Button>{" "}
                    <Button className="flex flex-row items-center rounded-full border-gray-400 w-[104px] h-[50px] pl-[10px] gap-1 text-[14px] font-bold">
                        <img
                            className="w-36px h-36px bg-black rounded-full"
                            src="./img/study-icon-design.png"
                        ></img>
                        마케팅
                    </Button>
                </div>
            </div>
        </>
    );
}
