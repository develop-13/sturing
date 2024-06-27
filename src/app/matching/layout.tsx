"use client";
// 왜 use client 붙여야 하지?

import ArrowBackBtn from "@/components/common/ArrowBackBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import FixedBtn from "@/components/common/FixedBtn";
import FixedBtnSection from "@/components/common/FixedBtnSection";
import ArrowForwardBtn from "@/components/common/ArrowForwardBtn";
import MainLayout from "@/components/common/mainLayout";
import MatchingHeader from "@/components/matching/MatchingHeader";

// context api로 해당 페이지 내 상탯값 관리?
// 이런식으로 matching 페이지 내에서만 전역적으로 쓸 수 있는 state값을 둔 후에
// 병렬 세그먼트 내에 컴포넌트에서 쓸 수 있도록 하는 것이 어떨까
const state = {
  // 예시 state
  currentRoute: "interests", // 현재 페이지 이름?

  stateGauge: {
    interests: 1,
    skilled: 2,
    type: 3,
    place: 4,
    mood: 5,
  }, // 상단 progress bar을 위한 data

  data: {
    // 완성하여 서버로 보낼 데이터
    skilled: new Map(
      Object.entries({
        // 관심분야 + 숙련도
        design: 2,
        coding_tech: 3,
        marketing: 1,
      })
    ),
    type: 3,
    place: ["강남구", "성동구"],
    atmosphere: ["친근한", "열정적인", "학습중식적"],
  },
};

function MatchingLayout({
  interests,
  skilled,
  type,
  place,
  atmosphere,
  complete,
}: {
  children: React.ReactNode;
  interests: React.ReactNode;
  skilled: React.ReactNode;
  type: React.ReactNode;
  place: React.ReactNode;
  atmosphere: React.ReactNode;
  complete: React.ReactNode;
}) {
  // 여기서 필요한 정보는? 현재 parameter값의 정보 => interests인지.. skilled인지.. 등
  // 파라미터를 통해서 state의 currentPage를 결정한다.

  return (
    <div>
      {" "}
      <HeaderForamt icons_left={<ArrowBackBtn />} />
      <div className="flex flex-col gap-10">
        <MatchingHeader
          title={["관심분야에 대한", "나의 직업수준을 선택해주세요"]}
        />
        <main>
          {/* pregress bar 구현 예정 */}
          {/* {interests} */}
          {skilled}
          {type}
          {place}
          {atmosphere}
          {complete}
        </main>
      </div>
      <FixedBtnSection>
        <FixedBtn icon={<ArrowBackBtn />} bgColor={"#D0D0D0"} />
        <FixedBtn icon={<ArrowForwardBtn />} />
      </FixedBtnSection>
    </div>
  );
}

export default MatchingLayout;
