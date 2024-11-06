import Text from "@/components/atoms/Text";
import React from "react";

const TextSetter = React.memo(
  ({
    intro,
    description,
    handleSetTextareaText,
    placeholder,
  }: {
    intro: string;
    placeholder: string;
    description: string;
    handleSetTextareaText: (text: string) => void;
  }) => {
    const onChangeTextArea = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = evt.target.value;
      handleSetTextareaText(value);
    };

    return (
      <div className="flex flex-col gap-3 intro">
        <label htmlFor="intro">
          <Text size="sm" weight="bold">
            {intro}
          </Text>
        </label>
        <textarea
          onChange={(e) => {
            onChangeTextArea(e);
          }}
          id="intro"
          placeholder={placeholder}
          cols={30}
          rows={10}
          value={description}
          className="px-4 py-3 border border-gray-300 resize-none outline-none rounded-[5px] placeholder: text-[14px] placeholder:font-medium placeholder:text-gray-600"
        ></textarea>
      </div>
    );
  }
);

export default TextSetter;
