import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import path from "path";
import { createWriteStream, ReadStream } from "fs";

import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";

export async function POST(req: NextRequest) {
  try {
    // MongoDB 연결
    await dbConnect();

    // FormData 파싱
    const formData = await req.formData();
    // formData의 타입은 formData 타입

    console.log("formData");
    console.log(formData);

    const file = formData.get("studyImgSrc");
    // file의 타입은 FormDataEntryValue | null
    //FormDataEntryValue 는 string 과 File 타입
    // 즉, file의 타입은 string | File | null

    console.log("file");
    console.log(file);
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file data" }, { status: 400 });
    }
    const studyDataString = formData.get("studyData") as string | null;

    console.log("studyDataString");
    console.log(studyDataString);

    if (!studyDataString) {
      return NextResponse.json(
        { error: "Study data is required" },
        { status: 400 }
      );
    }
    const studyData = JSON.parse(studyDataString);
    console.log("studyData");
    console.log(studyData);

    // 파일 저장 경로 설정
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    console.log("uniqueSuffix");
    console.log(uniqueSuffix);

    const filename =
      file instanceof File
        ? `studyImage-${uniqueSuffix}${path.extname(file.name)}`
        : `studyImage-${uniqueSuffix}`;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    // file.name에서 name메서드는 File 타입에만 존재하는데 file이 string | File | null 이니까
    // File 타입의 객체일때만 file.name을 사용할 수 있도록 함
    // 파일 데이터를 Buffer로 읽기

    console.log("filename");
    console.log(filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("arrayBuffer");
    console.log(arrayBuffer);

    console.log("buffer");
    console.log(buffer);

    // Buffer를 사용하여 파일 저장
    await new Promise<void>((resolve, reject) => {
      const writeStream = createWriteStream(filepath);
      console.log("writeStream 생성 완료");

      writeStream.write(buffer, (err) => {
        if (err) {
          console.error("Buffer 쓰기 오류:", err);
          reject(err);
        }
      });

      writeStream.end();
      writeStream.on("finish", () => {
        console.log("파일 저장 완료");
        resolve();
      });
      writeStream.on("error", (err) => {
        console.error("파일 쓰기 스트림 에러:", err);
        reject(err);
      });
    });

    // if (file instanceof File) {
    //   console.log("file은 File 객체입니다");
    //   //파일 객체 확인: file이 File 객체인지 확인합니다.
    //   const nodeReadableStream = toNodeReadable(file.stream()); // Web ReadableStream을 Node.js Readable로 변환
    //   //스트림 변환: file.stream()으로 받은 브라우저 ReadableStream을 Node.js Readable 스트림으로 변환합니다.
    //   await pump(nodeReadableStream, createWriteStream(filepath));
    //   //파일 쓰기: 변환된 스트림을 통해 데이터를 파일로 저장합니다.
    //   // 읽기 스트림을 연결하여 쓰기스트림으로
    //   // 즉 읽기 스트림에서 데이터를 읽어서 filePath에 씀
    //   console.log("파일 쓰기 ok");
    // }

    const imageUrl = `/uploads/${filename}`;
    console.log("imageUrl");
    console.log(imageUrl);

    // Mongoose 모델 사용하여 데이터 저장
    const studyDocument = new Study({
      ...studyData,
      imgSrc: imageUrl,
      status: "recruiting",
    });

    console.log("studyDocument");
    console.log(studyDocument);

    const savedStudy = await studyDocument.save().catch((error: unknown) => {
      if (error instanceof Error) {
        console.error("Error saving study document:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      // 추가적인 에러 핸들링
    });
    console.log("savedStudy");
    console.log(savedStudy);

    return NextResponse.json({
      message: "Study created successfully",
      imageUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create study" },
      { status: 500 }
    );
  }
}
