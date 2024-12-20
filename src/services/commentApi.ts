import { TBoard_Server } from "@/types/study"; // 서버 데이터 타입 import
export const addCommentToServer = async (
  boardClientId: string,
  studyId: string,
  commentId: string,
  commentText: string,
  writerEmail: string
) => {
  const response = await fetch(
    `/board/${boardClientId}/api?studyId=${studyId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, commentText, writerEmail }),
    }
  );

  if (!response.ok) throw new Error("Failed to add comment");
  return (await response.json()).comment;
};

export const updateCommentOnServer = async (
  boardClientId: string,
  studyId: string,
  commentId: string,
  updatedCommentText: string
) => {
  const response = await fetch(
    `/board/${boardClientId}/api?studyId=${studyId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, updatedCommentText }),
    }
  );

  if (!response.ok) throw new Error("Failed to update comment");
  return (await response.json()).updatedComment;
};

export const deleteCommentOnServer = async (
  boardClientId: string,
  studyId: string,
  commentId: string
) => {
  const response = await fetch(
    `/board/${boardClientId}/api?studyId=${studyId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId }),
    }
  );

  if (!response.ok) throw new Error("Failed to delete comment");
};

// 해당 boardId로 서버에서 board를 가져오는 로직

export const fetchBoardData = async (
  boardClientId: string,
  studyId: string
): Promise<TBoard_Server> => {
  try {
    const res = await fetch(`/board/${boardClientId}/api?studyId=${studyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data: TBoard_Server = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to fetch board data: ${res.status}`);
    }
    console.log("fetched board!");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error in fetchBoardData:", error);
    throw error;
  }
};
