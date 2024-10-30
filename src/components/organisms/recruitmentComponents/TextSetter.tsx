import Text from "@/components/atoms/Text";
import React from "react";

const TextSetter = React.memo(
  ({
    handleSetIntrouduceText,
  }: {
    handleSetIntrouduceText: (text: string) => void;
  }) => {
    const onChangeTextArea = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = evt.target.value;
      handleSetIntrouduceText(value);
    };

    return (
      <div className="flex flex-col gap-3 intro">
        <label htmlFor="intro">
          <Text size="sm" weight="bold">
            자기소개
          </Text>
        </label>
        <textarea
          onChange={(e) => {
            onChangeTextArea(e);
          }}
          id="intro"
          placeholder="소개글을 입력해 주세요 (최소 20자 필수)"
          cols={30}
          rows={10}
          className="px-4 py-3 border border-gray-300 resize-none outline-none rounded-[5px] placeholder: text-[14px] placeholder:font-medium placeholder:text-gray-600"
        ></textarea>
      </div>
    );
  }
);

export default TextSetter;
