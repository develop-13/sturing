import Icon from "../atoms/Icon";
import IconLabelButton from "../molecules/IconLabelButton";
import { categories } from "@/db/categories";
import { iconAdapter } from "@/adapters/adapters";
import Link from "next/link";

export default function StudyCategory() {
  return (
    <>
      {categories.map((category) => (
        <Link
          className="shrink-0"
          key={category}
          href={`/search/result?query=${category}`}
        >
          <IconLabelButton
            key={category}
            datas={{
              usage: "round",
              text: category,
              icon: <Icon type={iconAdapter(category)} />,
            }}
          />
        </Link>
      ))}
    </>
  );
}
