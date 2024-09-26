"use client";
import { useRef } from "react";
import TitleLink from "../molecules/TitleLink";

export type TSlideContentList = {
  title: string;
  hasArrow?: boolean;
  arrowColor?: "gray-800" | "gray-300";
  children: React.ReactNode;
};

function SlideContentList(props: TSlideContentList) {
  const { title, hasArrow, arrowColor, children } = props;

  const scrollRef = useRef<HTMLUListElement | null>(null);

  const scrollRight = () => {
    console.log("scrollRight work!");

    if (scrollRef.current) {
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      console.log(scrollRef.current.scrollWidth);

      // 작은 오차를 허용 (5px 정도)
      if (scrollRef.current.scrollLeft >= maxScrollLeft - 5) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <TitleLink
        title={title}
        hasArrow={hasArrow}
        arrowColor={arrowColor}
        onClick={scrollRight}
      />
      <ul
        ref={scrollRef}
        className="flex gap-2 relative overflow-x-scroll list-none px-2 scrollbar-hide "
      >
        {children}
      </ul>
    </div>
  );
}

export default SlideContentList;
