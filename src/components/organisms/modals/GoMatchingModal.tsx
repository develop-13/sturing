import React, { forwardRef } from "react";
import Text from "../../atoms/Text";
import Box from "../../atoms/Box";
import Link from "next/link";

const GoMatchingModal = forwardRef<HTMLDivElement, {}>(function GoMatchingModal(
  props,
  ref
) {
  return (
    <div
      ref={ref}
      className="p-6 flex flex-col gap-6 container w-[276px] mx-auto text-center rounded-lg bg-white"
    >
      <div className="flex flex-col gap-3">
        <Text size="lg" weight="bold">
          스터디 매칭 항목 선택
        </Text>
        <Text size="sm" weight="bold" color="gray-700">
          관심있는 스터디 카테고리와 <br />
          선호하는 스터디 유형을 선택해주세요
        </Text>
      </div>
      <Link href={"/matching"}>
        <Box
          props={{
            shape: "full",
            extraCss: "p-3 bg-mainColor ",
          }}
        >
          <Text size="base" color="white" weight="bold">
            매칭 항목 선택 바로가기
          </Text>
        </Box>
      </Link>
    </div>
  );
});

export default GoMatchingModal;
