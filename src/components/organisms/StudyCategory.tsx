"use client";

import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import IconLabelButton from "../molecules/IconLabelButton";
import { categories } from "@/db/categories";
import { iconAdapter } from "@/adapters/adapters";

export default function StudyCategory() {
  const router = useRouter();

  const onClickHandler = (word: string) => {
    router.push(`/search/result?query=${word}`);
  };

  return (
    <>
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
    </>
  );
}
