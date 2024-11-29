"use client";

import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import IconLabelButton from "../molecules/IconLabelButton";
import { categories } from "@/db/categories";
import { iconAdapter } from "@/utils/adapters/adapters";

export default function StudyCategory() {
  const router = useRouter();

<<<<<<< HEAD
  const onClickHandler = (word: string) => {
    router.push(`/search/result?query=${word}`);
=======
  const onClickHandler = () => {
    // router.push("search/result");
>>>>>>> d690408071b010d7de636b9936c9e61e23807a59
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
<<<<<<< HEAD
            onClick: () => {
              onClickHandler(category);
            },
=======
            onClick: onClickHandler,
>>>>>>> d690408071b010d7de636b9936c9e61e23807a59
          }}
        />
      ))}
    </>
  );
}
