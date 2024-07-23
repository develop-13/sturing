"use client";

import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

type TTitleLink = {
  title: string;
};

export default function TitleLink({ props }: { props: TTitleLink }) {
  return (
    <>
      <div className="flex items-center justify-between text-lg font-bold px-4">
        <Text size="lg" weight="bold">
          {props.title}
        </Text>
        <Icon type="FORWARD" />
      </div>
    </>
  );
}
