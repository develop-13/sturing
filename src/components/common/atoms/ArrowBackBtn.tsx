"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import IconFormat from "./IconFormat";
import SearchIcon from "./SearchIcon";

function ArrowBackBtn() {
  const router = useRouter();

  return (
    <IconFormat
      onClick={() => {
        console.log("이전 페이지로 이동");
        router.back();
      }}
      icon={<SearchIcon />}
    />
  );
}

export default ArrowBackBtn;
