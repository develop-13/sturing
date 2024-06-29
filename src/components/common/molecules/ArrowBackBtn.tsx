"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import IconFormat from "../atoms/IconFormat";

function ArrowBackBtn() {
  const router = useRouter();

  const goBack = () => {
    console.log("이전 페이지로 이동");
    router.back();
  };
  return <IconFormat onClick={goBack} icon={<IoIosArrowBack />} />;
}

export default ArrowBackBtn;
