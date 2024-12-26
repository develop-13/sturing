"use client";

import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import IconLabelButton from "../molecules/IconLabelButton";
import { categories } from "@/db/categories";
import { iconAdapter } from "@/adapters/adapters";
import { Suspense } from "react";

export default function StudyCategory() {
  const router = useRouter();

  const onClickHandler = (word: string) => {
    router.push(`/search/result?query=${word}`);
  };

  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        {categories.map((category) => (
          <IconLabelButton
            key={category}
            datas={{
              usage: "round",
              text: category,
              icon: <Icon type={iconAdapter(category)} />,
              onClick: () => {
                onClickHandler(category);
              },
            }}
          />
        ))}
      </Suspense>
    </>
  );
}
