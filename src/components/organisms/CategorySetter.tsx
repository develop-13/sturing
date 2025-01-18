import { TDispatchFuncs, TFilterState } from "@/states/filterReducer";
import CheckBoxItem from "../molecules/CheckItem/CheckBoxItem";
import { TCategory } from "@/types/common";

function CategorySetter({
  categories,
  selectedCategories,
  addCategory,
  cancelCategory,
}: {
  categories: TCategory[];
  selectedCategories: TFilterState["selectedCategories"];
  addCategory: TDispatchFuncs["setCategory"];
  cancelCategory: TDispatchFuncs["cancelCategory"];
}) {
  const getIsSelected = (category: TCategory) => {
    return !!selectedCategories.find(
      (selectedCategory) => category === selectedCategory
    );
  };

  return (
    <ul className="flex flex-col gap-[21px]">
      {categories.map((category) => {
        let isSelected = getIsSelected(category);
        return (
          <CheckBoxItem
            isSelected={isSelected}
            onClick={() => {
              if (isSelected) {
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
