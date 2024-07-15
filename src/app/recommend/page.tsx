"use client";
import Icon from "@/components/atoms/Icon";
import ButtonLabel from "@/components/molecules/ButtonLabel";

function RecommendPage() {
  return (
    <ButtonLabel
      datas={{
        theme: "ordinary",
        role: "category",
        icon: <Icon type="DESIGN" />,
        text: "디자인",
      }}
    />
  );
}

export default RecommendPage;
