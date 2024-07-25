"use client";
import { TStudyBanner } from "@/db/studyBanners";
import Image from "next/image";

export default function StudyBanner({ props }: { props: TStudyBanner[] }) {
  return (
    <>
      <div
        className="flex w-full h-[194px] select-none"
        onClick={() => {
          alert("해당 이벤트페이지는 아직 준비되지 않았습니다.");
        }}
      >
        {props.map((data) => {
          return data.src === "" ? (
            <div
              key={data.id}
              className="flex bg-mainColor w-full h-full"
            ></div>
          ) : (
            <Image
              key={data.id}
              src={data.src}
              width={375}
              height={194}
              alt=""
            ></Image>
          );
        })}
      </div>
    </>
  );
}
