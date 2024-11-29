import { TDispatchFuncs } from "@/reducers/filterReducer";
<<<<<<< HEAD
import CheckBoxItem from "../molecules/CheckItem/CheckBoxItem";
=======
import CheckBoxItem from "../molecules/CheckBoxItem";
>>>>>>> d690408071b010d7de636b9936c9e61e23807a59
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
