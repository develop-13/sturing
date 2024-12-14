import { TBoard } from "@/types/study";
import React from "react";
import UserInfoItem from "./UserInfoItem";
import Text from "../atoms/Text";
import Image from "../atoms/Image";
import { getBlobStringAdapter } from "@/utils/adapters/adapters";
import Link from "next/link";

function StudyBoardItem({ board }: { board: TBoard }) {
  const textComponent = (
    <span className="flex gap-1 items-center">
      <Text size="sm" weight="bold">
        {board.writerName}
      </Text>
      <Text size="xs" weight="bold" color="gray-700">
        {board.writerRole}
      </Text>
    </span>
  );

  console.log("imgSrces");
  console.log(board["imgSrces"]);

  return (
    <Link href={"#"} className="mt-2">
      <UserInfoItem imgSrc={board.writerImg} topText={textComponent} />
      <div className="flex mt-[6px] items-center">
        <div className="flex flex-col gap-2 flex-1 ">
          <Text
            size="sm"
            weight="bold"
            color="gray-900"
            className="overflow-hidden text-ellipsis max-h-[18px] line-clamp-3"
          >
            {board.title}
          </Text>
          <Text
            size="xs"
            weight="bold"
            color="gray-800"
            className="overflow-hidden text-ellipsis max-h-[56px] line-clamp-3 "
          >
            {board.text}
          </Text>
        </div>
        {board.imgSrces?.length && (
          <Image
            className="flex-2"
            height={80}
            width={80}
            // 처음 클라이언트에서 설정할떄 imgSrc와
            // 서버에서 가져오고 나서 보여지는 imgSrc가 다를 듯
            src={board.imgSrces[0] as string}
          />
        )}
      </div>
    </Link>
  );
}

export default StudyBoardItem;
