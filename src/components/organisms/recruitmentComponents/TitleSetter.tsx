import Text from "@/components/atoms/Text";
import React, { useRef } from "react";

const TitleSetter = React.memo(
  ({
    intro,
    handleSetInputText,
    text,
    placeholder,
  }: {
    intro: string;
    handleSetInputText: (inputContent: string) => void;
    text: string;
    placeholder: string;
  }) => {
    const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value;
      handleSetInputText(value);
    };

    return (
      <div className="flex flex-col gap-3 title">
        <Text size="sm" weight="bold">
          {intro}
        </Text>
        <div className="w-full border border-gray-300 rounded-[5px] px-4 py-3 flex items-center">
          <input
            onChange={(e) => {
              onChangeInput(e);
            }}
            value={text}
            type="text"
            placeholder={placeholder}
            className="w-full h-full border-none outline-none text-[14px] placeholder:font-medium placeholder:text-gray-600"
          />
        </div>
      </div>
    );
  }
);

export default TitleSetter;
