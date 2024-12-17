import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import CommentItem from "@/components/organisms/CommentItem";
import { TBoard_Client } from "@/types/study";
import React, { useRef, useState } from "react";
import Button from "@/components/molecules/Button";

type CommentSection = {
  commentIds: TBoard_Client["commentIds"];
  comments: TBoard_Client["comments"];
  handleEditComment: (commentId: string, updatedCommentText: string) => void;
  handleAddComment: (commentText: string) => void;
  handleDeleteComment: (commentId: string) => void;
};

function CommentSection(props: CommentSection) {
  const {
    comments,
    commentIds,
    handleEditComment,
    handleAddComment,
    handleDeleteComment,
  } = props;

  console.log(commentIds);
  console.log(comments);

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null); // 활성 메뉴의 ID
  // 현재 열려있는 메뉴창

  const [commentIdToEdit, setCommentIdToEdit] = useState("");
  // 현재 수정하려는 댓글의 ID

  const handleMenuToggle = (commentId: string) => {
    console.log(`currentActiveMenuId=${activeMenuId}`);
    setActiveMenuId((prev) => (prev === commentId ? null : commentId)); // 동일한 ID를 누르면 닫음
  };
  const [comment, setComment] = useState("");
  const [mode, setMode] = useState<"normal" | "edit">("normal");
  // mode가 edit일 경우 수정할 댓글은?

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setComment(value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const getToEditMode = (commentId: string) => {
    // input 활성화 하고 input의 vlaue를 수정하려는 댓글로 함
    setMode("edit");
    const newCommentText = comments[commentId].text;
    setComment((prev) => newCommentText);
    setCommentIdToEdit((prev) => commentId);
    setActiveMenuId((prev) => ""); // 창 닫음
  };
  const goToNormalMode = () => {
    setMode("normal");
    setComment("");
  };

  const onClickEditBtn = () => {
    if (!commentIdToEdit) {
      alert("수정하려는 댓글이 없습니다.");
      return;
    }
    handleEditComment(commentIdToEdit, comment);
    goToNormalMode();
    setCommentIdToEdit((prev) => "");
  };

  const onClickAddBtn = () => {
    handleAddComment(comment);
  };

  const onClickDelete = (commentId: string) => {
    handleDeleteComment(commentId);
  };

  return (
    <div>
      <div className="flex justify-between px-2 pt-2 pb-4">
        <Text size="xs" weight="bold">
          댓글 {commentIds.length}
        </Text>
        <div className="text-xs flex gap-3">
          <Text color="gray-800">등록순</Text>
          <Text color="gray-800">최신순</Text>
        </div>
      </div>
      {/* 댓글 부분 */}
      <div className="flex flex-col gap-4">
        {commentIds.map((commentId) => (
          <CommentItem
            getToEditMode={getToEditMode}
            key={comments[commentId].commentId}
            {...comments[commentId]}
            isMenuOpen={activeMenuId === commentId} // 활성 상태 전달
            onMenuToggle={handleMenuToggle}
            onClickDelete={() => {
              onClickDelete(commentId);
            }}
          />
        ))}
      </div>
      {/* 댓글 입력창 부분 */}
      <div className="mt-3 py-2 pl-4 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="댓글을 입력해주세요"
          className="flex-[1] bg-gray-200 p-2 text-xs placeholder:text-xs rounded-xl focus:outline-none"
          value={comment}
          onChange={onChangeComment}
        />
        {mode === "normal" ? (
          <Button
            theme="primary"
            extraCss=" p-2 rounded-full"
            onClick={onClickAddBtn}
          >
            <Icon type="ADD" height={15} width={15} />
          </Button>
        ) : (
          <div className="flex gap-1">
            <Button
              theme="primary"
              extraCss=" p-2 rounded-full"
              onClick={onClickEditBtn}
            >
              <Text size="xs">완료</Text>
            </Button>
            <Button
              theme="secondary"
              extraCss=" p-2 rounded-full"
              onClick={goToNormalMode}
            >
              <Text size="xs">취소</Text>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
