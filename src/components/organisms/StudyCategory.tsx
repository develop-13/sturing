"use client";

import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import IconLabelButton from "../molecules/IconLabelButton";
import { categories } from "@/db/categories";
import { iconAdapter } from "@/utils/adapters/adapters";

export default function StudyCategory() {
  const router = useRouter();

  const onClickHandler = () => {
    // router.push("search/result");
  };

  return (
    <>
      <div className="relative overflow-x-hidden">
        <ul className="flex gap-2 overflow-x-hidden list-none px-2">
          {categories.map((category) => (
            <IconLabelButton
              key={category}
              datas={{
                usage: "round",
                text: category,
                icon: <Icon type={iconAdapter(category)} />,
                onClick: onClickHandler,
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
