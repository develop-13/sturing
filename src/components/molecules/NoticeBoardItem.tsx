import { TBoard } from "@/types/study";
import React from "react";
import Text from "../atoms/Text";

function NoticeBoardItem({ board }: { board: TBoard }) {
  return (
    <div className="m-1 flex items-center gap-5">
      {board.readingRequired ? (
        <Text
          size="xs"
          weight="bold"
          className="p-1 rounded-[8px] bg-red-200 text-red-500"
        >
          필독
        </Text>
      ) : (
        <Text
          size="xs"
          weight="bold"
          className="p-1 rounded-[8px] bg-main-200 text-mainColor"
        >
          일반
        </Text>
      )}
      <Text size="sm" weight="bold">
        {board.title}
      </Text>
    </div>
  );
}

export default NoticeBoardItem;
