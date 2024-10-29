import Text from "@/components/atoms/Text";
import React, { useRef } from "react";

function TitleSetter({
  handleSetImgSrc,
}: {
  handleSetImgSrc: (inputContent: string) => void;
}) {
  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    handleSetImgSrc(value);
  };

  return (
    <div className="flex flex-col gap-3 title">
      <Text size="sm" weight="bold">
        스터디 모집글 제목
      </Text>
      <div className="w-full border border-gray-300 rounded-[5px] px-4 py-3 flex items-center">
        <input
          onChange={(e) => {
            onChangeInput(e);
          }}
          type="text"
          placeholder="내 스터디를 돋보이게 하는 한마디 (최소 5자 이상)"
          className="w-full h-full border-none outline-none text-[14px] placeholder:font-medium placeholder:text-gray-600"
        />
      </div>
    </div>
  );
}

export default TitleSetter;
