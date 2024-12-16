import { TComment } from "@/types/study";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import UserInfoItem from "../molecules/UserInfoItem";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";
import CommentMenu from "../molecules/commentMenu";

type TCommentItem = TComment & {
  getToEditMode: (commentId: string) => void;
  onClickDelete: () => void;
  isMenuOpen: boolean;
  onMenuToggle: (commentId: string) => void;
};

function CommentItem(props: TCommentItem) {
  const {
    commentId,
    writerImg,
    writerName,
    writerRole,
    text,
    getToEditMode,
    onClickDelete,
    isMenuOpen,
    onMenuToggle,
  } = props;

  const menuRef = useRef<HTMLDivElement>(null); // CommentMenu의 ref

  const handleEdit = () => {
    getToEditMode(commentId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // 메뉴 외부 클릭 시 메뉴 닫기
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest(".commentMenuBtn")
      ) {
        onMenuToggle(""); // 메뉴 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onMenuToggle]);

  return (
    <div key={commentId} className="flex flex-col gap-2 relative">
      <div className="flex justify-between items-center">
        <UserInfoItem
          imgSrc={writerImg as string}
          topText={
            <Text size="sm" weight="bold">
              {writerName}
            </Text>
          }
          bottomText={
            <Text size="xs" color="gray-600" weight="bold">
              {writerRole}
            </Text>
          }
        />
        <div
          className="w-[20px] h-[20px] flex items-center justify-center rounded-full hover:bg-gray-300 cursor-pointer z-50 commentMenuBtn "
          onClick={() => onMenuToggle(commentId)} // 상위 상태 업데이트
        >
          <Icon type="MORE" className="rotate-90" width={15} height={15} />
        </div>
      </div>
      {isMenuOpen && (
        <CommentMenu
          ref={menuRef}
          onEdit={handleEdit}
          onDelete={onClickDelete}
        />
      )}
      <div className="flex">
        <div className="w-[52px]"></div>
        <Text>{text}</Text>
      </div>
    </div>
  );
}

export default CommentItem;
