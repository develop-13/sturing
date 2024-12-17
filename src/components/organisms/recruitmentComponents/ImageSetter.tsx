import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { TStudyRecruitmentReducer } from "@/reducers/recruitmentReducer";
import { getBlobStringAdapter } from "@/adapters/adapters";
import React from "react";

type TImageSetter = {
  imgSrc: TStudyRecruitmentReducer["imgSrc"];
  handleSetImage: (imageSrc: Blob) => void;
};

function ImageSetter(props: TImageSetter) {
  const { imgSrc, handleSetImage } = props;

  console.log(imgSrc);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // const imageUrl = getImgUrlObject(file); // file은 Blob 타입이므로 정상 동작
      handleSetImage(file); // 이미지 URL을 상태로 저장하여 미리보기 가능
      // console.log(imageUrl);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="flex flex-col gap-3 thumbnail">
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <Text size="sm" weight="bold">
        스터디 대표 사진
      </Text>
      <div
        className="w-[70px] h-[70px] rounded-[5px] border border-gray-300 flex items-center justify-center"
        onClick={triggerFileInput}
      >
        {imgSrc ? (
          <img
            src={getBlobStringAdapter(imgSrc)}
            // img의 src로 넣어줄 때는 string 타입이어야 함.
            alt="Thumbnail"
            className="w-full h-full object-cover rounded-[5px]"
          />
        ) : (
          <Icon type="CAMERA" height={30} width={30} />
        )}
      </div>
    </div>
  );
}

export default React.memo(ImageSetter);
