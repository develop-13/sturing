"use client";
// 왜 use client 붙여야 하지?
import HeaderForamt from "@/components/organisms/headerForamt";
import FixedBtn from "@/components/atoms/FixedBtn";
import FixedBtnSection from "@/components/organisms/FixedBtnSection";
import ProgressBar from "@/components/molcules/ProgressBar";
import Icon from "@/components/atoms/Icon";

function MatchingLayout({
  children,
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
  return (
    <div className="h-[812px]">
      {" "}
      <HeaderForamt icons_left={<Icon type="BACK" />} />
      <ProgressBar />
      {children}
      <FixedBtnSection>
        <FixedBtn icon={<Icon type="BACK" />} isGray={true} />
        <FixedBtn icon={<Icon type="FORWARD" />} />
      </FixedBtnSection>
    </div>
  );
}

export default MatchingLayout;
