import InfoFieldsFormat from "./InfoFieldsFormat";

type TProps = {
  type: "name" | "email" | "nickname" | "job" | "age" | "gender" | "place";
  content: string;
};

function InputField({ type, content }: TProps) {
  switch (type) {
    case "name":
      return <InfoFieldsFormat label="사용자 이름" content={content} />;
    case "email":
      return (
        <InfoFieldsFormat
          label="로그인 이메일"
          content={content}
          inputType="email"
        />
      );
  }
  //... ?
}

export default InputField;
