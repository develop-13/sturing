import NoticeBoardItem from "@/components/molecules/NoticeBoardItem";
import BoardBox from "@/components/organisms/infoBox/BoardBox";
import { TBoard, TJoiningStudy_Client } from "@/types/study";
import React from "react";

type TFeedback = {
  studyId: string;
  noticeBoards: TJoiningStudy_Client["noticeBoards"];
  studyBoards: TJoiningStudy_Client["studyBoards"];
  handleUpdateBoards: (
    boardType: "studyBoards" | "noticeBoards",
    boards: TBoard[]
  ) => void;
};

function Feedback({
  studyId,
  noticeBoards,
  studyBoards,
  handleUpdateBoards,
}: TFeedback) {
  const addClientBoard = (
    boardType: "studyBoards" | "noticeBoards",
    newBoard: TBoard
  ) => {
    const boards = boardType === "studyBoards" ? studyBoards : noticeBoards;
    // 기존 보드 배열을 복사하고 새로운 보드를 추가함
    const updatedBoards = [...boards, newBoard];
    // 업데이트된 보드 배열을 처리하는 함수 호출
    handleUpdateBoards(boardType, updatedBoards);
  };

  return (
    <div className="px-4 py-5 flex flex-col gap-4">
      <BoardBox
        boardLabel="공지사항"
        studyId={studyId}
        addClientBoard={addClientBoard}
      >
        {noticeBoards.map((board) => (
          <NoticeBoardItem key={board.boardId} board={board} />
        ))}
      </BoardBox>
    </div>
  );
}

export default React.memo(Feedback);
