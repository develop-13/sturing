import Text from "@/components/atoms/Text";
import React from "react";

type TWritable = {
  type: "writable";
  intro: string;
  placeholder: string;
  description: string;
  handleSetTextareaText: (text: string) => void;
};

type TReadOnly = {
  type: "readOnly";
  intro: string;
  description: string;
};

const TextSetter = React.memo((props: TWritable | TReadOnly) => {
  const onChangeTextArea = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (props.type === "writable") {
      props.handleSetTextareaText(evt.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-3 intro">
      <label htmlFor="intro">
        <Text size="sm" weight="bold">
          {props.intro}
        </Text>
      </label>
      <textarea
        onChange={props.type === "writable" ? onChangeTextArea : undefined}
        id="intro"
        placeholder={props.type === "writable" ? props.placeholder : undefined}
        cols={30}
        rows={10}
        value={props.description}
        className="px-4 py-3 border border-gray-300 resize-none outline-none rounded-[5px] text-[14px] placeholder:font-medium placeholder:text-gray-600"
        readOnly={props.type === "readOnly"}
      ></textarea>
    </div>
  );
});

export default TextSetter;
