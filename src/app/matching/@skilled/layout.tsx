import MatchingHeader from "@/components/matching/common/MatchingHeader";

function SkilledLayout({ children }: { children: React.ReactNode }) {
  // context api의 전역 state에 현재 페이지 정보를 식별하고 skilled가 아니면 return => 현재 페이지만 볼 수 있게 하기.

  return (
    <section className="flex flex-col gap-10">
      <MatchingHeader
        title={["관심분야에 대한", "나의 직업수준을 선택해주세요"]}
      />
      {children}
    </section>
  );
}

export default SkilledLayout;
