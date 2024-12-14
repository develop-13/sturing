import { uploadImagesToCloudinary } from "@/lib/cloudinary";
import dbConnect from "@/lib/mongodb";
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
      // 이미지가 없을수도 있으니까

      imageUrls = await uploadImagesToCloudinary(
        boardImages,
        "sturing/studyBoardImages"
      );

      console.log(`imageUrls=${imageUrls}`);

      boardData.imgSrces = imageUrls;
    }

    const study = await Study.findById(studyId);

    console.log(`boardType=${boardType}`);
    console.log(study[boardType]);

    study[boardType].push(boardData);

    await study.save();
    // 여기까지는 스터디만 저장 해놓은 상태?

    return NextResponse.json({ message: "board added successfully" });
  } catch (error) {
    console.error("Error adding Board:", error);
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
