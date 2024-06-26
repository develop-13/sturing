"use client";
import ArrowBackBtn from "../common/ArrowBackBtn";
import Searchbar from "./SearchBar";
import SectionTabs from "./SectionTabs";
import { usePathname } from "next/navigation";

type THeaderFormatProps = {
  icons_left?: React.ReactNode | string;
  text_center?: string;
  icons_right?: React.ReactNode | string;
  hasTab?: boolean;
  hasSearchBar?: boolean;
};

function HeaderForamt(props: THeaderFormatProps) {
  const { icons_left, text_center, icons_right, hasTab, hasSearchBar } = props;

  const [empty, pageName, searchingWord] = usePathname().split("/");

  if (hasSearchBar) {
    return (
      <section>
        <header className="w-full p-[15px]  flex gap-[]  items-center max-w-[375px] max-h-[54px] border-b border-[##E4E4E4]">
          <div>
            <ArrowBackBtn />
          </div>
          <div className="flex-grow">
            <Searchbar />
          </div>
        </header>
      </section>
    );
  } else {
    return (
      <section>
        <header className="w-full p-[15px]  flex  items-center max-w-[375px] max-h-[54px] border-b border-[##E4E4E4]">
          <div className="flex-1">{icons_left}</div>
          <div className="flex items-center flex-[2] justify-center font-semibold text-[18px] lead-[27px] tracking-[2%]">
            {text_center}
          </div>
          <div className="flex-1 flex justify-end">{icons_right}</div>
        </header>
        {hasTab ? <SectionTabs curPageName={pageName} /> : null}
      </section>
    );
  }
}

export default HeaderForamt;
