import React, { useContext, useState } from "react";
import Icon from "../atoms/Icon";
import Button from "../molecules/Button";
import { v4 } from "uuid";
import Text from "../atoms/Text";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "./auth-components/UserStatusProvider";
import { TBoard, TJoiningStudy_Client } from "@/types/study";
import { getBlobStringAdapter } from "@/utils/adapters/adapters";
import Image from "../atoms/Image";
import ImageItem from "../molecules/ImageItem";

type TBoardEditor = {
  closeModal: () => void;
  addClientBoard: (
    boardType: "studyBoards" | "noticeBoards",
    newBoard: TBoard
  ) => void; // 왜냐하면 state와 state changer는 상위 컴포넌트에 있으니까
  studyId: string;
};

// 보낼때 formData로 보내야 함..

type TImg = {
  id: string;
  value: Blob;
};

const postBoard = async () => {};

function BoardEditor({ studyId, addClientBoard, closeModal }: TBoardEditor) {
  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);

  const writerEmail = session?.user.email || "";
  // 이런건 실무에서 어텋게 처리할까?

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [readingRequired, setReadingRequired] = useState(false);
  // 이미지는 따로 formData에 감싸서 보내야함
  const [images, setImages] = useState<TImg[]>([]);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;
    const newImg = {
      id: v4(),
      value: file,
    };

    setImages((prev) => [...prev, newImg]);
  };

  // 렌더링 최적화를 위해 고차함수를 쓸 수도?
  const handleDeleteImage = (imgId: string) => {
    const updatedImages = images.filter((image) => image.id !== imgId);
    setImages((prev) => updatedImages);
  };

  const triggerFileInputs = () => {
    if (images.length >= 3) {
      alert("최대 3개의 이미지를 추가할 수 있습니다.");
      return;
    }
    document.getElementById("fileInputs")?.click();
  };

  const postBoard = async () => {
    const newBoard = {
      studyId,
      writerEmail,
      boardId: v4(),
      title,
      text,
      readingRequired,
    };

    addClientBoard("noticeBoards", newBoard); // 클라이언트에 데이터 추가
    closeModal();

    // try {

    //   const formData = new FormData();
    //   formData.append("boardData", JSON.stringify(newBoard));

    //   if (images && images.length > 0) {
    //     images.forEach((image, index) => {
    //       if (image instanceof Blob) {
    //         formData.append("boardImages", image, `image-${index}`);
    //         // 서버에서는 boardImages의 값을 이미지 파일이 들어있는 배열로 받음
    //       }
    //     });
    //   }

    //   const res = await fetch(`joiningStudy/${studyId}/api`, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (res.ok) {
    //     const data = await res.json();
    //     console.log(data);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="bg-white w-full h-full flex items-center">
      <div className="bg-white w-full  px-3 py-4 flex flex-col gap-5">
        <div className="w-full border border-gray-300 rounded-[5px] py-3 flex items-center">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            name="title"
            type="text"
            placeholder="제목"
            className="w-full h-full border-none outline-none text-[14px] border border-gray-300 rounded-[5px] px-4 py-3placeholder:font-medium placeholder:text-gray-600"
          />
        </div>

        <div>
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
            name="text"
            cols={30}
            rows={10}
            placeholder="내용을 입력해주세요"
            className=" block m-0 w-full px-4 pt-3 border border-gray-300 resize-none outline-none rounded-[5px] text-[14px] placeholder:font-medium placeholder:text-gray-600"
          ></textarea>
          {images.length && (
            <div className="flex gap-1 w-full bg-white items-center">
              {images.map((image) => (
                <ImageItem
                  alt="이미지"
                  onClose={() => {
                    handleDeleteImage(image.id);
                  }}
                  width={85}
                  height={85}
                  key={v4()}
                  src={getBlobStringAdapter(image.value)}
                />
              ))}
            </div>
          )}
          <div className="m-0 flex justify-between items-center ">
            <label className="flex gap-1">
              <Text size="sm">필독</Text>
              {readingRequired ? (
                <Icon
                  type="CHECKBOX_CHECKED"
                  onClick={() => {
                    setReadingRequired(false);
                  }}
                />
              ) : (
                <Icon
                  type="CHECKBOX_UNCHECKED"
                  onClick={() => {
                    setReadingRequired(true);
                  }}
                />
              )}
            </label>

            <div className="bg-mainColor w-7 h-7 flex items-center justify-center">
              <input
                id="fileInputs"
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                style={{ display: "none" }}
              />
              <Icon type="CLIP" onClick={triggerFileInputs} />
            </div>
          </div>
          {/*  */}
        </div>

        <div className="flex gap-4">
          <Button
            theme="ordinary"
            extraCss="p-3 rounded-[5px] flex-2"
            onClick={closeModal}
          >
            취소하기
          </Button>
          <Button
            theme="primary"
            extraCss="p-3 rounded-[5px] flex-1"
            onClick={postBoard}
          >
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}

// function BoardEditor({}: TBoardEditor) {
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");
//   const [images, setImages] = useState([]);

//   return (
//     <div className="text-gray-700">
//       <div className="border-b border-gray-500">
//         <input
//           className="w-full px-1 py-2 outline-none focus:outline-none"
//           type="text"
//           placeholder="제목"
//         />
//       </div>
//       <textarea
//         className="w-full px-1 py-2 outline-none focus:outline-none"
//         placeholder="내용을 입력해주세요"
//         name=""
//         id=""
//         cols={30}
//         rows={10}
//       ></textarea>
//       <div className="flex justify-between items-center">
//         <div>
//           <div>사진??</div>
//           <div>reading required</div>
//         </div>
//         <div className="bg-mainColor w-7 h-7 flex items-center justify-center">
//           <Icon type="CLIP" />
//         </div>
//       </div>
//     </div>
//   );
// }

export default BoardEditor;
