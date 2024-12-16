import React, { forwardRef } from "react";
import Text from "../atoms/Text";

type CommentMenuProps = {
  onEdit: () => void; // 수정 이벤트 핸들러
  onDelete: () => void; // 삭제 이벤트 핸들러
};

// forwardRef를 사용해 ref를 전달받는 컴포넌트로 수정
const CommentMenu = forwardRef<HTMLDivElement, CommentMenuProps>(
  ({ onEdit, onDelete }, ref) => {
    return (
      <div
        ref={ref} // 부모에서 전달한 ref를 div 요소에 연결
        className="absolute top-0 right-5 mt-2 w-24 bg-white shadow-md rounded-md overflow-hidden z-10"
      >
        {/* 수정 버튼 */}
        <div
          onClick={onEdit}
          className="px-4 py-2 cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <Text size="sm" className="gray-700">
            수정
          </Text>
        </div>

        {/* 삭제 버튼 */}
        <div
          onClick={onDelete} // 삭제 이벤트 핸들러
          className="px-4 py-2 cursor-pointer hover:bg-gray-300 transition-colors"
        >
          <Text size="sm" className="red-500">
            삭제
          </Text>
        </div>
      </div>
    );
  }
);

// displayName 설정 (디버깅 편의성 제공)
CommentMenu.displayName = "CommentMenu";

export default CommentMenu;
