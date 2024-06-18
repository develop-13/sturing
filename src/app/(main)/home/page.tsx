import Button from "@/components/Button";
import { SlMagnifier, SlArrowRight } from "react-icons/sl";
import { GoPlus } from "react-icons/go";

export default function page() {
    const boolas = false;

    console.log("HomePage Rendered");
    return (
        <>
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
                <img
                    className="h-[194px] w-[375px]"
                    src="/img/banner-1.png"
                    alt="이미지 테스트"
                />
                <div className="flex flex-row items-center h-[43px] w-full bg-black pl-3 gap-2">
                    <img src="/img/banner-icon.png" alt="이미지 테스트" />
                    <text className="text-white text-[14px] font-bold">
                        매칭 항목 선택하고 딱 맞는 스터디 추천받기 {">"}
                    </text>
                </div>
            </div>
            {/** 검색 */}
            <form
                className="flex relative justify-center pt-[33px]"
                action={""}
            >
                <input
                    className="px-[24px] rounded-full bg-[#ECF1FF] w-[343px] h-[48px] text-left text-[14px] font-bold"
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
            <div className="flex items-center pt-[33px] px-[20px]">
                <text className="font-bold text-[18px]">
                    분야별 스터디 탐색하기
                </text>
                <SlArrowRight className="text-black ml-auto" />
            </div>
            <div className="flex flex-row items-center pt-[33px] pl-[20px] gap-4">
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
        </>
    );
}
