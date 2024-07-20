"use client";
import { ForwardedRef, forwardRef, useEffect } from "react";

// 여기서 위치값을 어텋게 줄건데?
type TInfoBox = {
  theme: "white" | "gradient";
  borderColor?: string;
  children?: React.ReactNode;
  getInfoBoxTop?: (InfoBoxTop: number) => void;
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
      ref={ref}
      className={
        "py-[24px] px-[20px] flex flex-col rounded-[8px] gap-[8px] " + bgColor
      }
    >
      {props.children}
    </div>
  );
});

export default InfoBox;
