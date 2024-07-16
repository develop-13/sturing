type TInputCommon = {
  value: string;
  onChange: (value: string) => void;
};

type TTextInput = TInputCommon & {
  type: "TEXT";
  placeholder: string;
};

type TTextEditable = TInputCommon & {
  type: "TEXT_EDITABLE";
};

type TEmailEditable = TInputCommon & {
  type: "EMAIL_EDITABLE";
};

type TSwitchEditable = TInputCommon & {
  type: "SWITCH_EDITABLE";
  isPublic: boolean;
};

type TInputField =
  | TTextInput
  | TTextEditable
  | TEmailEditable
  | TSwitchEditable;

function InputField({ datas }: { datas: TInputField }) {
  switch (datas.type) {
    case "TEXT":
      return (
        <div className="relative w-full px-[12px] py-[16px] border border-gray-300 rounded-[5px]">
          <input
            type="text"
            value={datas.value}
            placeholder={datas.placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // 글자 제한 함수
              datas.onChange(e.target.value);
            }}
            className="w-full border-none outline-none text-[14px] placeholder:font-medium placeholder:text-gray-600"
          />
          <div className="absolute top-16 right-0 text-[12px] text-gray-400">
            <span className="text-gray-900 font-[400]">
              {datas.value.length}
            </span>
            /{24}
          </div>
        </div>
      );

    case "TEXT_EDITABLE":
    case "EMAIL_EDITABLE":
      const inputType = datas.type === "TEXT_EDITABLE" ? "text" : "email";
      const textColor =
        datas.type === "TEXT_EDITABLE" ? "text-black" : "text-gray-500";
      return (
        <div className="w-full h-[52px] flex items-center border-b border-gray-300 ">
          <input
            type={inputType}
            value={datas.value}
            className={
              "w-full border-none outline-non font-bold text-[16px] " +
              textColor
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              datas.onChange(e.target.value);
            }}
          />
        </div>
      );

    case "SWITCH_EDITABLE": // 추후 구현 예정입니다

    default:
      return <div>없는 타입입니다.</div>;
  }
}

export default InputField;
