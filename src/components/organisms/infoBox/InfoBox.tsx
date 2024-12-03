"use client";
import { ForwardedRef, forwardRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

// 여기서 위치값을 어텋게 줄건데?
type TInfoBox = {
  theme: "white" | "gradient";
  children?: React.ReactNode;
  id?: string;
  className?: string;
};

const InfoBox = forwardRef<HTMLDivElement, TInfoBox>(function InfoBox(
  props: TInfoBox,
  ref?: ForwardedRef<HTMLDivElement>
) {
  let bgColor = "";
  switch (props.theme) {
    case "white":
      bgColor = "bg-white border border-gray-300 ";
      break;

    case "gradient":
      bgColor = "bg-gradient-to-br from-custom-blue-70 to-custom-pink-70 ";
      break;
  }

  const effectClassName = twMerge(
    "py-[24px] px-[20px] flex flex-col rounded-[8px] gap-[12px]",
    bgColor,
    props.className
  );

  return (
    <div id={props.id} ref={ref} className={effectClassName}>
      {props.children}
    </div>
  );
});

export default InfoBox;
