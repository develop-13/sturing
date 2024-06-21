"use client";
import SectionTabs from "../SectionTabs";
import { usePathname } from "next/navigation";

type THeaderFormatProps = {
  icons_left?: React.ReactNode | string;
  text_center?: string;
  icons_right?: React.ReactNode | string;
  hasTab?: boolean;
};

function HeaderForamt(props: THeaderFormatProps) {
  const { icons_left, text_center, icons_right, hasTab } = props;

  const [empty, pageName, searchingWord] = usePathname().split("/");

  return (
    <section>
      <header className="w-full p-[15px]  flex  items-center max-w-[375px] max-h-[54px] border-b border-[##E4E4E4]">
        <div className="flex-1">{icons_left}</div>
        <div className="flex items-center flex-1 font-semibold text-[18px] lead-[27px] tracking-[2%]">
          {text_center}
        </div>
        <div className="flex-1 flex justify-end">{icons_right}</div>
      </header>
      {hasTab ? <SectionTabs curPageName={pageName} /> : null}
    </section>
  );
}

export default HeaderForamt;
