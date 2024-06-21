"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function ArrowBackBtn() {
  const router = useRouter();

  const goBack = () => {
    console.log("이전 페이지로 이동");
    router.back();
  };

  return <IoIosArrowBack className="text-iconSize" onClick={goBack} />;
}

export default ArrowBackBtn;
