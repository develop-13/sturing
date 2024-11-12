import Text from "@/components/atoms/Text";
import React from "react";

type TWritable = {
  type: "writable";
  intro: string;
  handleSetInputText: (inputContent: string) => void;
  text: string;
  placeholder: string;
};

type TReadOnly = {
  type: "readOnly";
  intro: string;
  text: string;
};

const TitleSetter = React.memo((props: TWritable | TReadOnly) => {
  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (props.type === "writable") {
      props.handleSetInputText(value);
    }
  };

  return (
    <div className="flex flex-col gap-3 title">
      <Text size="sm" weight="bold">
        {props.intro}
      </Text>
      <div className="w-full border border-gray-300 rounded-[5px] px-4 py-3 flex items-center">
        <input
          onChange={props.type === "writable" ? onChangeInput : undefined}
          value={props.text}
          type="text"
          placeholder={
            props.type === "writable" ? props.placeholder : undefined
          }
          className="w-full h-full border-none outline-none text-[14px] placeholder:font-medium placeholder:text-gray-600"
          readOnly={props.type === "readOnly"}
        />
      </div>
    </div>
  );
});

export default TitleSetter;
