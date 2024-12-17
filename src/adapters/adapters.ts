import { TIconData } from "@/components/atoms/Icon";
import { TBoard_Client, TBoard_Server } from "@/types/study";

export const iconAdapter = (text: string): TIconData["type"] => {
  if (text.toUpperCase() as TIconData["type"]) {
    return text.toUpperCase() as TIconData["type"];
  } else {
    return "ADD";
  }
};

export const getBlobStringAdapter = (imgSrc: Blob) => {
  //blob을 string으로 바꿔줌
  return URL.createObjectURL(imgSrc);
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
