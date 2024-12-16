"use client";
import FadeLoader from "react-spinners/FadeLoader";
import Icon from "../../atoms/Icon";

function Loading() {
  return (
    <div className="w-full h-screen absolute bg-white z-50 ">
      <div className="absolute left-[50%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[12px] items-center justify-center">
        <Icon type="LOGO" />
        <FadeLoader width={4} height={12} />
      </div>
    </div>
  );
}

export default Loading;
