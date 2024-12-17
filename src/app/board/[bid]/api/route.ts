import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB 연결을 위한 유틸 함수
import Board from "@/models/Board"; // Board 모델
import Study from "@/models/Study";
import { TComment, TStudyMember } from "@/types/study";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { bid: string } }
) {
  await dbConnect();

  const boardClientId = params.bid; // boardClientId (경로에서 받은 값)
  const studyId = req.nextUrl.searchParams.get("studyId"); // studyId (쿼리스트링에서 받은 값)

  if (!boardClientId || !studyId) {
    return NextResponse.json(
      { error: "Missing boardClientId or studyId" },
      { status: 400 }
    );
  }

  try {
    // Board 모델에서 boardClientId로 게시판을 찾음
    const board = await Board.findOne({ boardClientId });

    console.log("board");
    console.log(board);

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    // studyId를 기준으로 추가적인 필터링이나 작업이 필요할 수 있음
    // 예를 들어, 특정 studyId가 board에 포함된 경우에만 데이터를 반환할 수 있도록 처리
    if (board.studyId !== studyId) {
      console.log(`board.studyId=${board.studyId}`);
      console.log(`studyId=${studyId}`);

      return NextResponse.json({ error: "Study mismatch" }, { status: 404 });
    }

    // board 데이터를 클라이언트로 반환
    return NextResponse.json(board, { status: 200 });
  } catch (error) {
    console.error("Error fetching board:", error);
    return NextResponse.json(
      { error: "Failed to fetch board" },
      { status: 500 }
    );
  }
}

// post

const handleAddComment = async (
  studyId: string,
  boardClientId: string,
  commentText: string,
  writerEmail: string,
  commentId: string
) => {
  console.log("handleAddComment called!");

  try {
    // 1. studyId로 study 찾기
    const study = await Study.findById(studyId);
    if (!study) {
      return NextResponse.json({ error: "Study not found" }, { status: 500 });
    }

    // 2. boardId로 해당 board 찾기
    const board = await Board.findOne({ studyId, boardClientId });
    if (!board) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    // 3. study의 currentMembers에서 사용자 이메일로 사용자 찾기
    const currentMember = study.currentMembers.find(
      (member: TStudyMember) => member.userEmail === writerEmail
    );
    if (!currentMember) {
      return NextResponse.json(
        { message: "User not found in study" },
        { status: 404 }
      );
    }

    // 4. 사용자의 imgSrc, 이름, 역할 가져오기
    const { userName, applicantImgSrc, role } = currentMember;

    // 5. board의 comment에 댓글 추가
    const newComment = {
      Id: commentId,
      writerEmail,
      writerName: userName,
      writerImg: applicantImgSrc,
      writerRole: role,
      text: commentText,
      createdAt: new Date(),
      replies: [],
    };

    // 댓글을 board의 comment 배열에 추가
    board.comments.push(newComment);
    await board.save();

    // 댓글 추가 완료 후 응답
    return NextResponse.json(
      { message: "Comment added", comment: newComment },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
};

export async function POST(
  req: NextRequest,
  { params }: { params: { bid: string } }
) {
  console.log("board post called!");

  await dbConnect(); // DB 연결

  const studyId = req.nextUrl.searchParams.get("studyId"); // studyId (쿼리스트링에서 받은 값)
  const boardClientId = params.bid; // boardClientId (경로에서 받은 값)
  const { commentText, writerEmail, commentId } = await req.json(); // 요청 바디에서 commentText, writerEmail 추출

  if (!boardClientId || !studyId) {
    return NextResponse.json(
      { error: "Missing boardClientId or studyId" },
      { status: 400 }
    );
  }

  return await handleAddComment(
    studyId,
    boardClientId,
    commentText,
    writerEmail,
    commentId
  );
}

const handleEditComment = async (
  studyId: string,
  boardClientId: string,
  commentId: string,
  updatedCommentText: string
) => {
  console.log("handleEditComment called!");

  try {
    // 2. boardId로 해당 board 찾기
    const board = await Board.findOne({ studyId, boardClientId });
    if (!board) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    // 3. board에서 commentId로 댓글 찾기
    const comment = board.comments.find(
      (comment: TComment) => comment.Id === commentId
    );
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    // 4. 댓글 내용 업데이트
    comment.text = updatedCommentText;
    comment.updatedAt = new Date(); // 수정 시간 추가 (필요 시)

    // 5. 수정된 board 저장
    await board.save();

    // 6. 수정된 댓글 응답
    return NextResponse.json(
      { message: "Comment updated", updatedComment: comment },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to edit comment" },
      { status: 500 }
    );
  }
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { bid: string } }
) {
  console.log("board patch called!");

  await dbConnect(); // DB 연결

  const studyId = req.nextUrl.searchParams.get("studyId"); // studyId (쿼리스트링에서 받은 값)
  const boardClientId = params.bid; // boardClientId (경로에서 받은 값)
  const { commentId, updatedCommentText } = await req.json(); // 요청 바디에서 commentId와 updatedCommentText 추출

  if (!boardClientId || !studyId) {
    return NextResponse.json(
      { error: "Missing boardClientId or studyId" },
      { status: 400 }
    );
  }

  return await handleEditComment(
    studyId,
    boardClientId,
    commentId,
    updatedCommentText
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { bid: string } }
) {
  console.log("board delete called!");

  await dbConnect(); // 데이터베이스 연결

  const studyId = req.nextUrl.searchParams.get("studyId"); // 쿼리스트링에서 studyId 가져오기
  const boardClientId = params.bid; // 경로에서 boardClientId 가져오기
  const { commentId } = await req.json(); // 요청 바디에서 commentId 가져오기

  // 필수 데이터 검증
  if (!boardClientId || !studyId || !commentId) {
    return NextResponse.json(
      { error: "Missing parameters: boardClientId, studyId, or commentId" },
      { status: 400 }
    );
  }

  try {
    // 해당 board를 찾기
    const board = await Board.findOne({ studyId, boardClientId });
    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    // 댓글 삭제
    const commentIndex = board.comments.findIndex(
      (comment: TComment) => comment.Id === commentId
    );

    if (commentIndex === -1) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // 댓글 배열에서 해당 댓글 제거
    board.comments.splice(commentIndex, 1);

    // 업데이트된 board 저장
    await board.save();

    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
