"use client";
import Icon from "@/components/common/atoms/Icon";
import Searchbar from "../../common/molecules/SearchBar";
import FilterBar from "../../search/molecules/FilterBar";
import SectionTabs from "../molecules/SectionTabs";
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
      <section className="w-[375px]">
        <header className="px-4 max-w-[375px] h-[54px] flex items-center">
          <div className="flex gap-[7px] w-full items-center">
            <Icon type="BACK" />
            <div className="flex-grow">
              <Searchbar px={16} py={7} />
            </div>
          </div>
        </header>
      </section>
    );
  } else {
    return (
      <section>
        <header className="w-full p-4  flex  items-center max-w-[375px] h-[54px] border-b border-[#E4E4E4]">
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
