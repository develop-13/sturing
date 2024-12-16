import { TBoard } from "@/types/study";
import React from "react";
import Text from "../atoms/Text";
import Link from "next/link";

function NoticeBoardItem({ board }: { board: TBoard }) {
  return (
    <Link
      href={`/board/${board.boardClientId}?studyId=${board.studyId}`}
      className="m-1 flex items-center gap-5"
    >
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
    </Link>
  );
}

export default NoticeBoardItem;
