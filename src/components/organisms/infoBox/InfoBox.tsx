"use client";
import { ForwardedRef, forwardRef, useEffect } from "react";

// 여기서 위치값을 어텋게 줄건데?
type TInfoBox = {
  theme: "white" | "gradient";
  children?: React.ReactNode;
  getInfoBoxTop?: (InfoBoxTop: number) => void;
  id?: string;
};

const InfoBox = forwardRef<HTMLDivElement, TInfoBox>(function InfoBox(
  props: TInfoBox,
  ref?: ForwardedRef<HTMLDivElement>
) {
  useEffect(() => {
    if (props.getInfoBoxTop && ref && typeof ref === "object" && ref.current) {
      props.getInfoBoxTop(ref.current.getBoundingClientRect().top);
    }
  });
  // 여기서 getInfoBoxTop 의 값을 구해서 상위 컴포넌트의 infoBoxTop의 값을 결정
  // 상위 컴포넌트 랜더링,  클릭 시 infoBoxTop으로 스크롤 시키기

  let bgColor = "";
  switch (props.theme) {
    case "white":
      bgColor = "bg-white border border-gray-300 ";
      break;

    case "gradient":
      bgColor = "bg-gradient-to-br from-custom-blue-70 to-custom-pink-70 ";
      break;
  }

  return (
    <div
      id={props.id}
      ref={ref}
      className={
        "py-[24px] px-[20px] flex flex-col rounded-[8px] gap-[12px] " + bgColor
      }
    >
      {props.children}
    </div>
  );
});

export default InfoBox;
