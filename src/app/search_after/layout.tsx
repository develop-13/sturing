import Searchbar from "@/components/SearchBar";
import ArrowBackBtn from "@/components/header_metarials/ArrowBackBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React from "react";

function SearchAfterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <section>
        <header className="w-full p-[15px]  flex gap-[10px]  items-center max-w-[375px] max-h-[54px] border-b border-[##E4E4E4]">
          <ArrowBackBtn />
          <Searchbar />
        </header>
      </section>
      {children}
    </div>
  );
}

export default SearchAfterLayout;
