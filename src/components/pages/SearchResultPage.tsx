"use client";
import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import Searchbar from "../molecules/Searchbar";
import Header from "../organisms/Header";
import { useEffect } from "react";

function SearchResultPage() {
  const router = useRouter();

  useEffect(() => {
    alert("해당 페이지는 개발중입니다");
    router.push("/recommend");
    return;
  });

  return (
    <div>
      <Header
        leftSlot={<Icon type="BACK" />}
        middleSlot={<Searchbar usage="header" placeholder="" />}
      />
    </div>
  );
}

export default SearchResultPage;
