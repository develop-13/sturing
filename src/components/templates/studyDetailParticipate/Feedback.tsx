import NoticeBoardItem from "@/components/molecules/NoticeBoardItem";
import StudyBoardItem from "@/components/molecules/StudyBoardItem";
import BoardBox from "@/components/organisms/infoBox/BoardBox";
import { TBoard, TJoiningStudy_Client } from "@/types/study";
import { getBlobStringAdapter } from "@/utils/adapters/adapters";
import React from "react";

type TFeedback = {
  teamMembers: TJoiningStudy_Client["currentMembers"];
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
  teamMembers,
  noticeBoards,
  studyBoards,
  handleUpdateBoards,
}: TFeedback) {
  const postBoard =
    (boardType: "studyBoards" | "noticeBoards") => async (newBoard: TBoard) => {
      // 클라이언트 값도 바꾸고 => 추후에 함수로 따로 분리

      const boards = boardType === "studyBoards" ? studyBoards : noticeBoards;
      const blobTypeImgSrces = newBoard["imgSrces"];

      console.log("blobTypeImgSrces:", blobTypeImgSrces); // 값 확인

      newBoard["imgSrces"] = blobTypeImgSrces.map(
        (imgBlob) => getBlobStringAdapter(imgBlob as Blob)
        // str로 바꿈
      ); // 클라이언트의 imgSrces는 string[] 타입이어야 함

      console.log("newBoard['imgSrces'] after:", newBoard["imgSrces"]); // 값 확인

      const updatedBoards = [...boards, newBoard];

      handleUpdateBoards(boardType, updatedBoards);

      // 서버값도 바꾸기 => 추후에 함수로 따로 분리
      try {
        const formData = new FormData();

        formData.append("studyId", studyId);
        formData.append("boardData", JSON.stringify(newBoard));
        formData.append("boardType", boardType);

        if (blobTypeImgSrces && blobTypeImgSrces.length > 0) {
          blobTypeImgSrces.forEach((image) => {
            if (image instanceof Blob) {
              formData.append("boardImages", image);
              // 서버에서는 boardImages의 값을 이미지 파일이 들어있는 배열로 받음
            }
          });
        }

        const res = await fetch(`/api/formData`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className="px-4 py-5 flex flex-col gap-4">
      <BoardBox
        studyId={studyId}
        key={"noticeBoards"}
        boardLabel="공지사항"
        postBoard={postBoard("noticeBoards")}
        teamMembers={teamMembers}
      >
        {noticeBoards.map((board, idx) => (
          <NoticeBoardItem key={idx} board={board} />
        ))}
      </BoardBox>
      <BoardBox
        studyId={studyId}
        key={"studyBoards"}
        boardLabel="과제 게시판"
        postBoard={postBoard("studyBoards")}
        teamMembers={teamMembers}
      >
        {studyBoards.map((board) => (
          <StudyBoardItem key={board.boardClientId} board={board} />
        ))}
      </BoardBox>
    </div>
  );
}

export default React.memo(Feedback);
