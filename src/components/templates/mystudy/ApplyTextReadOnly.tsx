import TextSetter from "@/components/organisms/recruitmentComponents/TextSetter";
import TitleSetter from "@/components/organisms/recruitmentComponents/TitleSetter";
import React from "react";

type TApplyTextReadOnly = {
  title: string;
  description: string;
};

function ApplyTextReadOnly(props: TApplyTextReadOnly) {
  return (
    <section className="p-4 flex flex-col gap-5">
      <TitleSetter
        type="readOnly"
        intro="스터디 지원글 제목"
        text={props.title}
      />
      <TextSetter
        type="readOnly"
        description={props.description}
        intro="나의 각오"
      />
    </section>
  );
}

export default ApplyTextReadOnly;
