import { uploadImagesToCloudinary } from "@/lib/cloudinary";
import dbConnect from "@/lib/mongodb";
import Board from "@/models/Board";
import Study from "@/models/Study";
import { NextResponse } from "next/server";

const postBoard = async (formData: FormData) => {
  console.log("postBoard called");

  const boardImages = formData.getAll("boardImages") as File[]; // 여러 개의 파일 가져오기
  const boardDataString = formData.get("boardData") as string;
  const studyId = formData.get("studyId") as string;
  const boardType = formData.get("boardType") as string;
  const boardData = JSON.parse(boardDataString);

  try {
    let imageUrls = null;

    if (boardImages.length) {
      // 이미지가 있을 경우 Cloudinary에 업로드
      imageUrls = await uploadImagesToCloudinary(
        boardImages,
        "sturing/studyBoardImages"
      );

      console.log(`imageUrls=${imageUrls}`);

      // boardData에 이미지 URL 추가
      boardData.imgSrces = imageUrls;
    }

    const study = await Study.findById(studyId);
    // 스터디를 찾음
    if (!study) {
      return NextResponse.json({ message: "Study not found" }, { status: 404 });
    }

    console.log(`boardType=${boardType}`);

    // Board 도큐먼트를 생성하여 저장
    const newBoard = new Board({
      ...boardData, // 기존 게시판 데이터
      createdAt: new Date(), // 생성일 추가
      view: 0, // 초기 조회수 설정
    });

    // 게시판 도큐먼트 저장
    await newBoard.save();

    // 게시판의 _id만 study[boardType]에 추가
    study[boardType].push(newBoard._id);

    // 스터디에 새 게시판이 추가된 후 스터디 도큐먼트를 저장
    await study.save();

    return NextResponse.json({ message: "Board added successfully" });
  } catch (error) {
    console.error("Error adding board:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export async function POST(req: Request) {
  await dbConnect();

  console.log("formData/api called");

  const formData = await req.formData();

  console.log("formData");
  console.log(formData);

  console.log(`hasFormData=${formData.has("boardImages")}`);
  const boardImages = formData.getAll("boardImages");

  console.log("boardImages");
  console.log(boardImages);

  try {
    return await postBoard(formData);
  } catch (error) {
    console.error("Error adding Board:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
