"use client";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import ButtonLabel from "@/components/molecules/ButtonLabel";
import ButtonLabel_ing from "@/components/molecules/ButtonLabel";
import Icon_Logo from "@/svg/Icon-logo";

function RecommendPage() {
  return (
    <ButtonLabel type="category" icon={<Icon type="DESIGN" />} text="디자인" />
  );
}

export default RecommendPage;
