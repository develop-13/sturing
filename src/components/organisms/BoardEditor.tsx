import React, { useCallback, useContext, useState } from "react";
import Icon from "../atoms/Icon";
import Button from "../molecules/Button";
import { v4 } from "uuid";
import Text from "../atoms/Text";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import {
  TBoard_Server,
  TJoiningStudy_Client,
  TStudyMember,
} from "@/types/study";
import { getBlobStringAdapter } from "@/adapters/adapters";
import dynamic from "next/dynamic";
const ImageItem = dynamic(() => import("../molecules/ImageItem"), {
  ssr: false,
});

type TBoardEditor = {
  studyId: string;
  teamMembers: TJoiningStudy_Client["currentMembers"];
  closeModal: () => void;
  postBoard: (newBoard: TBoard_Server) => void; // 왜냐하면 state와 state changer는 상위 컴포넌트에 있으니까
};

// 보낼때 formData로 보내야 함..

type TImg = {
  id: string;
  value: Blob;
  src: string;
};
function BoardEditor({
  studyId,
  teamMembers,
  postBoard,
  closeModal,
}: TBoardEditor) {
  const { session }: UserStatusContextProps = useContext(UserStatusContext);

  const writerEmail = session?.user.email;

  // Ensure hooks are called unconditionally
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [readingRequired, setReadingRequired] = useState(false);
  const [images, setImages] = useState<TImg[]>([]);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const newImg = {
      id: v4(),
      value: file,
      src: getBlobStringAdapter(file),
    };
    setImages((prev) => [...prev, newImg]);
  };

  const handleDeleteImage = useCallback(
    (imgId: string) => {
      const updatedImages = images.filter((image) => image.id !== imgId);
      setImages((prev) => updatedImages);
    },
    [images]
  );

  const triggerFileInputs = () => {
    if (images.length >= 3) {
      alert("최대 3개의 이미지를 추가할 수 있습니다.");
      return;
    }
    document.getElementById("fileInputs")?.click();
  };

  const handlePostBoard = () => {
    if (!writerEmail) {
      alert("작성자 이메일이 없습니다.");
      return;
    }

    const teamMember = teamMembers.find(
      (teamMember: Omit<TStudyMember, "attendance" | "checkList">) =>
        teamMember.userEmail === writerEmail
    );

    if (!teamMember) {
      alert("팀원이 아니시네요");
      return;
    }

    const { userName, applicantImgSrc, role } = teamMember;

    const imgSrces = images.map((img) => img.value);

    const newBoard = {
      writerName: userName,
      writerImg: applicantImgSrc,
      writerRole: role,
      writerEmail,
      studyId,
      title,
      text,
      readingRequired,
      imgSrces,
      boardClientId: v4(),
      comments: [],
    };
    postBoard(newBoard);
    closeModal();
  };

  // Render logic can include conditional checks
  if (!writerEmail) {
    return <p>작성자 정보를 불러올 수 없습니다.</p>;
  }

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
            rows={20}
            placeholder="내용을 입력해주세요"
            className=" block m-0 w-full px-4 pt-3 border border-gray-300 resize-none outline-none rounded-[5px] text-[14px] placeholder:font-medium placeholder:text-gray-600"
          />
          {images.length ? (
            <div className="flex gap-1 w-full bg-white items-center">
              {images.map((image) => (
                <ImageItem
                  alt="이미지"
                  onClose={handleDeleteImage}
                  width={85}
                  height={85}
                  key={image.id}
                  src={image.src}
                  imageId={image.id}
                />
              ))}
            </div>
          ) : null}
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
            onClick={handlePostBoard}
          >
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BoardEditor;
