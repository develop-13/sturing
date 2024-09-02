import { TDispatchFuncs } from "@/reducers/filterReducer";
import CheckBoxItem from "../molecules/CheckBoxItem";
import { TCategory } from "@/types/common";

function CategorySetter({
  categories,
  selectedCategories,
  addCategory,
  cancelCategory,
}: {
  categories: TCategory[];
  selectedCategories: Set<TCategory>;
  addCategory: TDispatchFuncs["setCategory"];
  cancelCategory: TDispatchFuncs["cancelCategory"];
}) {
  return (
    <ul className="flex flex-col gap-[21px]">
      {categories.map((category) => {
        return (
          <CheckBoxItem
            isSelected={selectedCategories.has(category)}
            onClick={() => {
              if (selectedCategories.has(category)) {
                cancelCategory(category);
              } else {
                addCategory(category);
              }
            }}
            text={category}
            key={category}
          />
        );
      })}
    </ul>
  );
}

export default CategorySetter;
