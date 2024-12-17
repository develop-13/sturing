import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SessionUser } from "@/app/utils/authOptions";
import { TBoard_Client } from "@/types/study";
import {
  addCommentToServer,
  updateCommentOnServer,
  deleteCommentOnServer,
  fetchBoardData,
} from "@/services/commentApi";
import { boardAdapter } from "@/adapters/adapters";

type StatusType = "loading" | "hasBoard" | "error";

// 커스텀 훅: 댓글 관리
const useCommentActions = (
  initialBoard: TBoard_Client,
  studyId: string,
  bid: string
) => {
  // 위와 같이 공통으로 쓰이는 매개변수는 상위 스코프에서 받게 하고
  // 각 ,action함수들이 개별적으로 필요한 매개변수들은 각 action 함수들이 받게끔 하는
  //구조.. 기억해두자..

  const [board, setBoard] = useState<TBoard_Client>(initialBoard);
  const [status, setStatus] = useState<StatusType>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadBoardData = async () => {
      setStatus("loading"); // 로딩 시작
      try {
        const fetchedBoard = await fetchBoardData(bid, studyId);

        setBoard(boardAdapter(fetchedBoard));
        setStatus("hasBoard"); // 데이터 로드 성공
      } catch (error) {
        console.error("Failed to load board data:", error);
        setErrorMessage("Failed to load board data");
        setStatus("error"); // 에러 상태
      }
    };

    if (bid && studyId) {
      loadBoardData();
    }
  }, [bid, studyId]);

  /** ------------------------
   * 클라이언트 상태 업데이트 함수
   * ------------------------ */
  const addCommentToState = (newComment: {
    commentId: string;
    writerEmail: string;
    writerName: string;
    writerImg?: string;
    text: string;
  }) => {
    setBoard((prev) => ({
      ...prev,
      comments: {
        ...prev.comments,
        [newComment.commentId]: newComment,
      },
      commentIds: [...prev.commentIds, newComment.commentId],
    }));
  };

  const updateCommentLocally = (
    commentId: string,
    updatedCommentText: string
  ) => {
    setBoard((prev) => {
      if (!prev.comments[commentId]) {
        console.error(`Comment with ID ${commentId} not found`);
        return prev;
      }
      return {
        ...prev,
        comments: {
          ...prev.comments,
          [commentId]: {
            ...prev.comments[commentId],
            text: updatedCommentText,
          },
        },
      };
    });
  };

  const deleteCommentLocally = (commentId: string) => {
    setBoard((prev) => {
      if (!prev.comments[commentId]) {
        console.error(`Comment with ID ${commentId} not found`);
        return prev;
      }
      const updatedComments = { ...prev.comments };
      delete updatedComments[commentId];

      const updatedCommentIds = prev.commentIds.filter(
        (id) => id !== commentId
      );

      return {
        ...prev,
        comments: updatedComments,
        commentIds: updatedCommentIds,
      };
    });
  };

  /** ------------------------
   * 댓글 추가 함수
   * ------------------------ */
  const addCommentAction = async (
    commentText: string,
    userInfo: SessionUser
  ) => {
    const { email, name, image } = userInfo;

    const commentId = uuidv4();
    const newComment = {
      commentId,
      writerEmail: email,
      writerName: name,
      writerImg: image,
      text: commentText,
    };

    // 상태 업데이트
    addCommentToState(newComment);

    // 서버 요청
    try {
      const commentFromServer = await addCommentToServer(
        board.boardClientId,
        studyId,
        commentId,
        commentText,
        email
      );

      // 서버 데이터로 상태 동기화
      setBoard((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [commentFromServer.commentId]: commentFromServer,
        },
      }));
    } catch (error) {
      console.error("Error adding comment, rolling back local state.");
      deleteCommentLocally(commentId); // 실패 시 롤백
    }
  };

  /** ------------------------
   * 댓글 수정 함수
   * ------------------------ */
  const editCommentAction = async (
    commentId: string,
    updatedCommentText: string
  ) => {
    // 상태 업데이트
    updateCommentLocally(commentId, updatedCommentText);

    // 서버 요청
    try {
      const updatedComment = await updateCommentOnServer(
        board.boardClientId!,
        studyId,
        commentId,
        updatedCommentText
      );

      // 서버 응답에 따라 상태 동기화
      setBoard((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [updatedComment.commentId]: updatedComment,
        },
      }));
    } catch (error) {
      console.error("Error updating comment, rolling back local state.");
      // 이전 상태로 롤백
      setBoard((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [commentId]: {
            ...prev.comments[commentId],
            text: prev.comments[commentId].text,
          },
        },
      }));
    }
  };

  /** ------------------------
   * 댓글 삭제 함수
   * ------------------------ */
  const deleteCommentAction = async (commentId: string) => {
    // 상태 업데이트
    const originalComment = board.comments[commentId];
    deleteCommentLocally(commentId);

    // 서버 요청
    try {
      await deleteCommentOnServer(board.boardClientId!, studyId, commentId);
    } catch (error) {
      console.error("Error deleting comment, rolling back local state.");
      // 삭제 실패 시 원래 상태 복구
      setBoard((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [commentId]: originalComment,
        },
        commentIds: [...prev.commentIds, commentId],
      }));
    }
  };

  return {
    board,
    status,
    errorMessage,
    addCommentAction,
    editCommentAction, // 수정된 이름
    deleteCommentAction, // 수정된 이름
  };
};

export default useCommentActions;
