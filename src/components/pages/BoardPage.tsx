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
import useCommentActions from "@/hooks/useCommentActions";

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

function BoardPage() {
  const { session } = useContext(UserStatusContext);
  const bid = useParams<{ bid: string }>().bid;
  const studyId = useSearchParams().get("studyId"); // 쿼리스트링에서 studyId를 가져옴

  if (!studyId || !session?.user || !bid) return;
  const router = useRouter();

  const {
    board,
    status,
    addCommentAction,
    editCommentAction,
    deleteCommentAction,
  } = useCommentActions(initialBoardState, studyId, bid);

  const handleAddComment = async (commentText: string) => {
    await addCommentAction(commentText, session.user);
  };

  const handleEditComment = async (
    commentId: string,
    updatedCommentText: string
  ) => {
    await editCommentAction(commentId, updatedCommentText);
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteCommentAction(commentId);
  };

  // if (!board.boardClientId) return <Loading />;
  if (status === "loading") return <Loading />;

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
