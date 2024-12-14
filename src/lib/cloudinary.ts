import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Cloudinary 초기화
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary에 이미지를 업로드하고 이미지 URL을 반환하는 함수
export const uploadImagesToCloudinary = async (
  files: File | File[], // 하나의 파일 또는 여러 파일
  folder: string // Cloudinary에 저장될 폴더
): Promise<string[]> => {
  const filesArray = Array.isArray(files) ? files : [files]; // 여러 파일 처리, 아니면 하나의 파일을 배열로 변환

  // 파일 업로드를 위한 Promise 배열
  const uploadPromises = filesArray.map((file) => {
    return new Promise<string>((resolve, reject) => {
      // 파일을 ArrayBuffer로 읽기
      file
        .arrayBuffer()
        .then((buffer) => {
          // ArrayBuffer를 Node.js Buffer로 변환
          const bufferStream = new Readable();
          bufferStream.push(Buffer.from(buffer));
          bufferStream.push(null); // 스트림 종료

          // Cloudinary로 업로드 스트림을 시작
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto", // 자동으로 파일 유형을 감지
              folder: folder, // 이미지가 저장될 폴더
            },
            (error, result) => {
              // result로 먼저 clodinary의 파일 공간을 만든 후 실제
              //bufferStream.pipe(stream); 이 부분으로 실제 값을 집어 넣음

              if (error) {
                reject(error);
              } else {
                resolve(result?.secure_url || ""); // 업로드된 이미지의 URL 반환
              }
            }
          );

          // 파일 스트림을 Cloudinary 업로드 스트림에 연결
          bufferStream.pipe(stream);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

  // 모든 이미지 업로드가 완료될 때까지 기다리기
  return Promise.all(uploadPromises);
};
