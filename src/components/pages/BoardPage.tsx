"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { TBoard_Client, TBoard_Server, TComment } from "@/types/study";
import Header from "@/components/organisms/Header";
import Icon from "@/components/atoms/Icon";
import Loading from "@/components/templates/common/Loading";
import UserInfoItem from "@/components/molecules/UserInfoItem";
import Text from "@/components/atoms/Text";
import Image from "@/components/atoms/Image";
import CommentSection from "../templates/Board/CommentSection";
import { UserStatusContext } from "../organisms/auth-components/UserStatusProvider";
import { v4 } from "uuid";

const initialBoardState: TBoard_Client = {
  boardClientId: "", // boardClientId는 비어있는 문자열로 시작
  studyId: "", // studyId도 비어있음
  writerEmail: "", // 작성자 이메일도 빈 문자열
  writerImg: "", // 작성자 이미지 URL이나 경로는 빈 문자열로 설정
  writerName: "", // 작성자 이름은 빈 문자열
  view: 0, // 조회수는 0
  title: "", // 제목은 빈 문자열
  text: "", // 본문은 빈 문자열
  imgSrces: [], // 이미지 경로 배열은 빈 배열
  readingRequired: false, // 읽기 필수 여부는 false
  commentIds: [], // 댓글 ID는 빈 배열로 초기화
  comments: {}, // 댓글은 빈 객체로 초기화
};

export function boardAdapter(board: TBoard_Server): TBoard_Client {
  if (!board.comments || board.comments.length === 0) {
    return {
      ...board,
      commentIds: [],
      comments: {},
    };
  }

  const commentIds = board.comments.map((comment) => comment.commentId);
  const commentsMap = Object.fromEntries(
    board.comments.map((comment) => [comment.commentId, comment])
  );

  const { comments, ...rest } = board;

  return {
    ...rest,
    commentIds,
    comments: commentsMap,
  };
}

function BoardPage() {
  const { session } = useContext(UserStatusContext);

  if (!session?.user) return;

  const myEmail = session.user.email;
  const myName = session.user.name;
  const myImage = session.user.image;

  const bid = useParams<{ bid: string }>().bid;
  const studyId = useSearchParams().get("studyId"); // 쿼리스트링에서 studyId를 가져옴
  const router = useRouter();

  const [board, setBoard] = useState<TBoard_Client>(initialBoardState); // board 데이터를 상태로 관리

  const handleAddComment = async (commentText: string) => {
    // 클라이어트
    const commentId = v4();
    const newComment = {
      commentId,
      writerEmail: myEmail,
      writerName: myName,
      writerImg: myImage,
      text: commentText,
    };
    setBoard((prev) => {
      // prev.commentIds가 배열인지 확인하고 안전하게 처리
      const updatedCommentIds = Array.isArray(prev.commentIds)
        ? [...prev.commentIds, newComment.commentId]
        : [newComment.commentId];

      return {
        ...prev,
        comments: {
          ...prev.comments,
          [newComment.commentId]: newComment, // 댓글을 comments 객체에 추가
        },
        commentIds: updatedCommentIds, // 배열로 업데이트
      };
    });

    //서버
    console.log("handleAddComment called!");

    try {
      const response = await fetch(
        `/board/${board?.boardClientId}/api?studyId=${studyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId,
            commentText,
            writerEmail: myEmail,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { comment } = data; // 서버에서 추가된 댓글 객체
        console.log(comment);
        setBoard((prev) => {
          return {
            ...prev,
            comments: {
              ...prev.comments,
              [comment.commentId]: comment,
            },
          };
        });
      } // 서버에서 가져온 writerImg, writerName,등 추가
    } catch (err) {
      console.error(err);
      const rollbackedBoard = { ...board };
      rollbackedBoard.commentIds.pop();
      delete rollbackedBoard.comments[commentId];
      setBoard(rollbackedBoard);
    }
  };

  // 클라이언트 상태 업데이트 함수
  const updateCommentLocally = (
    commentId: string,
    updatedCommentText: string
  ) => {
    setBoard((prev) => {
      // 존재하지 않는 commentId라면 에러 처리
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
            text: updatedCommentText, // 텍스트 업데이트
          },
        },
      };
    });
  };

  // 서버 요청 함수
  const updateCommentOnServer = async (
    boardClientId: string,
    studyId: string,
    commentId: string,
    updatedCommentText: string
  ) => {
    try {
      const response = await fetch(
        `/board/${boardClientId}/api?studyId=${studyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId,
            updatedCommentText,
            writerEmail: myEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update comment: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Updated comment from server:", data.updatedComment);
      return data.updatedComment; // 서버에서 반환된 업데이트된 댓글
    } catch (error) {
      console.error("Error updating comment on server:", error);
      throw error; // 에러를 상위로 전달
    }
  };

  // 통합 함수
  const handleEditComment = async (
    commentId: string,
    updatedCommentText: string
  ) => {
    // 클라이언트에서 상태 업데이트
    updateCommentLocally(commentId, updatedCommentText);

    // 서버 요청
    try {
      const updatedComment = await updateCommentOnServer(
        board?.boardClientId!,
        studyId!,
        commentId,
        updatedCommentText
      );

      // 서버 응답에 따라 상태 동기화 (추가 속성 업데이트 가능)
      setBoard((prev) => ({
        ...prev,
        comments: {
          ...prev.comments,
          [updatedComment.commentId]: updatedComment,
        },
      }));
    } catch (error) {
      console.error("Rolling back local state due to server error...");

      // 상태 롤백: 서버 요청 실패 시 클라이언트 상태 복구
      setBoard((prev) => {
        if (!prev.comments[commentId]) return prev;

        return {
          ...prev,
          comments: {
            ...prev.comments,
            [commentId]: {
              ...prev.comments[commentId],
              text: prev.comments[commentId].text, // 이전 텍스트로 복구
            },
          },
        };
      });
    }
  };

  // 클라이언트 상태 업데이트 함수
  const deleteCommentLocally = (commentId: string) => {
    setBoard((prev) => {
      if (!prev.comments[commentId]) {
        // 해당 댓글이 없으면 없다고 표시
        console.error(`Comment with ID ${commentId} not found`);
        return prev;
      }

      const updatedComments = { ...prev.comments };
      delete updatedComments[commentId];
      // 댓글 내용 삭제

      const updatedCommentIds = prev.commentIds.filter(
        (id) => id !== commentId
      );
      // 댓글 id 삭제

      return {
        ...prev,
        comments: updatedComments,
        commentIds: updatedCommentIds,
      };
      // 클라이언트 업데이트
    });
  };

  // 서버 요청 함수
  const deleteCommentOnServer = async (
    boardClientId: string,
    studyId: string,
    commentId: string
  ) => {
    try {
      const response = await fetch(
        `/board/${boardClientId}/api?studyId=${studyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete comment: ${response.statusText}`);
      }

      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment on server:", error);
      throw error;
    }
  };

  // 통합 함수
  const handleDeleteComment = async (commentId: string) => {
    // 클라이언트 상태 업데이트
    deleteCommentLocally(commentId);

    // 서버 요청
    try {
      await deleteCommentOnServer(board?.boardClientId!, studyId!, commentId);
    } catch (error) {
      console.error("Rolling back local state due to server error...");

      // 상태 롤백: 삭제 실패 시 복구
      setBoard((prev) => {
        const originalComment = board?.comments[commentId];
        if (!originalComment) return prev;

        return {
          ...prev,
          comments: {
            ...prev.comments,
            [commentId]: originalComment, // 원래 댓글 복구
          },
          commentIds: [...prev.commentIds, commentId],
        };
      });
    }
  };

  useEffect(() => {
    // boardId(bid)와 studyId가 존재하면 해당 board를 가져오는 로직 실행
    if (bid && studyId) {
      fetchBoardData(bid as string, studyId as string);
    }
  }, [bid, studyId]);

  // 해당 boardId로 서버에서 board를 가져오는 로직
  const fetchBoardData = async (boardClientId: string, studyId: string) => {
    try {
      const res = await fetch(`/board/${boardClientId}/api?studyId=${studyId}`);
      const data = await res.json();

      if (res.ok) {
        // 여기서 클라이언트 형식으로 바꿔줘야 함
        const fetchedBoard = boardAdapter(data);
        setBoard(fetchedBoard); // board 데이터를 상태에 저장
        console.log(fetchedBoard);
        // 지금 서버에서 가져오는 board Data랑 클라이언트의 boardData랑 좀 다름
      } else {
        console.error("Error fetching board data:", data);
      }
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  if (!board.boardClientId) return <Loading />;

  return (
    <section className="px-4 py-5 flex flex-col gap-4">
      <Header
        // position="absolute"
        leftSlot={
          <Icon
            type="BACK"
            onClick={() => {
              router.back();
            }}
          />
        }
        rightSlot={
          <div className="flex gap-[12px] items-center">
            <Icon type="SHARE" />
            <Icon type="MORE" />
          </div>
        }
      />{" "}
      <UserInfoItem
        imgSrc={board.writerImg}
        topText={
          <Text size="sm" weight="bold">
            {board.writerName}
          </Text>
        }
        bottomText={
          <Text size="xs" color="gray-600" weight="bold">
            {board.writerRole}
          </Text>
        }
      />
      <Text size="base" weight="bold">
        {board.title}
      </Text>
      <Text size="sm" weight="bold">
        {board.text}
      </Text>
      <div className="flex flex-col gap-3 justify-center items-center">
        {board.imgSrces.map((imgSrc, idx) => (
          <Image key={idx} src={imgSrc as string} width={300} height={300} />
        ))}
      </div>
      <CommentSection
        commentIds={board["commentIds"]}
        comments={board["comments"]}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        handleEditComment={handleEditComment}
      />
    </section>
  );
}

export default BoardPage;
